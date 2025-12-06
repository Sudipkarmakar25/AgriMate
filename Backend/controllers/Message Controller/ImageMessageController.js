import axios from "axios";
import Chat from "../../models/Chat.js";
import imagekit from "../../config/imagekit.js";


export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId, prompt } = req.body;
        const chat = await Chat.findOne({ userId, _id: chatId });
        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false
        })
        const encodedPrompt = encodeURIComponent(prompt);
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/AgriMate/${Date.now()}.png?tr=w-800,h-800`;
        const aiImageResponse = await axios.get(generatedImageUrl, { responseType: "arraybuffer" })
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`;
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "AgriMate"
        });
        const reply = {
            role: "assistant",
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true
        }
        res.status(201).json({
            success: true,
            message: "Image generated from AI successfully.",
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