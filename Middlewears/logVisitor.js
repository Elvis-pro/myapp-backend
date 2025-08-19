const fs = require('fs');
const path = require('path');

const logToFile = (req, res, next) => {
  const logFile = path.join(__dirname, '../logs/visitors.log');
  const logLine = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.ip}\n`;

  fs.appendFile(logFile, logLine, (err) => {
    if (err) console.error('Error writing log to file:', err.message);
  });

  next();
};

module.exports = logToFile;
