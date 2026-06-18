const { Notification, User, Lesson } = require('../models');
let io;

function bindSocket(socketServer) {
  io = socketServer;
}

async function notifyTeacherLeaveRequest({ teacherId, student, lessonId, reason }) {
  const lesson = await Lesson.findByPk(lessonId);
  const notification = await Notification.create({
    teacherId,
    title: 'New leave request',
    message: `${student.username} requested leave for ${lesson ? lesson.name : 'a lesson'}: ${reason}`
  });
  const payload = await Notification.findByPk(notification.id, { include: [{ model: User, as: 'teacher', attributes: ['id', 'username', 'email'] }] });
  if (io) io.to(`teacher:${teacherId}`).emit('notification:new', payload);
  return payload;
}

module.exports = { bindSocket, notifyTeacherLeaveRequest };
