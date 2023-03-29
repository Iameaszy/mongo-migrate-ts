"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCommand = exports.getMigrationTemplate = exports.defaultMigrationTemplate = void 0;
const fs = __importStar(require("fs"));
const errors_1 = require("../errors");
const defaultMigrationTemplate = (className) => {
    return `import { Db } from 'mongodb'
import { MigrationInterface } from 'mongo-migrate-ts';

export class ${className} implements MigrationInterface {
  public async up(db: Db): Promise<any> {
  }

  public async down(db: Db): Promise<any> {
  }
}
`;
};
exports.defaultMigrationTemplate = defaultMigrationTemplate;
const getMigrationTemplate = (className, templateFile) => {
    if (!templateFile) {
        return exports.defaultMigrationTemplate(className);
    }
    if (fs.existsSync(templateFile)) {
        const template = fs.readFileSync(templateFile).toString();
        return template.replace(/class (\S*) /, `class ${className} `);
    }
    throw new errors_1.TemplateFileNotFoundError(`Template file ${templateFile} not found`);
};
exports.getMigrationTemplate = getMigrationTemplate;
const newCommand = (opts) => {
    const { migrationName, migrationsDir, templateFile } = opts;
    if (!fs.existsSync(migrationsDir)) {
        fs.mkdirSync(migrationsDir);
    }
    const fileName = `${+new Date()}_${migrationName || 'Migration'}`;
    const className = `${migrationName || 'Migration'}${+new Date()}`;
    const template = exports.getMigrationTemplate(className, templateFile);
    const migrationPath = `${migrationsDir}/${fileName}.ts`;
    fs.writeFileSync(migrationPath, template);
    return migrationPath;
};
exports.newCommand = newCommand;
//# sourceMappingURL=new.js.map