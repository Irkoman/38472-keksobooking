require(`colors`);

module.exports = {
  name: `error`,
  description: `Unknown command`,
  execute(command) {
    console.error(`
      Неизвестная команда: ${command.red}
      Чтобы прочитать правила использования приложения, наберите ${`--help`.green}
    `);
    process.exit(1);
  }
};
