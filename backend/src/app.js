import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Router from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { AppError } from './utils/appError.util.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', Router);

// Chạy khi không có route nào khớp với request và chuyển lỗi 404 đến middleware lỗi.
app.use((req, res, next) => {
  next(new AppError('Không tìm thấy API này.', 404));
});

// Đặt cuối cùng để nhận lỗi từ tất cả router và middleware phía trên.
app.use(errorMiddleware);

export default app;
