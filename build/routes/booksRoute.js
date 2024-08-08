"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksInteractor_1 = require("../interactors/booksInteractor");
const booksController_1 = require("../controllers/booksController");
const booksRepository_1 = require("../repository/booksRepository");
const repository = new booksRepository_1.BooksRepository();
const interactor = new booksInteractor_1.BooksInteractor(repository);
const controller = new booksController_1.BooksController(interactor);
const router = express_1.default.Router();
// router.post("/books", controller.onCreateBooks.bind(controller));
router.get("/books", controller.onGetBooks.bind(controller));
// router.patch("/books", controller.onUpdateBooks.bind(controller));
// router.delete("/books", controller.onDeleteBooks.bind(controller));
exports.default = router;
