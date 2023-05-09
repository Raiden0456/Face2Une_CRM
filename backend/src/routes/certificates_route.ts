import { Router } from "express";
var router = Router();
import Stripe from "stripe";
import * as cert from "../controllers/certificates_controller.js";
import stripe from "../services/stripe.js";

//Routing for the certificates//

router.get("/cert", function (req, res) {
  cert.loadCert(req.query.saloon_id, res);
});
router.get("/cert/:certid", function (req, res) {
  cert.findOneCert(req.params.certid, res);
});
router.post("/create_cert", function (req, res) {
  cert.createCert(req.body, res);
});
router.post("/update_cert", function (req, res) {
  cert.updateCert(req.body, res);
});
router.delete("/delete_cert/:certid", function (req, res) {
  cert.deleteCert(req.params.certid, res);
});

// buy certificates //
router.post("/buy_cert", async function (req, res) {
  // Get certificate details
  const certificate = (await cert.findOneCert(
    req.body.certificate_id,
    res
  )) as any;
  const currency = req.body.saloon_id == 3 ? "GBP" : "EUR";
  const total_price =
    req.body.saloon_id == 3
      ? certificate.data.price_gbp
      : certificate.data.price;

  // Prepare stripe payment session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Certificate",
            },
            unit_amount: total_price * 100, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
      metadata: {
        instanceType: "certificate",
        data: JSON.stringify(req.body),
      },
    });

    // Respond with session ID
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the checkout session.",
    });
  }
});
export default router;
