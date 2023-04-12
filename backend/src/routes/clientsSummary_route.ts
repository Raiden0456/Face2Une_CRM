import { Router } from 'express';
var router = Router();
import * as clientSum from '../controllers/clientsSummary_controller.js';

//Routing for the clients//

router.get('/clients_summary', function(req, res){
    clientSum.loadSummary(req.query, res);
});

export default router;