import { PrismaClient, UserModel } from '@prisma/client';
import { v1 as uuidv1 } from 'uuid';
import { inject, injectable } from 'inversify';
import { IUsersRepository } from './usersRepositoty.interface';
import { TYPES } from '../types';
import { IDatabaseService } from '../db/databaseService.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
    user: UserModel;
    client: PrismaClient;

    constructor(@inject(TYPES.DatabaseService) private databaseService: IDatabaseService) {
        this.client = this.databaseService.client;
    }

    async create(params: UserModel) {
        params.id = uuidv1();
        let user = await this.client.userModel.create({ data: params });
        return user;
    }

    async update(userId: string, userData: UserModel) {
        let result = await this.client.userModel.update({
            where: { id: userId },
            data: userData,
        });
        return result;
    }

    async findById(userId: string) {
        let result = await this.client.userModel.findUnique({
            where: { id: userId },
        });
        return result;
    }

    async findAll() {
        let result = await this.client.userModel.findMany();
        return result;
    }

    async findByCriteria(userData: any): Promise<UserModel[]> {
        let result = await this.client.userModel.findMany({
            where: {
                ...userData,
            },
        });
        return result;
    }

    async deleteById(userId: string) {
        try {
            this.client.userModel.delete({ where: { id: userId } });
            return true;
        } catch (err) {
            return false;
        }
    }
}
