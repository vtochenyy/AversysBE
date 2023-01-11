import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import lodash, { LoDashStatic } from 'lodash';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	protected _: LoDashStatic;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this._router = Router();
		this._ = lodash;
	}

	public get router() {
		return this._router;
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			this.logger.log(`Обрабатыватся эндпоинт [${route.method}] ${route.root + route.path}`);
			const keppContext = route.func.bind(this);
			this.router[route.method](route.path, keppContext);
		}
	}
}
