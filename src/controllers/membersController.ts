import { NextFunction, Request, Response } from "express";
import { IMembersInteractor } from "../interfaces/IMembersInteractor";

export class MembersController {
  private interactor: IMembersInteractor;

  constructor(interactor: IMembersInteractor) {
    this.interactor = interactor;
  }

  async onGetMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.interactor.getMembers();

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

}
