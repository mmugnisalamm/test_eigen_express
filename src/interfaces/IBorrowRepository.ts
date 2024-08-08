import { Borrow } from "../entities/Borrow";
import { Response } from "../entities/Response";

export interface IBorrowRepository {
    create(data: any): Promise<Response>;
    update(data: any): Promise<Borrow>;
}