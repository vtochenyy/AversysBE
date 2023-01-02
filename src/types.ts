export const TYPES = {
    Application: Symbol.for('Application'),
    ILogger: Symbol.for('ILogger'),

    UsersController: Symbol.for('UsersController'),
    UsersRepository: Symbol.for('UsersRepository'),
    UsersService: Symbol.for('UsersService'),
    UsersLogsRepository: Symbol.for('UsersLogs'),

    OrganizationsController: Symbol.for('OrganizationsController'),
    ExeptionFilter: Symbol.for('ExeptionFilter'),
    ConfigService: Symbol.for('ConfigService'),

    DictionaryController: Symbol.for('DictionaryController'),
    DictionaryService: Symbol.for('DictionaryService'),
    DictionaryRepository: Symbol.for('DictionaryRepository'),

    DatabaseService: Symbol.for('DatabaseService'),
};
