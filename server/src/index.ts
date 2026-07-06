import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import homeworkRouter from './routes/homework.js';
import karteikastenRouter from './routes/karteikasten.js';
// ...
app.use('/api/karteikasten', karteikastenRouter);
const app = express();
const PORT = process.env.PORT || 10000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'lernhelden_4-server' });
});

app.use('/api/homework', homeworkRouter);

app.listen(PORT, () => {
  console.log(`lernhelden_4-server running on port ${PORT}`);
});
