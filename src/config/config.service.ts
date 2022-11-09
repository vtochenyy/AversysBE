import { IConfigService } from './config.service.interface';
import { injectable, inject } from 'inversify';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.err(`[ConfigService] Не удалось прочитать .env файл или он не существует`);
		} else {
			this.logger.log(`[ConfigService] Удалось прочитать .env файл`);
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends number | string>(key: string): T {
		return this.config[key] as T;
	}
}
