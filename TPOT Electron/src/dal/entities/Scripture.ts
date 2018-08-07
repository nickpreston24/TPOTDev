export class Scripture {
    private id: number;
    private Book: string;
    
    constructor(book: string) {
        this.Book = book;
        this.id = -1; //assign from db unique id
    }
}
