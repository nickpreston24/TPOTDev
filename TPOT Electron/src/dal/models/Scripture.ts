export class Scripture {
    private id: number;
    private Book: string;

    protected static Init = (() => {
        Scripture.prototype.id = -1;
    })();

    constructor(book: string, id: number) {
        this.Book = book;
        this.id = id; //todo: assign from db unique id
    }
}
