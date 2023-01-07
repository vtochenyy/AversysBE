import { UserModel, PrismaClient } from '@prisma/client';

export interface IUsersRepository {
    user: UserModel;
    client: PrismaClient;
    create(userData: UserModel): Promise<UserModel>;
    update(userId: string, userData: any): Promise<UserModel>;
    findById(userId: string): Promise<UserModel | null>;
    findByCriteria(userData: any): Promise<UserModel[]>;
    findAll(): Promise<UserModel[]>;
    deleteById(userId: string): Promise<boolean>;
}
