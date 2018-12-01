import { IFileLoader } from "./IFileLoader";
class Clipboard implements IFileLoader {
  constructor() {}
  load(text: string): void {
    console.log("Hi, from load()!");
    // throw new Error("Method not implemented.");
  }
}
module.exports = {
  Clipboard
};
