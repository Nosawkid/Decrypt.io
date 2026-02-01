import User from "../models/User.js";
import Transmission from "../models/Transmission.js";
import CryptoJs from 'crypto-js'


export const sendTransmission = async (req, res, next) => {
    const { subject, transmission, encType, encCode, hint, agentId } = req.body
    const receiver = await User.findOne({ agentId })
    if (!receiver) {
        return next(new Error("Invalid receiver mail"))
    }


    let encryptedContent = ""

    if (encType === "caeser") {
        const text = transmission.toUpperCase()
        const shift = Number(encCode)

        for (let i = 0; i < text.length; i++) {
            const ch = text[i]
            if (ch >= 'A' && ch <= 'Z') {
                const coded = ((ch.charCodeAt(0) - 65 + shift) % 26) + 65
                encryptedContent += String.fromCharCode(coded);
            } else {
                encryptedContent += ch;
            }
        }
    } else if (encType === "aes") {
        encryptedContent = CryptoJs.AES.encrypt(transmission, encCode).toString()
    }

    const newTransmission = new Transmission({
        subject,
        transmission: encryptedContent,
        encType,
        encCode,
        hint,
        senderId: req.user._id,
        receiverId: receiver._id
    })

    await newTransmission.save()
    res.status(201).json({
        success: true,
        message: "Transmission encrypted and sent successfully.",
        data: {
            id: newTransmission._id,
            target: receiver.agentId,
            status: "ENCRYPTED"
        }
    });
}

export const getMyTransmissions = async (req, res, next) => {
    const transmissions = await Transmission.find({ receiverId: req.user._id })
        .populate("senderId", "username agentId")
        .sort({ createdAt: -1 });
    res.status(200).json({
        message: "Transmissions fetched",
        transmissions
    });
}

export const readTransmission = async (req, res, next) => {
    const { id } = req.params
    const { decKey } = req.body
    const transmission = await Transmission.findById(id)
    if (!transmission) {
        return next(new Error("Invalid transmission"))
    }
    if (transmission.failedAttempts >= 3) {
        return res.status(400).json({ message: "Message cannot be unlocked" })
    }
    if (decKey != transmission.encCode) {
        transmission.failedAttempts += 1;
        await transmission.save()
        return res.status(400).json({ message: "Invalid key" })
    }

    let decryptedContent = ""
    if (transmission.encType === "caesar") {

        const text = transmission.transmission.toUpperCase()

        for (let i = 0; i < text.length; i++) {
            const ch = text[i]
            if (ch >= 'A' && ch <= "Z") {
                const coded = ((ch.charCodeAt(0) - 65 - decKey + 26) % 26) + 65
                decryptedContent += String.fromCharCode(coded)
            } else {
                decryptedContent += ch
            }
        }
    } else if (transmission.encType === "aes") {
        const bytes = CryptoJs.AES.decrypt(transmission.transmission, decKey)
        decryptedContent = bytes.toString(CryptoJs.enc.Utf8)

        if (!decryptedContent) throw new Error("Malformed decryption");
    }
    transmission.isRead = true
    await transmission.save()
    res.status(200).json({ message: "Message decrypted", decryptedContent })


}

// --- 1. GET SENT MESSAGES (Outbox) ---
export const getSentTransmissions = async (req, res, next) => {
    try {
        const transmissions = await Transmission.find({ senderId: req.user._id })
            .populate("receiverId", "username agentId") // Show who I sent it TO
            .sort({ createdAt: -1 })
            .select("-encCode"); // Security: Don't send keys in list view

        res.status(200).json({
            message: "Sent transmissions fetched",
            transmissions
        });
    } catch (error) {
        next(error);
    }
};

// --- 2. GET STARRED MESSAGES (Wishlist/Important) ---
export const getStarredTransmissions = async (req, res, next) => {
    try {
        const transmissions = await Transmission.find({
            receiverId: req.user._id,
            isStarred: true
        })
            .populate("senderId", "username agentId") // Show who sent it TO ME
            .sort({ createdAt: -1 })
            .select("-encCode");

        res.status(200).json({
            message: "Starred intel fetched",
            transmissions
        });
    } catch (error) {
        next(error);
    }
};

// --- 3. GET LOST MESSAGES (Burned/Failed Decryption) ---
export const getLostTransmissions = async (req, res, next) => {
    try {
        // Fetch messages explicitly marked as lost OR with too many failed attempts
        const transmissions = await Transmission.find({
            receiverId: req.user._id,
            $or: [{ isLost: true }, { failedAttempts: { $gte: 3 } }]
        })
            .populate("senderId", "username agentId")
            .sort({ createdAt: -1 })
            .select("-encCode");

        res.status(200).json({
            message: "Lost transmissions fetched",
            transmissions
        });
    } catch (error) {
        next(error);
    }
};

// --- 4. TOGGLE STAR STATUS ---
export const toggleStar = async (req, res, next) => {
    try {
        const { id } = req.params;

        const transmission = await Transmission.findById(id);

        if (!transmission) {
            res.status(404);
            return next(new Error("Transmission not found"));
        }

        // Security: Only the receiver can star a message
        if (transmission.receiverId.toString() !== req.user._id.toString()) {
            res.status(403);
            return next(new Error("Unauthorized access"));
        }

        // Toggle logic
        transmission.isStarred = !transmission.isStarred;
        await transmission.save();

        res.status(200).json({
            message: transmission.isStarred ? "Added to Starred" : "Removed from Starred",
            isStarred: transmission.isStarred
        });

    } catch (error) {
        next(error);
    }
};