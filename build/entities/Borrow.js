"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
class Borrow {
    constructor(id, code, books_id, members_id, borrow_qty, borrow_start_date, borrow_due_date, borrow_back_date, borrow_status) {
        this.id = id;
        this.code = code;
        this.books_id = books_id;
        this.members_id = members_id;
        this.borrow_qty = borrow_qty;
        this.borrow_start_date = borrow_start_date;
        this.borrow_due_date = borrow_due_date;
        this.borrow_back_date = borrow_back_date;
        this.borrow_status = borrow_status;
    }
}
exports.Borrow = Borrow;
