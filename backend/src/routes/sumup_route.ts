import express, { Request, Response } from 'express';
import { createCheckout, getCheckoutStatus } from '../services/sumup.js';
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
  const eventType = req.body.event_type;
  const checkoutId = req.body.id;

  try {
    // Handle the event based on its type
    if (eventType === 'CHECKOUT_STATUS_CHANGED') {
      // Get the updated checkout status from SumUp's API
      const checkoutStatus = await getCheckoutStatus(checkoutId);

      // Update application based on the new status
      switch (checkoutStatus) {
        case 'PENDING':
          console.log('The payment is pending.');
          break;
        case 'AUTHORIZED':
          console.log('The payment has been authorized.');
          break;
        case 'CAPTURED':
          console.log('The payment has been captured.');
          break;
        case 'CANCELED':
          console.log('The payment has been canceled.');
          break;
        case 'EXPIRED':
          console.log('The payment has expired.');
          break;
        case 'FAILED':
          console.log('The payment has failed.');
          break;
        default:
          console.log('Unknown checkout status.');
      }
      // (e.g., mark an order as paid, update the user's account, send an email receipt)
    }
    

    // Respond to SumUp with a 200 status code to acknowledge receipt of the event
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to process the webhook event.' });
  }
});



export default router;