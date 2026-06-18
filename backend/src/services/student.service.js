const { Class, Subject, User, Lesson, Attendance, LeaveRequest } = require('../models');
const { notifyTeacherLeaveRequest } = require('./notification.service');
const httpError = require('../utils/http-error');

async function myClasses(studentId) {
  return Class.findAll({
    include: [
      { model: Subject, as: 'subject' },
      { model: User, as: 'teacher', attributes: ['id', 'username', 'email'] },
      { model: User, as: 'students', where: { id: studentId }, attributes: [] }
    ]
  });
}

async function myAttendances(studentId) {
  return Attendance.findAll({
    where: { studentId },
    include: [{
      model: Lesson,
      as: 'lesson',
      include: [{
        model: Class,
        as: 'class',
        include: [
          { model: Subject, as: 'subject' },
          { model: User, as: 'teacher', attributes: ['id', 'username', 'email'] }
        ]
      }]
    }],
    order: [['id', 'DESC']]
  });
}

async function createLeaveRequest(student, payload) {
  const lesson = await Lesson.findByPk(payload.lessonId, { include: [{ model: Class, as: 'class' }] });
  if (!lesson || !lesson.isOpen) throw httpError(400, 'Lesson is closed or not found');

  const isEnrolled = await lesson.class.hasStudent(student.id);
  if (!isEnrolled) throw httpError(403, 'You are not in this class');

  const request = await LeaveRequest.create({
    lessonId: lesson.id,
    studentId: student.id,
    reason: payload.reason
  });

  await notifyTeacherLeaveRequest({
    teacherId: lesson.class.teacherId,
    student,
    lessonId: lesson.id,
    reason: payload.reason
  });

  return request;
}

async function myLeaveRequests(studentId) {
  return LeaveRequest.findAll({
    where: { studentId },
    include: [{ model: Lesson, as: 'lesson' }],
    order: [['id', 'DESC']]
  });
}

module.exports = {
  myClasses,
  myAttendances,
  createLeaveRequest,
  myLeaveRequests
};