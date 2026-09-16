const express = require("express");

const {
    getProfile,
    updateProfile,
} = require("../controllers/profileController");

const {
    uploadResume,
} = require("../controllers/resumeController");

const authMiddleware = require("../middleware/authMiddleware");
const uploadResumeMiddleware = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.put("/", authMiddleware, updateProfile);

router.post(
    "/resume",
    authMiddleware,
    uploadResumeMiddleware.single("resume"),
    uploadResume
);

module.exports = router;