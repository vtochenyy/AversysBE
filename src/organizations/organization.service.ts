import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IOrganizationDto } from './organization.dto.interface';

export class OrganizationService {
	async createRecord(
		params: IOrganizationDto,
		organizationEntity: any,
		next: NextFunction
	) {
		try {
			const organization = await organizationEntity.create(params);
			return { id: organization.id };
		} catch (error) {
			next(new HttpError(500, 'Service error', 'OrganizationService'));
		}
	}

	async findAll(organizationEntity: any, next: NextFunction) {
		try {
			const organizations = await organizationEntity.findAll();
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
