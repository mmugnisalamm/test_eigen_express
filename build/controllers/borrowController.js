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
exports.BorrowController = void 0;
class BorrowController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onBorrowBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const data = yield this.interactor.borrowBooks(body);
                return res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    onReturnedBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const data = yield this.interactor.returnedBooks(body);
                return res.status(data.status).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BorrowController = BorrowController;
