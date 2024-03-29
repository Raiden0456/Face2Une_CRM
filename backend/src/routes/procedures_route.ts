import { Router } from 'express';
var router = Router();
import * as proc from '../controllers/procedures_controller.js';

//Routing for the procedures//

router.get('/main_proc', function(req, res){
    proc.loadProc(0, req.query.saloon_id, res);
});
router.get('/optional_proc', function(req, res){
    proc.loadProc(1, req.query.saloon_id, res);
});
router.get('/proc/:procid', function(req, res){
    proc.findOneProc(req.params.procid, res);
});
router.post('/create_proc', function(req, res){
    proc.createProc(req.body, res);
});
router.post('/update_proc', function(req, res){
    proc.updateProc(req.body, res);
});
router.delete('/delete_proc/:procid', function(req, res){
    proc.deleteProc(req.params.procid, res);
});

router.get('/proc_total', function(req, res){
    const proc_ids_array = req.query.proc_array.split(',');
    const saloon_id = req.query.saloon_id ? req.query.saloon_id : 1;
    proc.totalCost(proc_ids_array, saloon_id, res);
});
export default router;
