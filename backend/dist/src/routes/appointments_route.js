import { Router } from 'express';
var router = Router();
import * as appoint from '../controllers/appointments_controller.js';
//Routing for the appointments//
router.get('/appoint', function (req, res) {
    appoint.loadAppoint(req.query, res);
});
router.get('/appoint/:appointid', function (req, res) {
    appoint.loadAppoint({ column: "id", value: req.params.appointid }, res);
});
router.post('/create_appoint', function (req, res) {
    appoint.createAppoint(req.body, res);
});
router.post('/update_appoint', function (req, res) {
    appoint.updateAppoint(req.body, res);
});
router.delete('/delete_appoint/:appointid', function (req, res) {
    appoint.deleteAppoint(req.params.appointid, res);
});
export default router;
//# sourceMappingURL=appointments_route.js.map