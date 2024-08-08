import { Books } from "../entities/Books";

export interface IBooksRepository {
    // create(data: Books): Promise<Books>;
    get(): Promise<Books[]>;
    // update(id: number, total_page: number): Promise<Books>;
    // delete(id: number): Promise<Books>;
}