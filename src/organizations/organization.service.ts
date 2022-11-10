import { NextFunction } from 'express';
import { BaseService } from '../common/base.service';
import { HttpError } from '../errors/http-error.class';
import { IOrganizationDto } from './organization.dto.interface';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { baseAnswer } from '../common/baseAnswer';
import { TYPES } from '../types';
import { DataAccessProvider } from '../dal/dataAccessProvider';

@injectable()
export class OrganizationService extends BaseService {
	constructor(
		@inject(TYPES.DataAccessProvider) private accessProvider: DataAccessProvider
	) {
		super(accessProvider);
	}
	async createRecord(
		params: IOrganizationDto,
		organizationEntity: any,
		organizationToExpansesEnity: any,
		next: NextFunction
	) {
		try {
			const organizationToExpanses = await this.accessProvider.createRecord(
				{},
				organizationToExpansesEnity,
				next
			);
			const organization = await this.accessProvider.createRecord(
				{ ...params, expanseId: organizationToExpanses.id },
				organizationEntity,
				next
			);
			return baseAnswer(200, { id: organization.id }, []);
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}

	async findAll(organizationEntity: any, next: NextFunction) {
		try {
			const organizations = await this.accessProvider.getAllRecords(
				organizationEntity,
				next
			);

			return baseAnswer(200, organizations, []);
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}

	async findByParams(params: any, organizationEntity: any, next: NextFunction) {
		try {
			const organizations = await this.accessProvider.getRecordByParams(
				params,
				organizationEntity,
				next
			);
			return baseAnswer(200, organizations, []);
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}
}
