"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrowRepository_1 = require("../repository/borrowRepository");
const borrowInteractor_1 = require("../interactors/borrowInteractor");
const borrowController_1 = require("../controllers/borrowController");
const repository = new borrowRepository_1.BorrowRepository();
const interactor = new borrowInteractor_1.BorrowInteractor(repository);
const controller = new borrowController_1.BorrowController(interactor);
const router = express_1.default.Router();
router.post("/borrow", controller.onBorrowBooks.bind(controller));
router.patch("/return", controller.onReturnedBooks.bind(controller));
exports.default = router;
