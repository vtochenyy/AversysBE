import { PrismaClient, UsersLogsModel } from '@prisma/client';

export interface IUsersLogsRepository {
	client: PrismaClient;
	create(params: UsersLogsModel): void;
	getAll(): Promise<UsersLogsModel[]>;
}
