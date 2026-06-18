function send(action, statusCode = 200) {
  return async (req, res) => {
    try {
      const data = await action(req);
      if (statusCode === 204) return res.status(204).send();
      return res.status(statusCode).json(data);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  };
}

const ok = (action) => send(action);
const created = (action) => send(action, 201);
const noContent = (action) => send(action, 204);

module.exports = { ok, created, noContent };