import { Router } from 'express';
var router = Router();
import * as promo from '../controllers/promocodes_controller.js';

//Routing for the promocodes//

router.get('/promo', function(req, res){
    promo.loadPromo(req, res);
});
router.get('/promo/:promoid', function(req, res){
    promo.findOnePromo(req.params.promoid, res);
});
router.post('/create_promo', function(req, res){
    promo.createPromo(req.body, res);
});
router.post('/update_promo', function(req, res){
    promo.updatePromo(req.body, res);
});
router.delete('/delete_promo/:promoid', function(req, res){
    promo.deletePromo(req.params.promoid, res);
});

// // use promocodes //
// router.post('/use_pack', function(req, res){
//     pack.usePackage(req.body.client_id, req.body.promocode, res);
// });


export default router;
