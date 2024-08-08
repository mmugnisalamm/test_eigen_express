import express from "express"
import { BorrowRepository } from "../repository/borrowRepository";
import { BorrowInteractor } from "../interactors/borrowInteractor";
import { BorrowController } from "../controllers/borrowController";
const repository = new BorrowRepository();
const interactor = new BorrowInteractor(repository);
const controller = new BorrowController(interactor);

const router = express.Router();

router.post("/borrow", controller.onBorrowBooks.bind(controller));
router.patch("/return", controller.onReturnedBooks.bind(controller));

export default router;