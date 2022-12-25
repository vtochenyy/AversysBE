import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IOrganizationDto } from './organization.dto.interface';
import { injectable, inject } from 'inversify';
import { baseAnswer } from '../common/baseAnswer';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class OrganizationService {
	constructor() {}
	async createRecord(
		params: IOrganizationDto,
		organizationEntity: any,
		organizationToExpansesEnity: any,
		next: NextFunction
	) {
		try {
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}

	async findAll(organizationEntity: any, next: NextFunction) {
		try {
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}

	async findByParams(params: any, organizationEntity: any, next: NextFunction) {
		try {
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}
}
