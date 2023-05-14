// webhook.js
import Stripe from "stripe";
import { createAppoint } from "../controllers/appointments_controller.js";
import Certificate from "../models/certificates_model.js";
import PackageP from "../models/packages_model.js";
import PromoCode from "../models/codes_model.js";
import exp from "constants";

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function handleStripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];
  console.log(`🔔  Webhook received! ${sig}`);
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_TEST_ENDPOINT_SECRET
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Extract metadata
    const metadata = session.metadata;
    const instanceType = metadata.instanceType;
    const data = JSON.parse(metadata.data);

    switch (instanceType) {
      case "appointment":
        try {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            await createAppoint(data[i]);
          }
          console.log(`🔔  Appointment(s) created successfully.`);
        } catch (err) {
          console.log(`⚠️  Error creating appointment.`, err.message);
          return res.status(err.status).send(`Webhook Error: ${err.message}`);
        }
        break;
      case "certificate":
        try {
          console.log(data);
          await Certificate.buyCertificate(
            data.client_id,
            data.certificate_id,
            data.saloon_id
          );
          console.log(`🔔  Certificate instance in db created successfully.`);
        } catch (err) {
          console.log(
            `⚠️  Error creating certificate instance in db.`,
            err.message
          );
          return res.status(err.status).send(`Webhook Error: ${err.message}`);
        }
        break;
      case "package":
        try {
          console.log(data);
          await PackageP.buyPackages(data.client_id, data.packages);
          console.log(`🔔  Package(s) instance in db created successfully.`);
        } catch (err) {
          console.log(
            `⚠️  Error creating package instance in db.`,
            err.message
          );
          return res.status(err.status).send(`Webhook Error: ${err.message}`);
        }

        break;
    }
    // use code //
    if (data.promocode) {
      const params = {
        email: data.email,
        promocode: data.promocode,
        total_price: data.total_price,
      };
      try {
        const data_p = await PromoCode.useCode(params);
        console.log(`🔔 Code used successfully.`);
      } catch (err) {
        console.log(`⚠️  Error using code.`, err.message);
      }
    }
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}

export default stripe;
