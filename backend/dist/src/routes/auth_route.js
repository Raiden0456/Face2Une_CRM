import { Router } from 'express';
var router = Router();
import * as auth from '../controllers/users_controller.js';
//Routing for the authintication//
router.post('/sign_up', function (req, res) {
    auth.createUser(req.body, res);
});
router.post('/sign_in', function (req, res) {
    auth.loginUser(req.body, res);
    // Set the session //
    var session = req.session;
    session.user = req.body;
    /////////////////////
});
router.get('/sign_out', function (req, res) {
    // Destroy the session //
    req.session.destroy(function (err) {
        console.log('Session destroyed');
    });
    /////////////////////////
    res.json({ success: true, data: "user logged out" });
});
router.get('/session_user', function (req, res) {
    // Set the session //
    var session = req.session;
    // Check if the user is in the session //
    if (session.user) {
        auth.loadUsers({ column: "email", value: session.user.email }, res);
    }
    else {
        res.json({ success: false, data: "no user in session" });
    }
    /////////////////////////////////////////
});
export default router;
//# sourceMappingURL=auth_route.js.map