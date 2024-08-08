import { NextFunction, Request, Response } from "express";
import { IBorrowInteractor } from "../interfaces/IBorrowInteractor";

export class BorrowController {
  private interactor: IBorrowInteractor;

  constructor(interactor: IBorrowInteractor) {
    this.interactor = interactor;
  }

  async onBorrowBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const data = await this.interactor.borrowBooks(body);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }


  async onReturnedBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      const data = await this.interactor.returnedBooks(body);

      return res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  }

}
