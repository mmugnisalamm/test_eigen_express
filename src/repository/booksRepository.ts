import { pgClient } from "../configs/configg";
import { Books } from "../entities/Books";
import { IBooksRepository } from "../interfaces/IBooksRepository";
import { Pool } from "pg";

export class BooksRepository implements IBooksRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  // async create(data: Books): Promise<Books> {
  //   const results = await this.client.query(
  //     "INSERT INTO book (title, description, image_url, release_year, price, total_page, thickness, category_id) " +
  //       "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) " +
  //       "RETURNING id, title, description, image_url, release_year, price, total_page, thickness, category_id, created_at ",
  //     [
  //       data.title,
  //       data.description,
  //       data.image_url,
  //       data.release_year,
  //       data.price,
  //       data.total_page,
  //       data.thickness,
  //       data.category_id,
  //     ]
  //   );

  //   return results.rows[0];
  // }
  async get(): Promise<Books[]> {
    const results = await this.client.query("SELECT * FROM books WHERE stock <> 0");

    return results.rows;
  }
  // update(id: number, total_page: number): Promise<Books> {
  //   throw new Error("Method not implemented.");
  // }
  // async delete(id: number): Promise<Books> {
  //   const results = await this.client.query(
  //     "DELETE FROM book WHERE id=$1 RETURNING id, title, image_url",
  //     [id]
  //   );

  //   return results.rows[0];
  // }
}
