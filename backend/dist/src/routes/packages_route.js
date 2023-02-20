import { Router } from 'express';
var router = Router();
import * as pack from '../controllers/packages_controller.js';
//Routing for the procedures//
router.get('/pack', function (req, res) {
    pack.loadPack(req, res);
});
router.get('/pack/:packid', function (req, res) {
    pack.findOnePack(req.params.packid, res);
});
router.post('/create_pack', function (req, res) {
    pack.createPack(req.body, res);
});
router.post('/update_pack', function (req, res) {
    pack.updatePack(req.body, res);
});
router.delete('/delete_pack/:packid', function (req, res) {
    pack.deletePack(req.params.packid, res);
});
// buy and use packages //
router.post('/buy_pack', function (req, res) {
    pack.buyPackages(req.body.client_id, req.body.packages, res);
});
router.post('/use_pack', function (req, res) {
    pack.usePackage(req.body.client_id, req.body.promocode, res);
});
export default router;
//# sourceMappingURL=packages_route.js.map