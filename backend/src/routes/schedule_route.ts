import { Router } from 'express';
var router = Router();
import * as schedule from '../controllers/schedule_controller.js';

//Routing for the schedule//

router.get('/schedule', function(req, res){
    schedule.loadSchedule(req.query, res);
});
router.get('/schedule/:scheduleid', function(req, res){
    schedule.loadSchedule({column: "id", value: req.params.scheduleid}, res);
});
router.post('/create_schedule', function(req, res){
    schedule.createSchedule(req.body, res);
});
router.post('/update_schedule', function(req, res){
    schedule.updateSchedule(req.body, res);
});
router.delete('/delete_schedule/:scheduleid', function(req, res){
    schedule.deleteSchedule(req.params.scheduleid, res);
});
router.post('/schedule_lunch', function(req, res){
    schedule.setLunchTime(req.body, res);
});
export default router;
