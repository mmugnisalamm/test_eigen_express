export class Borrow {
    constructor(
        public readonly id: number,
        public readonly code: string,
        public readonly books_id: number,
        public readonly members_id: number,
        public readonly borrow_qty: number,
        public readonly borrow_start_date: Date,
        public readonly borrow_due_date: Date,
        public readonly borrow_back_date: Date,
        public readonly borrow_status: string,
    ) {}
}