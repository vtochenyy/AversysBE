import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize';
import { IConfigService } from '../config/config.service.interface';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class SequelizeInit {
	sequelize: Sequelize;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		try {
			this.sequelize = new Sequelize({
				port: +this.configService.get('PORT'),
				database: this.configService.get('DATABASE'),
				password: this.configService.get('PASS'),
				username: this.configService.get('USERNAME'),
				host: this.configService.get('HOST'),
				dialect: 'postgres',
			});
			this.sequelize.authenticate();
			this.sequelize.sync({ force: true });
			this.logger.log(`Connected to database`);
		} catch (err) {
			throw new Error('Failed to connect to database');
		}
	}
}
