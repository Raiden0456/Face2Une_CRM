import { Router } from 'express';
var router = Router();
import { loadProc } from '../controllers/index_controller.js';
//Routing for the home page//
//Retrieve all procedures
router.get('/', function (req, res) {
    loadProc(0, res);
});
// Create a new Tutorial
//router.post("/", procedure.create);
export default router;
//# sourceMappingURL=index_route.js.map