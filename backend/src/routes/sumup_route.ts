import express, { Request, Response } from 'express';
import { createCheckout } from '../services/sumup.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/payment', async (req: Request, res: Response) => {
  //const { amount, currency } = req.body;
  const amount = 1;
  const currency = 'EUR';
  try {
    const returnUrl = process.env.CORS_ORIGIN + '/webhook';
    const checkoutUrl = await createCheckout(amount, currency, returnUrl);
    res.json({ checkoutUrl });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to initiate the payment.' });
  }
});

router.post('/webhook', async (req: Request, res: Response) => {
  const eventType = req.header('X-Event-Type');
  const eventData = req.body;

  try {
    // Handle the event based on its type (e.g., payment.succeeded, payment.failed)
    if (eventType === 'payment.succeeded') {
      // Update your application with the successful payment
      console.log('Payment succeeded:', eventData);
    } else if (eventType === 'payment.failed') {
      // Handle a failed payment
      console.log('Payment failed:', eventData);
    }

    // Respond to SumUp with a 200 status code to acknowledge receipt of the event
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to process the webhook event.' });
  }
});


export default router;