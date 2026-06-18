const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const { User } = require('../models');
const { bindSocket } = require('../services/notification.service');

function setupSocket(io) {
  bindSocket(io);
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth && socket.handshake.auth.token;
      if (!token) return next(new Error('Missing socket token'));
      const payload = jwt.verify(token, jwtSecret);
      const user = await User.findByPk(payload.id);
      if (!user) return next(new Error('Invalid socket user'));
      socket.user = user;
      next();
    } catch (error) {
      next(error);
    }
  });

  io.on('connection', (socket) => {
    if (socket.user.role === 'teacher') socket.join(`teacher:${socket.user.id}`);
    socket.emit('socket:ready', { userId: socket.user.id, role: socket.user.role });
  });
}

module.exports = setupSocket;
