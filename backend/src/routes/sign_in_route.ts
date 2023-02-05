import { Router } from 'express';
var router = Router();
import * as signIn from '../controllers/users_controller.js';

//Routing for the sign in/up//

router.post('/sign_up', function(req, res){
    signIn.createUser(req.body, res);
});
router.post('/sign_in', function(req, res){
    signIn.loginUser(req.body, res);
});

export default router;