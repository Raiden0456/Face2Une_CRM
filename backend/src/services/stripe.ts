import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

import { Router } from 'express';
const router = Router();
import dotenv from 'dotenv';
import { getTotalCost } from '../utils/totalPrice_procs.js';
dotenv.config();

router.get('/checkout-appoint', async (req, res) => {
  const all_ids = [req.body.main_proc, ...req.body.additional_procs];
  const total_price = await getTotalCost(all_ids, req.body.saloon_id);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: total_price.currency,
            product_data: {
              name: 'Appointment',
            },
            unit_amount: total_price.total * 100, // in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
  }
});




export default router;