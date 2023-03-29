interface CommandNewOptions {
    migrationsDir: string;
    migrationName?: string;
    templateFile?: string;
}
export declare const defaultMigrationTemplate: (className: string) => string;
export declare const getMigrationTemplate: (className: string, templateFile?: string | undefined) => string;
export declare const newCommand: (opts: CommandNewOptions) => string;
export {};
