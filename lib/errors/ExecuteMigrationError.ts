export class ExecuteMigrationError extends Error {
  constructor(error: string) {
    super(error);
  }
}
