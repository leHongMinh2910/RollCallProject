const adminService = require('../services/admin.service');
const { ok, created, noContent } = require('../utils/controller-response');

const listUsers = ok((req) => adminService.listUsers(req.query.role));
const createAccount = created((req) => adminService.createAccount(req.body));
const updateAccount = ok((req) => adminService.updateAccount(req.params.id, req.body));
const deleteAccount = noContent((req) => adminService.deleteAccount(req.params.id));

const listSubjects = ok(() => adminService.listSubjects());
const createSubject = created((req) => adminService.createSubject(req.body));
const updateSubject = ok((req) => adminService.updateSubject(req.params.id, req.body));
const deleteSubject = noContent((req) => adminService.deleteSubject(req.params.id));

const listClasses = ok(() => adminService.listClasses());
const createClass = created((req) => adminService.createClass(req.body));
const updateClass = ok((req) => adminService.updateClass(req.params.id, req.body));
const deleteClass = noContent((req) => adminService.deleteClass(req.params.id));

const enrollStudent = created((req) => adminService.enrollStudent(req.params.classId, req.body.studentId));
const removeStudentFromClass = noContent((req) => (
  adminService.removeStudentFromClass(req.params.classId, req.params.studentId)
));

module.exports = {
  listUsers,
  createAccount,
  updateAccount,
  deleteAccount,
  listSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  listClasses,
  createClass,
  updateClass,
  deleteClass,
  enrollStudent,
  removeStudentFromClass
};