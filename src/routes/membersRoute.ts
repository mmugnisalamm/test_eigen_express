import express from "express"
import { MembersInteractor } from "../interactors/membersInteractor"
import { MembersController } from "../controllers/membersController";
import { MembersRepository } from "../repository/membersRepository";

const repository = new MembersRepository();
const interactor = new MembersInteractor(repository);
const controller = new MembersController(interactor);

const router = express.Router();

// router.post("/books", controller.onCreateBooks.bind(controller));
router.get("/books", controller.onGetMembers.bind(controller));
// router.patch("/books", controller.onUpdateBooks.bind(controller));
// router.delete("/books", controller.onDeleteBooks.bind(controller));

export default router;