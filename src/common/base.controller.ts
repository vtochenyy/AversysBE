import { LoggerService } from '../logger/logger.service';
import { Router } from 'express';
import { IControllerRoute } from './route.interface';

export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: LoggerService) {
		this._router = Router();
		this.logger = logger;
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
