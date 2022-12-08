import { Router } from 'express';
var router = Router();
import { loadAllproc } from '../controllers/index_controller.js';
//Routing for the home page//
//Retrieve all procedures
//get a function return and then render with the data
router.get('/', function (req, res) {
    loadAllproc(req, res);
});
// Create a new Tutorial
//router.post("/", procedure.create);
export default router;
//# sourceMappingURL=index_route.js.map