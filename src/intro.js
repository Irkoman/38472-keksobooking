require(`colors`);

module.exports = {
  name: `intro`,
  description: `Shows intro`,
  execute() {
    console.log(`
      Приветствую тебя, землянин.
      Эта программа будет запускать сервер «Кексобукинга».
      Для начала сгенерируй данные с помощью команды ${`--generate`.green}
    `);
    process.exit();
  }
};
