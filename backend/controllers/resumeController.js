const User = require("../models/User");
const fs = require("fs");
const path = require("path");

const uploadResume = async (req, res) => {
    let newFilePath = null;

    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume PDF is required",
            });
        }

        newFilePath = req.file.path;

        const user = await User.findById(req.user.id);

        if (!user) {
            await fs.promises.unlink(newFilePath).catch(() => { });

            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const oldFileName = user.resume?.fileName;

        user.resume = {
            originalName: req.file.originalname,
            fileName: req.file.filename,
            mimeType: req.file.mimetype,
            size: req.file.size,
            uploadedAt: new Date(),
        };

        await user.save();

        if (oldFileName) {
            const oldFilePath = path.join(
                __dirname,
                "../uploads/resumes",
                oldFileName
            );

            await fs.promises.unlink(oldFilePath).catch(() => { });
        }

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            resume: {
                originalName: user.resume.originalName,
                fileName: user.resume.fileName,
                mimeType: user.resume.mimeType,
                size: user.resume.size,
                uploadedAt: user.resume.uploadedAt,
            },
        });
    } catch (error) {
        console.error("Resume upload error:", error);

        if (newFilePath) {
            await fs.promises.unlink(newFilePath).catch(() => { });
        }

        return res.status(500).json({
            success: false,
            message: "Server error while uploading resume",
        });
    }
};

module.exports = {
    uploadResume,
};