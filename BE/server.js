import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Razorpay instance with test keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



// Endpoint to create a Razorpay order
app.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: 2900, // Amount in paise (e.g., $29 = 2900 paise)
      currency: 'USD', // Use 'INR' for Indian Rupees or 'USD' for demo purposes
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});