import 'dotenv/config';
import Razorpay from 'razorpay';

async function testRazorpay() {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: 100 * 100, // INR 100
    currency: "INR",
    receipt: "receipt_test_1",
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log('Success:', order.id);
  } catch (error) {
    console.error('Error:', error);
  }
}

testRazorpay();
