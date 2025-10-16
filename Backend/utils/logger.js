const format = (level, message) =>
  `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;

const logger = {
  info: (msg) => console.log(format('info', msg)),
  warn: (msg) => console.warn(format('warn', msg)),
  error: (msg) => console.error(format('error', msg))
};

module.exports = logger; 