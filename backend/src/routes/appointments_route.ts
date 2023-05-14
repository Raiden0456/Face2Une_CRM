import { Router } from "express";
import * as appoint from "../controllers/appointments_controller.js";
import { getTotalCost } from "../utils/totalPrice_procs.js";
import stripe from "../services/stripe.js";
var router = Router();

// Routing for the appointments
router.get("/appoint", function (req, res) {
  appoint.loadAppoint(req.query, res);
});
router.get("/appoint/:appointid", function (req, res) {
  appoint.loadAppoint({ column: "id", value: req.params.appointid }, res);
});

router.post("/create_appoint", async function (req, res) {
  let all_ids = [];
  req.body.data.forEach(item => {
    all_ids.push(item.procedure_id);
    all_ids.push(...item.additional_ids);
  });
  const total_price = await getTotalCost(all_ids, req.body.data[0].saloon_id, req.body.promocode);
  // Prepare stripe payment session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: total_price.currency,
            product_data: {
              name: "Appointment",
            },
            unit_amount: total_price.total * 100, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:process.env.CORS_ORIGIN + "/success",
      cancel_url:process.env.CORS_ORIGIN + "/cancel",
      metadata: {
        instanceType: "appointment",
        data: JSON.stringify(req.body),
      },
    });

   // Send session id to frontend
   res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the checkout session.",
    });
  }
});

router.post("/update_appoint", function (req, res) {
  appoint.updateAppoint(req.body, res);
});

router.delete("/delete_appoint/:appointid", function (req, res) {
  appoint.deleteAppoint(req.params.appointid, res);
});

export default router;
