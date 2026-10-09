
import express from 'express';
import cors from 'cors';

import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import wishlistRouter from './routes/wishlistRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import { stripeWebhook } from './controllers/orderController.js';

const app = express();

app.use(cors({
  origin: [
    FRONTEND_URL,
    'http://localhost:5173'
  ]
}));

// Keep the Stripe webhook before express.json().
app.post(
  '/api/order/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/review', reviewRouter);

app.get('/', (req, res) => {
  res.send('API WORKING');
});

export default app;
