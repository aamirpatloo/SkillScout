const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false,
        },

        role: {
            type: String,
            enum: ["job_seeker"],
            default: "job_seeker",
        },

        skills: {
            type: [String],
            default: [],
        },

        experience: {
            type: Number,
            default: 0,
            min: 0,
        },

        preferredRoles: {
            type: [String],
            default: [],
        },

        preferredLocation: {
            type: String,
            default: "",
            trim: true,
        },

        workMode: {
            type: String,
            enum: ["remote", "hybrid", "onsite", ""],
            default: "",
        },

        expectedSalary: {
            type: Number,
            min: 0,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);