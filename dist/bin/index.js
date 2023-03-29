#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("../lib/cli");
const config_1 = require("../lib/config");
const errors_1 = require("../lib/errors");
try {
    const config = config_1.readConfigFromFile(config_1.getDefaultConfigPath());
    cli_1.cli(config);
}
catch (e) {
    if (e instanceof errors_1.ConfigFileNotFoundError) {
        console.warn(`${e.message} Initializing CLI without config.`);
        cli_1.cli();
    }
    else {
        throw e;
    }
}
//# sourceMappingURL=index.js.map