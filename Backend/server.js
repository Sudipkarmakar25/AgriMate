import 'dotenv/config'; 
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';

// Routers
import farmer from './routes/FarmerRoutes.js';
import plot from './routes/PlotRoutes.js';
import farmerCommunityRoutes from "./routes/FarmerCommunityRoutes.js";

const app = express();

/* -------------------------- GLOBAL MIDDLEWARES -------------------------- */

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser());

// Serve uploads folder
app.use("/uploads", express.static("uploads"));

/* 
  IMPORTANT:
  JSON body parser MUST come BEFORE community routes because comment + reply use JSON.
  Multer can still parse multipart even after express.json().
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ------------------------------ ROUTES ------------------------------ */

// Community routes (posts, comments, reply)
app.use("/api/v1/community", farmerCommunityRoutes);

// Farmer routes
app.use('/api/v1/farmer', farmer);

// Plot routes
app.use('/api/v1/plot', plot);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Welcome to your MVC backend' });
});

/* -------------------------- ERROR HANDLERS --------------------------- */

app.use(notFound);
app.use(errorHandler);

/* ------------------------------- SERVER ------------------------------- */

const PORT = Number(process.env.PORT) || 3693;

// Connect DB then start server
if (process.env.MONGODB_URI) {
  connectDB().catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
