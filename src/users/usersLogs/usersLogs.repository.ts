import { PrismaClient, UsersLogsModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IDatabaseService } from '../../db/databaseService.interface';
import { TYPES } from '../../types';
import { IUsersLogsRepository } from './usersLogsRepository.interface';
import 'reflect-metadata';

@injectable()
export class UsersLogsRepository implements IUsersLogsRepository {
    client: PrismaClient;

    constructor(@inject(TYPES.DatabaseService) private databaseService: IDatabaseService) {
        this.client = this.databaseService.client;
    }

    async create(params: { id: string; message: string; userId: string }) {
        let data = await this.client.usersLogsModel.create({ data: params });
    }

    async getAll(): Promise<UsersLogsModel[]> {
        let result = await this.client.usersLogsModel.findMany();
        return result;
    }
}
