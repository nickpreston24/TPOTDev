import { RepositoryBase } from './repositoryBase';
import { MongoClient, Db, Collection, InsertOneWriteOpResult } from 'mongodb';
import { isPrimitive } from 'util';

// export interface IMongoRepository { ... init()... }

//For use with mongo dbs
//Usage:
//  Extend a class that will use these functions, returning their results.
export abstract class MongoRepository<T> extends RepositoryBase<T>  {
    public readonly collection: Collection;

    constructor(db: Db, collectionName: string) {
        super();
        this.collection = db.collection(collectionName);
    }

    async create(item: T): Promise<boolean> {
        const insert: InsertOneWriteOpResult = await this.collection.insert(item);
        // return only the ok property (which has 1 or 0 results), converted to boolean:      
        return !!insert.result.ok;
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