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
            enum: ["caesar", "aes"],
            required: true,
        },
        encCode: {
            type: String, // String to support both numbers and passwords
            required: true,
            validate: {
                validator: function (value) {
                    if (this.encType === "caesar") {
                        const shift = Number(value);
                        return !isNaN(shift) && shift >= 1 && shift <= 25;
                    }
                    return value.length > 0;
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
            default: 0, // Starts at 0
        },
        isLost: {
            type: Boolean,
            default: false, // Becomes true if failedAttempts > 3
        },

        // UI Flags
        isRead: { type: Boolean, default: false },
        isStarred: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const Transmission = mongoose.model("Transmission", transmissionSchema);

export default Transmission;