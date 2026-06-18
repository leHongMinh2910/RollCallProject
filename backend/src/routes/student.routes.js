const router = require('express').Router();
const c = require('../controllers/student.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.use(authenticate, authorize('student'));
router.get('/classes', c.myClasses);
router.get('/attendances', c.myAttendances);
router.get('/leave-requests', c.myLeaveRequests);
router.post('/leave-requests', c.createLeaveRequest);

module.exports = router;
