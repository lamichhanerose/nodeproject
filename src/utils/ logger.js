import fs from 'fs';
import winston, { format } from 'winston';

import 'winston-daily-rotate-file';

const LOG_DIR = process.env.LOG_DIR || 'logs';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Create log directory if not exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Create winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: 'info'
    }),
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      maxFiles: '14d',
      dirname: LOG_DIR,
      datePattern: 'YYYY-MM-DD',
      filename: '%DATE%-debug.log'
    })
  ]
});

/**
 * A writable stream for winston logger.
 */
export const logStream = {
  write(message) {
    logger.info(message.toString());
  }
};

export default logger;