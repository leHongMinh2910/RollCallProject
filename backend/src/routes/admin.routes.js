const router = require('express').Router();
const c = require('../controllers/admin.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

router.use(authenticate, authorize('admin'));
router.get('/users', c.listUsers);
router.post('/users', c.createAccount);
router.put('/users/:id', c.updateAccount);
router.delete('/users/:id', c.deleteAccount);
router.get('/subjects', c.listSubjects);
router.post('/subjects', c.createSubject);
router.put('/subjects/:id', c.updateSubject);
router.delete('/subjects/:id', c.deleteSubject);
router.get('/classes', c.listClasses);
router.post('/classes', c.createClass);
router.put('/classes/:id', c.updateClass);
router.delete('/classes/:id', c.deleteClass);
router.post('/classes/:classId/students', c.enrollStudent);
router.delete('/classes/:classId/students/:studentId', c.removeStudentFromClass);

module.exports = router;
