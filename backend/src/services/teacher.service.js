const { User, Class, Subject, Lesson, Attendance, LeaveRequest, Notification } = require('../models');
const httpError = require('../utils/http-error');

const publicUserAttrs = { exclude: ['password'] };

async function ensureTeacherOwnsClass(classId, teacherId) {
  const klass = await Class.findOne({ where: { id: classId, teacherId } });
  if (!klass) throw httpError(403, 'Class is not assigned to this teacher');
  return klass;
}

async function findOwnedLesson(lessonId, teacherId) {
  const lesson = await Lesson.findByPk(lessonId, { include: [{ model: Class, as: 'class' }] });
  if (!lesson || lesson.class.teacherId !== teacherId) throw httpError(404, 'Lesson not found');
  return lesson;
}

async function myClasses(teacherId) {
  return Class.findAll({
    where: { teacherId },
    include: [{ model: Subject, as: 'subject' }, { model: User, as: 'students', attributes: publicUserAttrs }]
  });
}

async function createLesson(teacherId, payload) {
  const klass = await ensureTeacherOwnsClass(payload.classId, teacherId);
  const lesson = await Lesson.create(payload);
  const students = await klass.getStudents();

  await Promise.all(students.map((student) => (
    Attendance.findOrCreate({ where: { lessonId: lesson.id, studentId: student.id } })
  )));

  return lesson;
}

async function myLessons(teacherId) {
  return Lesson.findAll({
    include: [{ model: Class, as: 'class', where: { teacherId }, include: [{ model: Subject, as: 'subject' }] }],
    order: [['lessonDate', 'DESC'], ['id', 'DESC']]
  });
}

async function updateLesson(teacherId, lessonId, payload) {
  const lesson = await findOwnedLesson(lessonId, teacherId);
  await lesson.update(payload);
  return lesson;
}

async function lessonAttendances(teacherId, lessonId) {
  const lesson = await findOwnedLesson(lessonId, teacherId);
  return Attendance.findAll({
    where: { lessonId: lesson.id },
    include: [{ model: User, as: 'student', attributes: publicUserAttrs }]
  });
}

async function markAttendance(teacherId, payload) {
  const { lessonId, studentId, status } = payload;
  const lesson = await findOwnedLesson(lessonId, teacherId);
  const isEnrolled = await lesson.class.hasStudent(studentId);
  if (!isEnrolled) throw httpError(400, 'Student is not enrolled in this class');

  const [attendance] = await Attendance.findOrCreate({ where: { lessonId, studentId } });
  await attendance.update({ status });
  return attendance;
}

async function leaveRequests(teacherId) {
  return LeaveRequest.findAll({
    include: [
      { model: User, as: 'student', attributes: publicUserAttrs },
      { model: Lesson, as: 'lesson', include: [{ model: Class, as: 'class', where: { teacherId } }] }
    ],
    order: [['id', 'DESC']]
  });
}

async function updateLeaveRequest(teacherId, requestId, status) {
  const request = await LeaveRequest.findByPk(requestId, {
    include: [{ model: Lesson, as: 'lesson', include: [{ model: Class, as: 'class' }] }]
  });
  if (!request || request.lesson.class.teacherId !== teacherId) throw httpError(404, 'Leave request not found');

  await request.update({ status });
  return request;
}

async function notifications(teacherId) {
  return Notification.findAll({ where: { teacherId }, order: [['id', 'DESC']] });
}

async function readNotification(teacherId, notificationId) {
  const item = await Notification.findOne({ where: { id: notificationId, teacherId } });
  if (!item) throw httpError(404, 'Notification not found');
  await item.update({ read: true });
  return item;
}

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