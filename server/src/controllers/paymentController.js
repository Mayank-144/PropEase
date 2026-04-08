import Razorpay from 'razorpay';
import crypto from 'crypto';
import { logger } from '../utils/logger.js';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "YOUR_TEST_KEY_ID",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_TEST_KEY_SECRET",
    });

    const options = {
      amount: amount * 100, // Amount is in currency subunits (paise)
      currency: currency || "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    logger.error(`Razorpay Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Payment checkout failed." });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, propertyId, userId, amount } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "YOUR_TEST_KEY_SECRET")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      if (propertyId && userId) {
        // Formally create a permanent Lease Agreement
        const lease = new Booking({
          userId: userId,
          propertyId: propertyId,
          purpose: "lease_agreement",
          status: "confirmed",
          paymentId: razorpay_payment_id,
          amountPaid: amount
        });
        await lease.save();

        // Lock the Property so it's no longer available for renting
        await Property.findByIdAndUpdate(propertyId, { available: false });
      }

      res.status(200).json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment signature." });
    }
  } catch (error) {
    logger.error(`Razorpay Validation Error: ${error.message}`);
    res.status(500).json({ success: false, message: "Server validation failed." });
  }
};
