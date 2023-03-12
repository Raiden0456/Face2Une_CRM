import { Router } from 'express';
var router = Router();
import * as coupon from '../controllers/coupons_controller.js';

//Routing for the coupons//

router.get('/coupon', function(req, res){
    coupon.loadCoupon(req, res);
});
router.get('/coupon/:couponid', function(req, res){
    coupon.findOneCoupon(req.params.couponid, res);
});
router.post('/create_coupon', function(req, res){
    coupon.createCoupon(req.body, res);
});
router.post('/update_coupon', function(req, res){
    coupon.updateCoupon(req.body, res);
});
router.delete('/delete_coupon/:couponid', function(req, res){
    coupon.deleteCoupon(req.params.couponid, res);
});

// // use promocodes //
// router.post('/use_pack', function(req, res){
//     pack.usePackage(req.body.client_id, req.body.promocode, res);
// });


export default router;
