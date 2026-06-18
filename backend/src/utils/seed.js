const { sequelize, Subject, Class, Enrollment, Lesson, Attendance } = require('../models');
const { createUser } = require('../services/auth.service');

async function seed() {
  await sequelize.sync({ force: true });
  const admin = await createUser({ username: 'Admin', email: 'admin@example.com', password: '123456', role: 'admin', address: 'Office' });
  const teacher = await createUser({ username: 'Teacher One', email: 'teacher@example.com', password: '123456', role: 'teacher', address: 'Room A' });
  const student = await createUser({ username: 'Student One', email: 'student@example.com', password: '123456', role: 'student', address: 'Dorm' });
  const subject = await Subject.create({ name: 'Software Architecture' });
  const klass = await Class.create({ name: 'SA-01', code: 'SA01', subjectId: subject.id, teacherId: teacher.id });
  await Enrollment.create({ classId: klass.id, studentId: student.id });
  const lesson = await Lesson.create({ name: 'Lesson 1', lessonDate: new Date(), classId: klass.id, isOpen: true });
  await Attendance.create({ lessonId: lesson.id, studentId: student.id, status: 'pending' });
  console.log({ admin, teacher, student, class: klass.toJSON(), lesson: lesson.toJSON() });
  await sequelize.close();
}

seed().catch((error) => { console.error(error); process.exit(1); });
