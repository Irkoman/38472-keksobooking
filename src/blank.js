module.exports = {
  name: `blank`,
  description: `No user command`,
  execute() {
    console.log(`
      Hello, world!
      Эта программа будет запускать сервер «Кексобукинга».
      Автор: Ирина Смирнова.
    `);
    process.exit();
  }
};
