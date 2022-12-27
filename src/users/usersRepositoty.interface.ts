import { UserModel, PrismaClient } from '@prisma/client';

export interface IUsersRepository {
	user: UserModel;
	client: PrismaClient;
	create(userData: UserModel): Promise<UserModel>;
	update(userId: string, userData: UserModel): Promise<UserModel>;
	findById(userId: string): Promise<UserModel | null>;
	findByCriteria(userData: any): Promise<UserModel[]>;
	deleteById(userId: string): Promise<boolean>;
}
