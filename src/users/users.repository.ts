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

    public async create(params: UserModel) {
        params.id = uuidv1();
        let user = await this.client.userModel.create({ data: params });
        return user;
    }

    public async update(userId: string, userData: any) {
        let result = await this.client.userModel.update({
            where: { id: userId },
            data: { ...userData },
        });
        return result;
    }

    public async findById(userId: string) {
        let result = await this.client.userModel.findUnique({
            where: { id: userId },
        });
        return result;
    }

    public async findAll() {
        let result = await this.client.userModel.findMany();
        return result;
    }

    public async findByCriteria(userData: any): Promise<UserModel[]> {
        let result = await this.client.userModel.findMany({
            where: {
                ...userData,
            },
        });
        return result;
    }

    public async deleteById(userId: string) {
        try {
            this.client.userModel.delete({ where: { id: userId } });
            return true;
        } catch (err) {
            return false;
        }
    }
}
