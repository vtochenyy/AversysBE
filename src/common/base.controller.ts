import { Router } from 'express';
import { injectable } from 'inversify';
import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { TYPES } from '../types';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.root + route.path}`);
			const keppContext = route.func.bind(this);
			this.router[route.method](route.path, keppContext);
		}
	}
}
