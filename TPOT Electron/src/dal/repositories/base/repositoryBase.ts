import { IRepository } from '../interfaces/IRepository';

export abstract class RepositoryBase<T> implements IRepository<T>{
    abstract find(item: T): Promise<T[]>
    abstract findOne(id: string): Promise<T>
    abstract create(item: T): Promise<boolean>
    abstract update(id: string, item: T): Promise<boolean>
    abstract delete(id: string): Promise<boolean>
}
