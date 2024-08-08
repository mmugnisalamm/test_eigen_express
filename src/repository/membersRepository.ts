import { pgClient } from "../configs/configg";
import { Members } from "../entities/Members";
import { Pool } from "pg";
import { IMembersRepository } from "../interfaces/IMembersRepository";

export class MembersRepository implements IMembersRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  async get(): Promise<Members[]> {
    const results = await this.client.query("SELECT * FROM books WHERE stock <> 0");

    return results.rows;
  }
}
