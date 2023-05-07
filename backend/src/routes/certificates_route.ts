import { Router } from 'express';
var router = Router();
import * as cert from '../controllers/certificates_controller.js';

//Routing for the certificates//

router.get('/cert', function(req, res){
    cert.loadCert(req.query.saloon_id, res);
});
router.get('/cert/:certid', function(req, res){
    cert.findOneCert(req.params.certid, res);
});
router.post('/create_cert', function(req, res){
    cert.createCert(req.body, res);
});
router.post('/update_cert', function(req, res){
    cert.updateCert(req.body, res);
});
router.delete('/delete_cert/:certid', function(req, res){
    cert.deleteCert(req.params.certid, res);
});

// buy certificates //
router.post('/buy_cert', function(req, res){
    //TODO: connect stripe payment here
    cert.buyCertificates(req.body.client_id, req.body.certificate_id, res);
});


export default router;
