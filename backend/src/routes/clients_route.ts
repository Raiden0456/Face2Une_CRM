import { Router } from 'express';
var router = Router();
import * as client from '../controllers/clients_controller.js';

//Routing for the clients//

router.get('/clients', function(req, res){
    client.loadClients(res);
});
router.get('/clients/:clientid', function(req, res){
    client.findOneClient(req.params.clientid, res);
});
router.post('/create_client', function(req, res){
    client.createClient(req.body, res);
});
router.post('/update_client', function(req, res){
    client.updateClient(req.body, res);
});
router.delete('/delete_client/:clientid', function(req, res){
    client.deleteClient(req.params.clientid, res);
});
export default router;
