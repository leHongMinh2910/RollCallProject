const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const { sequelize } = require('./models');
const { port, clientUrl } = require('./config/env');
const setupSocket = require('./socket');

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: clientUrl, credentials: true } });
setupSocket(io);

async function bootstrap() {
  await sequelize.sync();
  server.listen(port, () => console.log(`API running at http://localhost:${port}`));
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
