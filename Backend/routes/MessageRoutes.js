import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { textMessageController } from '../controllers/Message Controller/TextMessageController.js';
import { imageMessageController } from '../controllers/Message Controller/ImageMessageController.js';

const messageRouter=express.Router();

messageRouter.post("/text", (req, res, next) => {
  console.log("🔥 HIT: /api/v1/message/text route reached");
  next();
}, authMiddleware, textMessageController);

messageRouter.post('/image',authMiddleware,imageMessageController);

export default messageRouter;