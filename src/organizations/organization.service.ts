import { NextFunction } from 'express';
import { BaseService } from '../common/base.service';
import { HttpError } from '../errors/http-error.class';
import { IOrganizationDto } from './organization.dto.interface';

export class OrganizationService extends BaseService {
	async createRecord(
		params: IOrganizationDto,
		organizationEntity: any,
		next: NextFunction
	) {
		try {
			const organization = await this.dataAccessProvider.createRecord(
				params,
				organizationEntity,
				next
			);
			return { id: organization.id };
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}

	async findAll(organizationEntity: any, next: NextFunction) {
		try {
			const organizations = await this.dataAccessProvider.getAllRecords(
				organizationEntity,
				next
			);
			if (organizations.length == 0) {
				next(new HttpError(500, 'Organizations not found', 'OrganizationService'));
			} else {
				return organizations;
			}
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}
}
