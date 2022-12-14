import { PrismaClient, UsersLogsModel } from '@prisma/client';

export interface IUsersLogsRepository {
	client: PrismaClient;
	create(params: { id: String; userId: String; message: String }): void;
	getAll(): Promise<UsersLogsModel[]>;
	getAllRecordsByUserId(id: string, paging: {take: number, skip: number}): Promise<UsersLogsModel[]>;
}
