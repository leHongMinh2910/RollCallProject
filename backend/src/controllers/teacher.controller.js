const teacherService = require('../services/teacher.service');
const { ok, created } = require('../utils/controller-response');

const myClasses = ok((req) => teacherService.myClasses(req.user.id));
const createLesson = created((req) => teacherService.createLesson(req.user.id, req.body));
const myLessons = ok((req) => teacherService.myLessons(req.user.id));
const updateLesson = ok((req) => teacherService.updateLesson(req.user.id, req.params.id, req.body));
const lessonAttendances = ok((req) => teacherService.lessonAttendances(req.user.id, req.params.lessonId));
const markAttendance = ok((req) => teacherService.markAttendance(req.user.id, req.body));
const leaveRequests = ok((req) => teacherService.leaveRequests(req.user.id));
const updateLeaveRequest = ok((req) => (
  teacherService.updateLeaveRequest(req.user.id, req.params.id, req.body.status)
));
const notifications = ok((req) => teacherService.notifications(req.user.id));
const readNotification = ok((req) => teacherService.readNotification(req.user.id, req.params.id));

module.exports = {
  myClasses,
  createLesson,
  myLessons,
  updateLesson,
  lessonAttendances,
  markAttendance,
  leaveRequests,
  updateLeaveRequest,
  notifications,
  readNotification
};