import express from "express"
import { BooksInteractor } from "../interactors/booksInteractor"
import { BooksController } from "../controllers/booksController";
import { BooksRepository } from "../repository/booksRepository";

const repository = new BooksRepository();
const interactor = new BooksInteractor(repository);
const controller = new BooksController(interactor);

const router = express.Router();

// router.post("/books", controller.onCreateBooks.bind(controller));
router.get("/books", controller.onGetBooks.bind(controller));
// router.patch("/books", controller.onUpdateBooks.bind(controller));
// router.delete("/books", controller.onDeleteBooks.bind(controller));

export default router;