"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const membersInteractor_1 = require("../interactors/membersInteractor");
const membersController_1 = require("../controllers/membersController");
const membersRepository_1 = require("../repository/membersRepository");
const repository = new membersRepository_1.MembersRepository();
const interactor = new membersInteractor_1.MembersInteractor(repository);
const controller = new membersController_1.MembersController(interactor);
const router = express_1.default.Router();
// router.post("/books", controller.onCreateBooks.bind(controller));
router.get("/members", controller.onGetMembers.bind(controller));
// router.patch("/books", controller.onUpdateBooks.bind(controller));
// router.delete("/books", controller.onDeleteBooks.bind(controller));
exports.default = router;
