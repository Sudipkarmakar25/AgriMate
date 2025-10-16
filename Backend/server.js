require('dotenv').config();
const cors = require('cors');

const express = require('express');
const { connectDB } = require('./config/db');
const helloRoutes = require('./routes/helloRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));



if (process.env.MONGODB_URI) {
  connectDB().catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
}

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Welcome to your MVC backend' });
});

app.use('/hello', helloRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 3693;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 