const command = process.argv[2];

if (!command) {
  console.log(`
    Hello, world!
    Эта программа будет запускать сервер «Кексобукинга».
    Автор: Ирина Смирнова.
  `);
  process.exit(0);
}

switch (command) {
  case `--version`:
    console.log(`v0.0.1`);
    break;
  case `--help`:
    console.log(`
      Доступные команды:
      --help    — печатает этот текст;
      --version — печатает версию приложения;
    `);
    break;
  default:
    console.error(`
      Неизвестная команда: ${command}.
      Чтобы прочитать правила использования приложения, наберите '--help'
    `);
    process.exit(1);
    break;
}
