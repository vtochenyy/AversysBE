import { UserModel, PrismaClient } from '@prisma/client';

// interface User {
// 	id: number;
// 	firstname?: string;
// 	middlename?: string;
// 	lastname?: string;
// 	email?: string;
// 	phone?: string;
// }

export interface IUsersRepository {
	user: UserModel;
	client: PrismaClient;
	create(userData: UserModel): Promise<UserModel>;
	update(userId: string, userData: UserModel): Promise<UserModel>;
	findById(userId: string): Promise<UserModel | null>;
	findByCriteria(userData: UserModel): Promise<UserModel[]>;
	deleteById(userId: string): Promise<boolean>;
}
