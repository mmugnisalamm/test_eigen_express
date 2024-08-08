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
exports.BooksController = void 0;
class BooksController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    // async onCreateBooks(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const body = req.body;
    //     const data = await this.interactor.createBook(body);
    //     return res.status(200).json(data);
    //   } catch (error) {
    //     next(error);
    //   }
    // }
    onGetBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.interactor.getBooks();
                return res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.BooksController = BooksController;
