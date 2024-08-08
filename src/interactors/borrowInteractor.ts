import { IBorrowInteractor } from "../interfaces/IBorrowInteractor";
import { IBorrowRepository } from "../interfaces/IBorrowRepository";

export class BorrowInteractor implements IBorrowInteractor {

    private repository: IBorrowRepository;

    constructor(repository: IBorrowRepository) {
        this.repository = repository;
    }

    async borrowBooks(input: any) {
        return this.repository.create(input);
    }
    async returnedBooks(input: any) {
        return this.repository.update(input);
    }
    
}