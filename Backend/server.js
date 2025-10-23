import 'dotenv/config'; 
import cors from 'cors';
import farmer from './routes/FarmerRoutes.js';
import express from 'express';
import  {connectDB} from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();

// 1. GLOBAL MIDDLEWARE CHAIN START
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORRECT CORS (Allowing all sites with credentials, safer than using '*')
app.use( cors({
 origin: true, // Reflects the request origin for credential support
 credentials: true,
 })
);

// ✅ CORRECT PLACEMENT of Cookie Parser: MUST RUN BEFORE ROUTES that read cookies
app.use(cookieParser());

// 2. DATABASE CONNECTION
if (process.env.MONGODB_URI) {
 connectDB().catch((err) => {
 console.error('MongoDB connection failed:', err.message);
 });
}

// 3. ROUTES
app.get('/', (_req, res) => {
 res.json({ status: 'ok', message: 'Welcome to your MVC backend' });
});

app.use('/api/v1/farmer', farmer);

// 4. ERROR HANDLERS (MUST BE LAST)
app.use(notFound);
app.use(errorHandler);

// ❌ DELETED: The second, ineffective app.use(cors) block.

const PORT = Number(process.env.PORT) || 3693;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});