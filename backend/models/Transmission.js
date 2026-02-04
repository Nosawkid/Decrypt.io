import mongoose from "mongoose";

const transmissionSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true,
            maxlength: 100,
        },
        transmission: {
            type: String,
            required: [true, "Transmission content is mandatory"],
        },
        encType: {
            type: String,
            // UPDATED: Added "none" to allow saving decrypted messages
            enum: ["caesar", "aes", "none"],
            required: true,
        },
        encCode: {
            type: String,
            // UPDATED: Removed 'required: true' so we can clear the key after decryption
            validate: {
                validator: function (value) {
                    // Only validate if we are actually encrypting
                    if (this.encType === "none") return true;

                    if (this.encType === "caesar") {
                        const shift = Number(value);
                        return !isNaN(shift) && shift >= 1 && shift <= 25;
                    }
                    return value && value.length > 0;
                },
                message: "Invalid encryption code provided.",
            },
        },
        hint: {
            type: String,
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        failedAttempts: {
            type: Number,
            default: 0,
        },
        isLost: {
            type: Boolean,
            default: false,
        },
        isRead: { type: Boolean, default: false },
        isStarred: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Transmission = mongoose.model("Transmission", transmissionSchema);

export default Transmission;