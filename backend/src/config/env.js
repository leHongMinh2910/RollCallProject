require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'attendance_super_secret_2026_change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  dbStorage: process.env.DB_STORAGE || './attendance.sqlite'
};
