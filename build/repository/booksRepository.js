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
exports.BooksRepository = void 0;
const configg_1 = require("../configs/configg");
class BooksRepository {
    constructor() {
        this.client = (0, configg_1.pgClient)();
    }
    // async create(data: Books): Promise<Books> {
    //   const results = await this.client.query(
    //     "INSERT INTO book (title, description, image_url, release_year, price, total_page, thickness, category_id) " +
    //       "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) " +
    //       "RETURNING id, title, description, image_url, release_year, price, total_page, thickness, category_id, created_at ",
    //     [
    //       data.title,
    //       data.description,
    //       data.image_url,
    //       data.release_year,
    //       data.price,
    //       data.total_page,
    //       data.thickness,
    //       data.category_id,
    //     ]
    //   );
    //   return results.rows[0];
    // }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.client.query("SELECT * FROM books WHERE stock <> 0");
            return results.rows;
        });
    }
}
exports.BooksRepository = BooksRepository;
