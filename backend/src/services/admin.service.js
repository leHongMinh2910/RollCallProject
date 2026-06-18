const { User, Subject, Class, Enrollment } = require('../models');
const { createUser } = require('./auth.service');
const httpError = require('../utils/http-error');

const publicUserAttrs = { exclude: ['password'] };

async function listUsers(role) {
  const where = role ? { role } : undefined;
  return User.findAll({ where, attributes: publicUserAttrs, order: [['id', 'DESC']] });
}

async function createAccount(payload) {
  return createUser(payload);
}

async function updateAccount(id, payload) {
  const user = await User.findByPk(id);
  if (!user) throw httpError(404, 'User not found');

  const data = { ...payload };
  delete data.password;
  await user.update(data);

  const plain = user.toJSON();
  delete plain.password;
  return plain;
}

async function deleteAccount(id) {
  const user = await User.findByPk(id);
  if (!user) throw httpError(404, 'User not found');
  await user.destroy();
}

async function listSubjects() {
  return Subject.findAll({ order: [['id', 'DESC']] });
}

async function createSubject(payload) {
  return Subject.create(payload);
}

async function updateSubject(id, payload) {
  const subject = await Subject.findByPk(id);
  if (!subject) throw httpError(404, 'Subject not found');
  await subject.update(payload);
  return subject;
}

async function deleteSubject(id) {
  const subject = await Subject.findByPk(id);
  if (!subject) throw httpError(404, 'Subject not found');
  await subject.destroy();
}

async function listClasses() {
  return Class.findAll({
    include: [
      { model: Subject, as: 'subject' },
      { model: User, as: 'teacher', attributes: publicUserAttrs },
      { model: User, as: 'students', attributes: publicUserAttrs }
    ],
    order: [['id', 'DESC']]
  });
}

async function createClass(payload) {
  return Class.create(payload);
}

async function updateClass(id, payload) {
  const klass = await Class.findByPk(id);
  if (!klass) throw httpError(404, 'Class not found');
  await klass.update(payload);
  return klass;
}

async function deleteClass(id) {
  const klass = await Class.findByPk(id);
  if (!klass) throw httpError(404, 'Class not found');
  await klass.destroy();
}

async function enrollStudent(classId, studentId) {
  const student = await User.findOne({ where: { id: studentId, role: 'student' } });
  if (!student) throw httpError(404, 'Student not found');

  const klass = await Class.findByPk(classId);
  if (!klass) throw httpError(404, 'Class not found');

  const [enrollment] = await Enrollment.findOrCreate({ where: { classId, studentId } });
  return enrollment;
}

async function removeStudentFromClass(classId, studentId) {
  await Enrollment.destroy({ where: { classId, studentId } });
}

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