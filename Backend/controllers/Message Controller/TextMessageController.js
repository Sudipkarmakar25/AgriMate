import Chat from "../../models/Chat.js";
import openai from "../../config/openai.js";

export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId, prompt } = req.body
        const chat = await Chat.findOne({ userId, _id: chatId });
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        });

        const {choices} = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply={...choices[0].message,timestamp: Date.now(),isImage: false}
        res.status(201).json({
            success: true,
            message: "Response fetched from AI successfully.",
            reply
        });
        chat.messages.push(reply);
        await chat.save();
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}