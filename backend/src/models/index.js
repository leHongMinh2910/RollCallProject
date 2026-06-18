const sequelize = require('../config/database');
const User = require('./User');
const Subject = require('./Subject');
const Class = require('./Class');
const Enrollment = require('./Enrollment');
const Lesson = require('./Lesson');
const Attendance = require('./Attendance');
const LeaveRequest = require('./LeaveRequest');
const Notification = require('./Notification');

Subject.hasMany(Class, { foreignKey: 'subjectId', as: 'classes' });
Class.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });

User.hasMany(Class, { foreignKey: 'teacherId', as: 'teachingClasses' });
Class.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

Class.belongsToMany(User, { through: Enrollment, foreignKey: 'classId', otherKey: 'studentId', as: 'students' });
User.belongsToMany(Class, { through: Enrollment, foreignKey: 'studentId', otherKey: 'classId', as: 'attendClasses' });

Class.hasMany(Lesson, { foreignKey: 'classId', as: 'lessons' });
Lesson.belongsTo(Class, { foreignKey: 'classId', as: 'class' });

Lesson.hasMany(Attendance, { foreignKey: 'lessonId', as: 'attendances' });
Attendance.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' });
User.hasMany(Attendance, { foreignKey: 'studentId', as: 'attendances' });
Attendance.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Lesson.hasMany(LeaveRequest, { foreignKey: 'lessonId', as: 'leaveRequests' });
LeaveRequest.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' });
User.hasMany(LeaveRequest, { foreignKey: 'studentId', as: 'leaveRequests' });
LeaveRequest.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

User.hasMany(Notification, { foreignKey: 'teacherId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

module.exports = { sequelize, User, Subject, Class, Enrollment, Lesson, Attendance, LeaveRequest, Notification };
