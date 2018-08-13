
export interface IFileLoader {
    Load(filePath: string): void
}

//     ///Factory method:
//     //todo: 1. get the proper loader based on user selection.
//     // 2. call the loader's Get(filepath);
//     // 2a. filepath is trivial - the assigned loader will handle it properly.
//     // 3. In all cases, we'll have raw text saved to state and/or to a local copy of the original file.
// static GetLoader(loaderType: string): IFileLoader {

//     // switch (loaderType) {
//     //     case 'disk':
//     //         //todo: assign disk loader if currentLoader is non-null and NOT a disc loader already.
//     //         return new DiskFileLoader();
//     //         break;
//     //     case 'google':
//     //         //todo: same as above, but the path is a google path and the loader only loads things from google (uses whatever auth needed)
//     //         return new GoogleFileLoader();
//     //         break;
//     //     case 'paste':
//     //         //todo: same as above, except now our loader is taking the raw text directly into the 'original' state copy.
//     //         return new Paster();
//     //         break;
//     //     default:
//     //         //todo: use existing loader.  Throw if null?
//     //         break;
//     // }

// }


export class GoogleFileLoader implements IFileLoader {
    Load(filePath: string): void {
        throw new Error("Method not implemented.");
    }
}

export class Paster implements IFileLoader {
    Load(filePath: string): void {
        throw new Error("Method not implemented.");
    }
}

///Multiple cotrs sample:

// interface IBox {
//     x: number;
//     y: number;
//     height: number;
//     width: number;
// }

// class Box {
//     public x: number;
//     public y: number;
//     public height: number;
//     public width: number;

//     constructor();
//     constructor(obj: IBox);
//     constructor(obj?: any) {
//         this.x = obj && obj.x || 0
//         this.y = obj && obj.y || 0
//         this.height = obj && obj.height || 0
//         this.width = obj && obj.width || 0;
//     }
// }