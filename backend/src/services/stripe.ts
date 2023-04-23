const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
dotenv.config();

router.post('/stripe-checkout', async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_TEST_ENDPOINT_SECRET);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    } 
      // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

export default router;