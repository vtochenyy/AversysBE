import { PrismaClient, ErrorDictModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IDatabaseService } from '../db/databaseService.interface';
import 'reflect-metadata';

@injectable()
export class DictionaryRepository {
    errorDict: ErrorDictModel;
    client: PrismaClient;
    constructor(@inject(TYPES.DatabaseService) private databaseService: IDatabaseService) {
        this.client = databaseService.client;
    }

    public async getAllErrors(): Promise<ErrorDictModel[]> {
        const errors = await this.client.errorDictModel.findMany();
        return errors;
    }
}
