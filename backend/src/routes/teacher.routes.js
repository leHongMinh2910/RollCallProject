const router = require('express').Router();
const c = require('../controllers/teacher.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.use(authenticate, authorize('teacher'));
router.get('/classes', c.myClasses);
router.get('/lessons', c.myLessons);
router.post('/lessons', c.createLesson);
router.put('/lessons/:id', c.updateLesson);
router.get('/lessons/:lessonId/attendances', c.lessonAttendances);
router.post('/attendances', c.markAttendance);
router.get('/leave-requests', c.leaveRequests);
router.patch('/leave-requests/:id', c.updateLeaveRequest);
router.get('/notifications', c.notifications);
router.patch('/notifications/:id/read', c.readNotification);

module.exports = router;
