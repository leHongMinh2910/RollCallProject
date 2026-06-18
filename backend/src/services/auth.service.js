const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

function signUser(user) {
  return jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiresIn });
}

async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid email or password');
  const plain = user.toJSON();
  delete plain.password;
  return { token: signUser(user), user: plain };
}

async function createUser(data) {
  const hashed = await bcrypt.hash(data.password || '123456', 10);
  const user = await User.create({ ...data, password: hashed });
  const plain = user.toJSON();
  delete plain.password;
  return plain;
}

module.exports = { login, createUser };
