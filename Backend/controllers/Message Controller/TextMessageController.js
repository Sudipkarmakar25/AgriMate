import Chat from "../../models/Chat.js";
import { generateGroqResponse } from "../../config/GroqClient.js";

export const textMessageController = async (req, res) => {
  try {
    console.log("📩 Incoming message request");
    console.log("req.user =", req.user);

    // 1️⃣ Authentication Check
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "User not authenticated." });
    }

    const userId = req.user._id;
    const { chatId, prompt } = req.body;

    if (!prompt || !chatId) {
      return res.status(400).json({
        success: false,
        message: "Chat ID and prompt are required.",
      });
    }

    console.log("📝 Prompt:", prompt);

    // 2️⃣ Validate Chat
    const chat = await Chat.findOne({ userId, _id: chatId });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found for this user.",
      });
    }

    // Save user message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // 3️⃣ Call Groq through Smart Client
    console.log("🤖 Sending prompt to Groq...");

    let groqResponse;
    try {
      groqResponse = await generateGroqResponse(prompt);
    } catch (err) {
      console.error("❌ Groq Error:", err);
      return res.status(500).json({
        success: false,
        message: "AI service failed",
        details: err.message,
      });
    }

    const replyContent = groqResponse?.choices?.[0]?.message?.content;

    if (!replyContent) {
      return res.status(500).json({
        success: false,
        message: "AI returned an empty response.",
      });
    }

    const reply = {
      role: "assistant",
      content: replyContent,
      timestamp: Date.now(),
      isImage: false,
    };

    // 4️⃣ Send To Frontend
    res.status(201).json({
      success: true,
      message: "AI replied successfully.",
      reply,
    });

    // 5️⃣ Save to DB
    chat.messages.push(reply);
    await chat.save();
    console.log("💾 Chat saved.");

  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      details: error.stack,
    });
  }
};