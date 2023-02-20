import { Router } from 'express';
var router = Router();
import * as user from '../controllers/users_controller.js';
//Routing for the users//
router.get('/users', function (req, res) {
    user.loadUsers(req.query, res);
});
router.get('/users/:userid', function (req, res) {
    user.loadUsers({ column: "id", value: req.params.userid }, res);
});
router.post('/create_user', function (req, res) {
    user.createUser(req.body, res);
});
router.post('/update_user', function (req, res) {
    user.updateUser(req.body, res);
});
router.delete('/delete_user/:userid', function (req, res) {
    user.deleteUser(req.params.userid, res);
});
export default router;
//# sourceMappingURL=users_route.js.map