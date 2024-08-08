import { IMembersInteractor } from "../interfaces/IMembersInteractor";
import { IMembersRepository } from "../interfaces/IMembersRepository";

export class MembersInteractor implements IMembersInteractor {

    private repository: IMembersRepository;

    constructor(repository: IMembersRepository) {
        this.repository = repository;
    }

    async getMembers() {
        return this.repository.get();
    }
    
}