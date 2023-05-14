import { Router } from 'express';
var router = Router();
import * as pack from '../controllers/packages_controller.js';
import { getTotalCostPack } from '../utils/totalPrice_pack.js';
import stripe from "../services/stripe.js";
//Routing for the packages//

router.get('/pack', function(req, res){
    pack.loadPack(req.query.saloon_id, res);
});
router.get('/pack/:packid', function(req, res){
    pack.findOnePack(req.params.packid, res);
});
router.post('/create_pack', function(req, res){
    pack.createPack(req.body, res);
});
router.post('/update_pack', function(req, res){
    pack.updatePack(req.body, res);
});
router.delete('/delete_pack/:packid', function(req, res){
    pack.deletePack(req.params.packid, res);
});

// buy packages //
router.post('/buy_pack', async function(req, res){
    const total_price = await getTotalCostPack(req.body.saloon_id, req.body.packages);
   // Prepare stripe payment session
    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
            price_data: {
                currency: total_price.currency,
                product_data: {
                name: "Package",
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
            instanceType: "package",
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


export default router;
