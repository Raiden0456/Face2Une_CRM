import { Router } from 'express';
var router = Router();
import * as code from '../controllers/codes_controller.js';

//Routing for the packages//

router.get('/code_check', function(req, res){
    code.checkCodeType(req.query.email, req.query.code, res);
});
// router.post('/use_code', function(req, res){
//     code.useCode(req.body, res);
// });

export default router;
