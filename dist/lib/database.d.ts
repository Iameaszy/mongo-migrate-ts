import { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb';
import { MigrationObject } from './migrations';
export interface DatabaseConnection {
    client: MongoClient;
    db: Db;
    getMigrationsCollection: (collectionName: string) => Collection<MigrationModel>;
}
export interface MigrationModel {
    file: string;
    className: string;
    timestamp: number;
}
export declare const mongoConnect: (uri: string, database: string, options?: MongoClientOptions | undefined) => Promise<DatabaseConnection>;
export declare const insertMigration: (collection: Collection<MigrationModel>, migration: MigrationObject) => Promise<void>;
export declare const deleteMigration: (collection: Collection<MigrationModel>, migration: MigrationObject) => Promise<void>;
export declare const getAppliedMigrations: (collection: Collection<MigrationModel>) => Promise<MigrationModel[]>;
export declare const getLastAppliedMigration: (collection: Collection<MigrationModel>) => Promise<MigrationModel | null>;
