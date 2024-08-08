import { IBooksInteractor } from "../interfaces/IBooksInteractor";
import { IBooksRepository } from "../interfaces/IBooksRepository";

export class BooksInteractor implements IBooksInteractor {

    private repository: IBooksRepository;

    constructor(repository: IBooksRepository) {
        this.repository = repository;
    }

    // async createBook(input: any) {
    //     return this.repository.create(input);
    // }
    // async updateBooks(id: number, total_page: number) {
    //     return this.repository.update(id, total_page);
    // }
    // async deleteBook(id: number) {
    //     return this.repository.delete(id);
    // }
    async getBooks() {
        return this.repository.get();
    }
    
}