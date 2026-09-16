const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const uploadDirectory = path.join(
    __dirname,
    "../uploads/resumes"
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${crypto.randomUUID()}.pdf`;

        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    if (extension !== ".pdf") {
        return cb(new Error("Only PDF files are allowed"));
    }

    if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF files are allowed"));
    }

    cb(null, true);
};

const uploadResume = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

module.exports = uploadResume;