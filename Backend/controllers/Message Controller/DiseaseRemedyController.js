import Chat from "../../models/Chat.js";
import { generateGroqResponse } from "../../config/GroqClient.js";

export const DiseaseRemedyController = async (req, res) => {
  try {
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "User not authenticated." });
    }

    const disease =req.body.disease;

    if (!disease)
    {
         return res.status(401).json({ success: false, message: "No disease found" });
    }
    const agronomyPrompt = `
You are an experienced agronomist and crop disease expert.

A farmer has reported this disease: "${disease}".

Your task:
-strictly give in json format 
- Provide **exactly 5–6 simple, practical remedies**
- Remedies must be **easy for an Indian rural farmer** to apply
- Avoid scientific jargon
- No long explanation
- Write remedies in **numbered list format**
- Do NOT generate any images
-Recheck for json data again you have to give json data 
-give all the remedies inside a simple json so that in frontend it can be extracted from req.body.data in comma separated
- all the data must be in comma separated
Now give the remedies:
`;

    console.log("🤖 Sending refined prompt to Groq:", agronomyPrompt);

    // 4️⃣ Call Groq AI Model
    let groqResponse;
    try {
      groqResponse = await generateGroqResponse(agronomyPrompt);
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
      content: replyContent,
    };

    // 5️⃣ Send To Frontend
    res.status(201).json({
      success: true,
      message: "Agronomist remedies generated successfully.",
      reply,
    });

    // 6️⃣ Save to DB
    Chat.messages.push(reply);
    await Chat.save();
    console.log("💾 Remedies saved in chat.");

  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      details: error.stack,
    });
  }
};
