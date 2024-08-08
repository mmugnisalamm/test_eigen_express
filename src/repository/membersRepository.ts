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
    const results = await this.client.query("SELECT b.*, string_agg(c.title, ', ') books_name, sum(a.borrow_qty), a.borrow_start_date, a.borrow_due_date, a.borrow_back_date "+
      "FROM  borrowed a "+
      "RIGHT JOIN members b ON(a.members_code=b.code) "+
      "LEFT JOIN books c ON(a.books_code=c.code) GROUP BY b.id, a.borrow_start_date, a.borrow_due_date, a.borrow_back_date ORDER BY b.id ASC");

    return results.rows;
  }
}
