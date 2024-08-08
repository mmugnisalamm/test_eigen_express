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
exports.BorrowRepository = void 0;
const configg_1 = require("../configs/configg");
const Response_1 = require("../entities/Response");
class BorrowRepository {
    constructor() {
        this.client = (0, configg_1.pgClient)();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = new Response_1.Response(200, "Inital", []);
                let insertedBooks = [];
                yield this.client.query("BEGIN");
                if (data["books"].length > 2) {
                    resp.status = 200;
                    resp.message = "Tidak bisa meminjam buku lebih dari 2!";
                    resp.data = [];
                    return resp;
                }
                const checkMemberExistQuery = `
        SELECT code
        FROM members
        WHERE code = $1
        `;
                const memberExists = yield this.client.query(checkMemberExistQuery, [
                    data.members_code,
                ]);
                if (memberExists.rows.length < 1) {
                    resp.status = 201;
                    resp.message =
                        "Member dengan kode " + data.members_code + " tidak ada!";
                    resp.data = [];
                    return resp;
                }
                const checkMemberQuery = `
        SELECT code
        FROM members
        WHERE code = $1 and status='Penalized'
        `;
                const checkPenalized = yield this.client.query(checkMemberQuery, [
                    data.member_code,
                ]);
                if (checkPenalized.rows.length > 0) {
                    resp.status = 200;
                    resp.message = "Anda sedang dihukum!";
                    resp.data = [];
                    return resp;
                }
                for (const element of data["books"]) {
                    const checkBooksQuery = `
            SELECT * FROM borrowed WHERE books_code=$1 AND borrow_status='Borrowed'`;
                    const checkBooks = yield this.client.query(checkBooksQuery, [
                        element.books_code,
                    ]);
                    if (checkBooks.rows.length > 0) {
                        resp.status = 201;
                        resp.message = "Buku ini sudah dipinjam oleh member lain!";
                        resp.data = [];
                        return resp;
                    }
                    // Insert peminjaman buku
                    const insertQuery = `
            INSERT INTO borrowed (code, books_code, members_code, borrow_qty, borrow_start_date, borrow_due_date, borrow_status)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, members_code, books_code, borrow_qty, borrow_start_date, borrow_due_date
            `;
                    const result = yield this.client.query(insertQuery, [
                        "BRW-" + generateUniqueCode(), // Asumsi ada fungsi untuk menghasilkan kode unik
                        element.books_code,
                        data.members_code,
                        1, // Misalnya setiap peminjaman 1 buku
                        new Date(), // Tanggal mulai peminjaman
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Tanggal jatuh tempo 7 hari dari sekarang
                        "Borrowed",
                    ]);
                    // console.log("TEST "+element.books_id)
                    insertedBooks.push(result.rows[0]);
                }
                yield this.client.query("COMMIT");
                resp.status = 200;
                resp.message = "Berhasil meminjam buku!";
                resp.data = insertedBooks;
                // console.log("TEST "+data['books'].length)
                // console.log("TEST "+data['books'][0]['books_id'])
                return resp;
            }
            catch (error) {
                yield this.client.query("ROLLBACK");
                const resp = new Response_1.Response(400, "" + error, []);
                return resp;
            }
            // const checkMemberQuery = `
            // SELECT id
            // FROM borrow
            // WHERE members_id = $1
            // `;
            // const memberExists = await this.client.query(checkMemberQuery, [data.members_id]);
            // const results = await this.client.query(
            //   "INSERT INTO books (code, books_id, members_id, borrow_qty, borrow_start_date, borrow_due_date, borrow_status) " +
            //     "VALUES ($1, $2, $3, $4, $5, $6, $7) " +
            //     "RETURNING id, code, books_id, members_id, borrow_qty, borrow_start_date, borrow_due_date, borrow_status ",
            //   [
            //     data.code,
            //     data.books_id,
            //     data.members_id,
            //     data.borrow_qty,
            //     data.borrow_start_date,
            //     data.borrow_due_date,
            //     "Borrowed",
            //   ]
            // );
            // return results.rows[0];
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.client.query("INSERT INTO books (code, books_id, members_id, borrow_qty, borrow_start_date, borrow_due_date, borrow_status) " +
                "VALUES ($1, $2, $3, $4, $5, $6, $7) " +
                "RETURNING id, code, books_id, members_id, borrow_qty, borrow_start_date, borrow_due_date, borrow_status ", [
                data.code,
                data.books_id,
                data.members_id,
                data.borrow_qty,
                data.borrow_start_date,
                data.borrow_due_date,
                data.borrow_status,
            ]);
            return results.rows[0];
        });
    }
}
exports.BorrowRepository = BorrowRepository;
function generateUniqueCode() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}
