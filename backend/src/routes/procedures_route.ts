import { Router } from 'express';
var router = Router();
import * as proc from '../controllers/procedures_controller.js';

//Routing for the home page//

//Retrieve all procedures
router.get('/main_proc', function(req, res){
    proc.loadProc(0, res);
});
router.get('/optional_proc', function(req, res){
    proc.loadProc(1, res);
});
router.post('/create_proc', function(req, res){
    proc.createProc(req.body, res);
});

export default router;
