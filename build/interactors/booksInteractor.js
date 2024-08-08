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
exports.BooksInteractor = void 0;
class BooksInteractor {
    constructor(repository) {
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
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.get();
        });
    }
}
exports.BooksInteractor = BooksInteractor;
