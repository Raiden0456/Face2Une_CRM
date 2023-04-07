import { Router } from 'express';
var router = Router();
import * as auth from '../controllers/users_controller.js';

//Routing for the Authentication//

router.post('/sign_up', function(req, res){
    auth.signUp(req.body, res); 
});
router.post('/sign_in', function(req, res){
    auth.signIn(req.body, res);
});
router.get('/sign_out', function(req, res){
    // Destroy the session //
    auth.signOut(res);
    /////////////////////////
    res.json({ success: true, data: "user signed out" });
});

router.get('/session_user', function(req, res){
    auth.session_user(res);
});

export default router;