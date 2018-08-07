import { RepositoryBase } from "./repositoryBase";

export abstract class SqliteRepository<T> extends RepositoryBase<T> {
    public readonly connectionString: string;
    constructor(connectionString: string) {
        super();
        this.connectionString = connectionString;
    }
    async create(item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async find(item: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    async findOne(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, item: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}