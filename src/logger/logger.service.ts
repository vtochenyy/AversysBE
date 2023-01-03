import { Logger } from 'tslog';
import { injectable } from 'inversify';
import { ILogger } from './logger.interface';
import 'reflect-metadata';
@injectable()
export class LoggerService implements ILogger {
    public logger: Logger;

    constructor() {
        this.logger = new Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            displayFunctionName: false,
        });
    }

    log(...args: unknown[]) {
        this.logger.info(...args);
    }

    err(...args: unknown[]) {
        this.logger.error(...args);
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }

    debug(...args: unknown[]) {
        this.logger.debug(...args);
    }
}
