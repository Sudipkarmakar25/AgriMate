import Chat from "../../models/Chat.js";


export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name,
        }
        await Chat.create(chatData);
        res.status(201).json({
            success: true,
            message: "Chat created successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}