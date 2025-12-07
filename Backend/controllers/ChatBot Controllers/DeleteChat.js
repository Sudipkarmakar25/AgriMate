import Chat from "../../models/Chat.js";

export const deleteChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const {chatId}=req.body;

        await Chat.deleteOne({_id:chatId,userId});

        res.status(201).json({
            success: true,
            message: "Chat deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}