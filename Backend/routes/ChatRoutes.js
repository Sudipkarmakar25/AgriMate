import express from 'express'
import { createChat } from '../controllers/ChatBot Controllers/CreateChat.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getChats } from '../controllers/ChatBot Controllers/GetUserChats.js';
import { deleteChat } from '../controllers/ChatBot Controllers/DeleteChat.js';

const chatRouter=express.Router();

chatRouter.get('/create',authMiddleware,createChat);
chatRouter.get('/get',authMiddleware,getChats);
chatRouter.post('/delete',authMiddleware,deleteChat);

export default chatRouter;


