import User from "../models/User.js";
import Transmission from "../models/Transmission.js";
import CryptoJs from 'crypto-js';

// --- 1. SEND TRANSMISSION ---
// --- 1. SEND TRANSMISSION ---
export const sendTransmission = async (req, res, next) => {
    try {
        const { subject, transmission, encType, encCode, hint, agentId } = req.body;

        const receiver = await User.findOne({ agentId });
        if (!receiver) {
            res.status(404);
            return next(new Error("Target Agent ID not found on the network."));
        }

        let encryptedContent = "";
        // 1. Determine the standardized type first
        let finalEncType = encType;

        // Handle both spellings just in case
        if (encType === "caesar" || encType === "caeser") {
            finalEncType = "caesar"; // Standardize spelling

            const text = transmission.toUpperCase();
            const shift = Number(encCode);
            for (let i = 0; i < text.length; i++) {
                const ch = text[i];
                if (ch >= 'A' && ch <= 'Z') {
                    const coded = ((ch.charCodeAt(0) - 65 + shift) % 26) + 65;
                    encryptedContent += String.fromCharCode(coded);
                } else { encryptedContent += ch; }
            }
        } else if (encType === "aes") {
            finalEncType = "aes"; // Standardize
            encryptedContent = CryptoJs.AES.encrypt(transmission, encCode).toString();
        }

        const newTransmission = new Transmission({
            subject,
            transmission: encryptedContent,
            encType: finalEncType, // <--- CHANGED: Use the variable, don't hardcode "caesar"
            encCode,
            hint,
            senderId: req.user._id,
            receiverId: receiver._id
        });

        await newTransmission.save();
        res.status(201).json({ success: true, data: newTransmission });
    } catch (error) {
        next(error);
    }
};

// --- 2. GET INBOX (My Received Messages) ---
export const getMyTransmissions = async (req, res, next) => {
    try {
        const transmissions = await Transmission.find({
            receiverId: req.user._id,
            // Optional: Hide burned messages from main inbox if you want
            // failedAttempts: { $lt: 3 } 
        })
            .populate("senderId", "username agentId")
            .sort({ createdAt: -1 });

        res.status(200).json({ transmissions });
    } catch (error) {
        next(error);
    }
};

// --- 3. GET SENT (My Outgoing Messages) ---
export const getSentTransmissions = async (req, res, next) => {
    try {
        const transmissions = await Transmission.find({ senderId: req.user._id })
            .populate("receiverId", "username agentId")
            .sort({ createdAt: -1 });

        res.status(200).json({ transmissions });
    } catch (error) {
        next(error);
    }
};

// --- 4. GET STARRED (Wishlist) ---
export const getStarredTransmissions = async (req, res, next) => {
    try {
        const transmissions = await Transmission.find({
            receiverId: req.user._id,
            isStarred: true
        })
            .populate("senderId", "username agentId")
            .sort({ createdAt: -1 });

        res.status(200).json({ transmissions });
    } catch (error) {
        next(error);
    }
};

// --- 5. GET LOST (Burned Messages) ---
export const getLostTransmissions = async (req, res, next) => {
    try {
        const transmissions = await Transmission.find({
            receiverId: req.user._id,
            $or: [
                { failedAttempts: { $gte: 3 } },
                { isLost: true }
            ]
        })
            .populate("senderId", "username agentId")
            .sort({ createdAt: -1 });

        res.status(200).json({ transmissions });
    } catch (error) {
        next(error);
    }
};

// --- 6. TOGGLE STAR ---
export const toggleStar = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transmission = await Transmission.findById(id);

        if (!transmission) return next(new Error("Transmission not found"));

        if (transmission.receiverId.toString() !== req.user._id.toString()) {
            res.status(403);
            return next(new Error("Unauthorized access"));
        }

        transmission.isStarred = !transmission.isStarred;
        await transmission.save();

        res.status(200).json({
            message: transmission.isStarred ? "Marked Important" : "Mark Removed",
            isStarred: transmission.isStarred
        });
    } catch (error) {
        next(error);
    }
};

// --- 7. READ/DECRYPT MESSAGE ---

// ... imports

// --- 7. READ/DECRYPT MESSAGE (UPDATED) ---
export const readTransmission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { decKey } = req.body;

        const transmission = await Transmission.findById(id).populate("senderId", "username agentId");

        if (!transmission) return next(new Error("Transmission not found"));

        // Security Check
        if (transmission.receiverId.toString() !== req.user._id.toString()) {
            res.status(403);
            return next(new Error("Unauthorized: This signal is not for you."));
        }

        // 1. FAST TRACK: If already decrypted, return immediately
        if (transmission.encType === "none" || transmission.isRead) {
            return res.status(200).json({
                message: "Archive retrieved.",
                decryptedContent: transmission.transmission, // Return stored plaintext
                sender: transmission.senderId
            });
        }

        // Check Burn Status
        if (transmission.failedAttempts >= 3 || transmission.isLost) {
            return res.status(400).json({ message: "Security Protocol: Data has been incinerated." });
        }

        // Verify Key
        if (String(decKey) !== String(transmission.encCode)) {
            transmission.failedAttempts += 1;
            if (transmission.failedAttempts >= 3) transmission.isLost = true;
            await transmission.save();
            return res.status(400).json({
                message: `Invalid Key. ${3 - transmission.failedAttempts} attempts remaining.`
            });
        }

        // Decryption Logic
        let decryptedContent = "";
        if (transmission.encType.includes("caesar")) {
            const text = transmission.transmission.toUpperCase();
            const shift = Number(decKey);
            for (let i = 0; i < text.length; i++) {
                const ch = text[i];
                if (ch >= 'A' && ch <= "Z") {
                    const coded = ((ch.charCodeAt(0) - 65 - shift + 26) % 26) + 65;
                    decryptedContent += String.fromCharCode(coded);
                } else { decryptedContent += ch; }
            }
        } else if (transmission.encType === "aes") {
            const bytes = CryptoJs.AES.decrypt(transmission.transmission, decKey);
            decryptedContent = bytes.toString(CryptoJs.enc.Utf8);
            if (!decryptedContent) throw new Error("Decryption yielded null result");
        }

        // 2. SAVE STATE: Store the plaintext and remove the lock
        transmission.transmission = decryptedContent;
        transmission.encType = "none"; // Mark as unencrypted
        transmission.encCode = "";     // Clear the key (optional, for security)
        transmission.isRead = true;

        await transmission.save();

        res.status(200).json({
            message: "Decryption Successful",
            decryptedContent,
            sender: transmission.senderId
        });
    } catch (error) {
        next(error);
    }
};