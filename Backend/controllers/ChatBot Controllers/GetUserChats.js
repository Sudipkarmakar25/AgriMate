import Chat from "../../models/Chat.js";

export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chats = await Chat.find({ userId }).sort({ updatedAt: -1 })
        res.status(201).json({
            success: true,
            message: "Chats fetched successfully.",
            chats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}