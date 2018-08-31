import { IFileLoader } from "./IFileLoader";
export class Clipboard implements IFileLoader {
    load(filePath: string): void {
        throw new Error("Method not implemented.");
    }
}