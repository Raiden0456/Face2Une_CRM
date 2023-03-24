import { Router } from 'express';
var router = Router();
import * as coupon from '../controllers/found_us_controller.js';

//Routing for the Found us sources//

router.get('/sources', function(req, res){
    coupon.loadSources(res);
});
router.get('/sources/:sourceid', function(req, res){
    coupon.findOneSource(req.params.sourceid, res);
});
router.post('/create_source', function(req, res){
    coupon.createSource(req.body, res);
});
router.post('/update_source', function(req, res){
    coupon.updateSource(req.body, res);
});
router.delete('/delete_source/:sourceid', function(req, res){
    coupon.deleteSource(req.params.sourceid, res);
});
router.post('/add_source_weight', function(req, res){
    coupon.addWeight(req.body, res);
});

export default router;