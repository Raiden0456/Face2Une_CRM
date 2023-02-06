import { Router } from 'express';
var router = Router();
import * as auth from '../controllers/users_controller.js';

//Routing for the authintication//

router.post('/sign_up', function(req, res){
    auth.createUser(req.body, res);
    let session=req.session;
    session.user = req.body;
    console.log(session);
});
router.post('/sign_in', function(req, res){
    auth.loginUser(req.body, res);
    let session=req.session;
    session.user = req.body;
    console.log(session);
});
router.get('/getUser', function(req, res){
    let session=req.session;
    console.log(session);
    if (session.user) {
        auth.loadUsers({column: "id", value: session.user.id}, res);
    }
    else {
        res.json({ success: false, data: "no user in session" });
    }
   
});

export default router;