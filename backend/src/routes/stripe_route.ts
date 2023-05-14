import { Router } from 'express';
import bodyParser from 'body-parser';
import { handleStripeWebhook } from '../services/stripe.js';

var router = Router();

router.post('/webhook', bodyParser.raw({type: 'application/json'}), function(req, res){
  handleStripeWebhook(req, res);
});

export default router;
