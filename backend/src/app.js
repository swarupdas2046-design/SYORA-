import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ error: message });
});

export default app



