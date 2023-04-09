import { Router } from 'express';
var router = Router();
import * as saloons from '../controllers/saloons_controller.js';

//Routing for the saloons//

router.get('/saloons', function(req, res){
    saloons.loadSaloon(res);
});
router.get('/saloons/:saloonid', function(req, res){
    saloons.findOneSaloon(req.params.saloonid, res);
});
router.post('/create_saloon', function(req, res){
    saloons.createSaloon(req.body, res);
});
router.post('/update_saloon', function(req, res){
    saloons.updateSaloon(req.body, res);
});
router.delete('/delete_saloon/:saloonid', function(req, res){
    saloons.deleteSaloon(req.params.saloonid, res);
});

export default router;