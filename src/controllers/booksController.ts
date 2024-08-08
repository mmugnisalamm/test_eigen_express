import { NextFunction, Request, Response } from "express";
import { IBooksInteractor } from "../interfaces/IBooksInteractor";

export class BooksController {
  private interactor: IBooksInteractor;

  constructor(interactor: IBooksInteractor) {
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

  async onGetBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.interactor.getBooks();

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // async onUpdateBooks(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const body = req.body;

  //     const data = await this.interactor.updateBooks(body.id, body.total_page);

  //     return res.status(200).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async onDeleteBooks(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const body = req.body;

  //     const data = await this.interactor.deleteBook(body.id);

  //     return res.status(200).json(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
