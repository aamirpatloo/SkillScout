const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                skills: user.skills,
                experience: user.experience,
                preferredRoles: user.preferredRoles,
                preferredLocation: user.preferredLocation,
                workMode: user.workMode,
                expectedSalary: user.expectedSalary,
            },
        });
    } catch (error) {
        console.error("Get profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching profile",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {
            name,
            skills,
            experience,
            preferredRoles,
            preferredLocation,
            workMode,
            expectedSalary,
        } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (name !== undefined) {
            user.name = name.trim();
        }

        if (skills !== undefined) {
            user.skills = skills;
        }

        if (experience !== undefined) {
            user.experience = experience;
        }

        if (preferredRoles !== undefined) {
            user.preferredRoles = preferredRoles;
        }

        if (preferredLocation !== undefined) {
            user.preferredLocation = preferredLocation.trim();
        }

        if (workMode !== undefined) {
            user.workMode = workMode;
        }

        if (expectedSalary !== undefined) {
            user.expectedSalary = expectedSalary;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                skills: user.skills,
                experience: user.experience,
                preferredRoles: user.preferredRoles,
                preferredLocation: user.preferredLocation,
                workMode: user.workMode,
                expectedSalary: user.expectedSalary,
            },
        });
    } catch (error) {
        console.error("Update profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while updating profile",
        });
    }
};

module.exports = {
    getProfile,
    updateProfile,
};