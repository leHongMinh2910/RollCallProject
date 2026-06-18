const studentService = require('../services/student.service');
const { ok, created } = require('../utils/controller-response');

const myClasses = ok((req) => studentService.myClasses(req.user.id));
const myAttendances = ok((req) => studentService.myAttendances(req.user.id));
const createLeaveRequest = created((req) => studentService.createLeaveRequest(req.user, req.body));
const myLeaveRequests = ok((req) => studentService.myLeaveRequests(req.user.id));

module.exports = {
  myClasses,
  myAttendances,
  createLeaveRequest,
  myLeaveRequests
};