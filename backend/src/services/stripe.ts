// webhook.js
import Stripe from "stripe";
import { createAppoint } from "../controllers/appointments_controller.js";
import { buyCertificates } from "../controllers/certificates_controller.js";
import { buyPackages } from "../controllers/packages_controller.js";
import exp from "constants";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function handleStripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_TEST_ENDPOINT_SECRET);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const session = event.data.object;

     // Extract metadata
    const metadata = session.metadata;
    const instanceType = metadata.instanceType;
    const data = JSON.parse(metadata.data);

    switch (instanceType) {
      case 'appointment':
        createAppoint(data, (err, data) => {
          if (err) {
            console.log(`⚠️  Error creating appointment.`, err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
          } else {
            console.log(`🔔  Appointment created successfully.`);
          }
        });
        break;
      case 'certificate':
        buyCertificates(data.client_id, data.certificate_id, (err, data) => {
          if (err) {
            console.log(`⚠️  Error buying certificate.`, err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
          } else {
            console.log(`🔔  Certificate bought successfully.`);
          }
        });
        break;
      case 'package':
        buyPackages(data.client_id, data.packages, (err, data) => {
          if (err) {
            console.log(`⚠️  Error buying package.`, err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
          } else {
            console.log(`🔔  Package bought successfully.`);
          }
        });
        break;
    }
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
}

export default stripe;