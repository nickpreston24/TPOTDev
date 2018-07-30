import { IWrite } from './IWrite';
import { IRead } from './IRead';

export interface IRepository<T> extends IWrite<T>, IRead<T> {
}