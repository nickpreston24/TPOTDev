import { DiskFileLoader } from './DiskFileLoader';
import { GoogleFileLoader } from './GoogleFileLoader';
import { Clipboard } from "./Clipboard";
import { IFileLoader } from './IFileLoader';

export function getLoader(loaderType: string): IFileLoader {
    if (!loaderType)
        throw new Error("loader type cannot be undefined!");
    switch (loaderType) {
        case 'disk':
            return new DiskFileLoader();
        case 'google':
            return new GoogleFileLoader();
        case 'paste':
            return new Clipboard();
        default:
            return new DiskFileLoader();
    }
}

export class A {

}