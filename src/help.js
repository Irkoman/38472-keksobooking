module.exports = {
  name: `--help`,
  description: `Shows available commands`,
  execute() {
    console.log(`
      Доступные команды:
      --help        — вывести список доступных команд;
      --version     — узнать версию приложения;
      --author      — узнать имя автора приложения;
      --license     — узнать лицензию приложения;
      --description — вывести описание приложения;
    `);
  }
};
