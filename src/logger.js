const winston = require(`winston`);

const logger = winston.createLogger({
  level: `info`,
  format: winston.format.json(),
  transports: [
    //
    // Ошибки записываются в файл `error.log`
    // Сообщения всех уровней записываются в файл `combined.log`
    //
    new winston.transports.File({filename: `error.log`, level: `error`}),
    new winston.transports.File({filename: `combined.log`})
  ]
});

//
// Если приложение запущено не в режиме `production`,
// сообщения всех уровней выводятся в консоль
//
if (process.env.NODE_ENV !== `production`) {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
