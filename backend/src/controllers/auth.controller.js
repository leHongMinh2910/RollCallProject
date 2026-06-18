const authService = require('../services/auth.service');

async function login(req, res) {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

function me(req, res) {
  res.json(req.user);
}

module.exports = { login, me };
