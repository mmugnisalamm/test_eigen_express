"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersRepository = void 0;
const configg_1 = require("../configs/configg");
class MembersRepository {
    constructor() {
        this.client = (0, configg_1.pgClient)();
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.client.query("SELECT b.*, string_agg(c.title, ', ') books_name, sum(a.borrow_qty), a.borrow_start_date, a.borrow_due_date, a.borrow_back_date " +
                "FROM  borrowed a " +
                "RIGHT JOIN members b ON(a.members_code=b.code) " +
                "LEFT JOIN books c ON(a.books_code=c.code) GROUP BY b.id, a.borrow_start_date, a.borrow_due_date, a.borrow_back_date ORDER BY b.id ASC");
            return results.rows;
        });
    }
}
exports.MembersRepository = MembersRepository;
