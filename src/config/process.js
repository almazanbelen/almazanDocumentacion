const { Command } = require("commander");

const program = new Command();

program
  .option("-d", "Variable para debug", false)
  .option("-p", "Puerto del servidor", 8080)
  .option("--mode <mode>", "modo de trabajo", "develop");

program.parse();

console.log(program.opts());
