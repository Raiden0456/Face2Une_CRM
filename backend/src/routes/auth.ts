import { Router } from 'express';
var router = Router();
import * as auth from '../controllers/users_controller.js';

//Routing for the authintication//

router.post('/sign_up', function(req, res){
    auth.createUser(req.body, res);
});
router.post('/sign_in', function(req, res){
    auth.loginUser(req.body, res);
});

export default router;