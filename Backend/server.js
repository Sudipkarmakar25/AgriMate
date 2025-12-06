import 'dotenv/config'; 
import cors from 'cors';
import farmer from './routes/FarmerRoutes.js';
import plot from './routes/PlotRoutes.js';
import express from 'express';
import  {connectDB} from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import chatRouter from './routes/ChatRoutes.js';
import messageRouter from './routes/MessageRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


app.use(cookieParser());

if (process.env.MONGODB_URI) {
 connectDB().catch((err) => {
 console.error('MongoDB connection failed:', err.message);
 });
}

app.get('/', (_req, res) => {
 res.json({ status: 'ok', message: 'Welcome to your MVC backend' });
});

app.use('/api/v1/farmer', farmer);
app.use('/api/v1/plot', plot);
app.use('/api/v1/chat',chatRouter);
app.use('/api/v1/message',messageRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3693;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});