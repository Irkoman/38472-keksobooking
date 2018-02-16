require(`colors`);

module.exports = {
  name: `--help`,
  description: `Shows available commands`,
  execute() {
    console.log(`
      Доступные команды:
      ${`--help`.grey}        — ${`вывести список доступных команд`.green};
      ${`--version`.grey}     — ${`узнать версию приложения`.green};
      ${`--author`.grey}      — ${`узнать имя автора приложения`.green};
      ${`--license`.grey}     — ${`узнать лицензию приложения`.green};
      ${`--description`.grey} — ${`вывести описание приложения`.green};
    `);
  }
};
