"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const commander_1 = require("commander");
const down_1 = require("./commands/down");
const init_1 = require("./commands/init");
const new_1 = require("./commands/new");
const status_1 = require("./commands/status");
const up_1 = require("./commands/up");
const cli = (config) => {
    const program = new commander_1.Command();
    if (!config) {
        console.log('No config found. Please run `init` before continuing');
    }
    program
        .command('init')
        .description('Creates the migrations directory and configuration file')
        .action(() => {
        init_1.init();
    });
    if (config) {
        program
            .command('new')
            .description('Create a new migration file under migrations directory')
            .storeOptionsAsProperties(false)
            .option('-n, --name <name>', 'the migration name')
            .option('-t, --template-file <path>', 'The template file to use')
            .action((opts) => {
            let name = opts.name;
            let templateFile = opts.templateFile;
            if (typeof opts.name !== 'string' || opts.name.length === 0) {
                name = undefined;
            }
            if (typeof opts.templateFile !== 'string' ||
                opts.templateFile.length === 0) {
                templateFile = undefined;
            }
            new_1.newCommand({
                migrationName: name,
                migrationsDir: config.migrationsDir,
                templateFile: templateFile,
            });
        });
        program
            .command('up')
            .description('Run all pending migrations')
            .action(async () => {
            try {
                await up_1.up({ config });
            }
            catch (e) {
                console.error(e);
                process.exitCode = 1;
            }
            finally {
                process.exit();
            }
        });
        program
            .command('down')
            .description('Undo migrations')
            .option('-l, --last', 'Undo the last applied migration')
            .option('-a, --all', 'Undo all applied migrations')
            .action((opts) => {
            if (!opts.last && !opts.all) {
                program.outputHelp();
                process.exit(-1);
            }
            down_1.down({
                config,
                mode: opts.last ? 'last' : 'all',
            });
        });
        program
            .command('status')
            .description('Show the status of the migrations')
            .action(() => {
            status_1.status({ config });
        });
    }
    program.parse();
};
exports.cli = cli;
//# sourceMappingURL=cli.js.map