const express = require('express');
const cors = require('cors');
const { clientUrl } = require('./config/env');

const app = express();
app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/teacher', require('./routes/teacher.routes'));
app.use('/api/student', require('./routes/student.routes'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

module.exports = app;
