import { pgClient } from "../configs/configg";
import { Books } from "../entities/Books";
import { IBooksRepository } from "../interfaces/IBooksRepository";
import { Pool } from "pg";
import { IBorrowRepository } from "../interfaces/IBorrowRepository";
import { Borrow } from "../entities/Borrow";
import { Response } from "../entities/Response";

export class BorrowRepository implements IBorrowRepository {
  private client: Pool;

  constructor() {
    this.client = pgClient();
  }

  async create(data: any): Promise<Response> {
    try {
      const resp = new Response(200, "Inital", []);
      let insertedBooks: Borrow[] = [];
      await this.client.query("BEGIN");

      if (data["books"].length > 2) {
        resp.status = 200;
        resp.message = "Tidak bisa meminjam buku lebih dari 2!";
        resp.data = [];
        return resp;
      }

      const checkMemberExistQuery = `
        SELECT code
        FROM members
        WHERE code = $1
        `;
      const memberExists = await this.client.query(checkMemberExistQuery, [
        data.members_code,
      ]);

      if (memberExists.rows.length < 1) {
        resp.status = 201;
        resp.message =
          "Member dengan kode " + data.members_code + " tidak ada!";
        resp.data = [];
        return resp;
      }

      const checkMemberQuery = `
        SELECT code
        FROM members
        WHERE code = $1 and status='Penalized'
        `;
      const checkPenalized = await this.client.query(checkMemberQuery, [
        data.member_code,
      ]);

      if (checkPenalized.rows.length > 0) {
        resp.status = 200;
        resp.message = "Anda sedang dihukum!";
        resp.data = [];
        return resp;
      }

      for (const element of data["books"]) {
        const checkBooksQuery = `
            SELECT * FROM borrowed WHERE books_code=$1 AND borrow_status='Borrowed'`;
        const checkBooks = await this.client.query(checkBooksQuery, [
          element.books_code,
        ]);
        if (checkBooks.rows.length > 0) {
          resp.status = 201;
          resp.message = "Buku ini sudah dipinjam oleh member lain!";
          resp.data = [];
          return resp;
        }

        // Insert peminjaman buku
        const insertQuery = `
            INSERT INTO borrowed (code, books_code, members_code, borrow_qty, borrow_start_date, borrow_due_date, borrow_status)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, members_code, books_code, borrow_qty, borrow_start_date, borrow_due_date
            `;

        const result = await this.client.query(insertQuery, [
          "BRW-" + generateUniqueCode(), // Asumsi ada fungsi untuk menghasilkan kode unik
          element.books_code,
          data.members_code,
          1, // Misalnya setiap peminjaman 1 buku
          new Date(), // Tanggal mulai peminjaman
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Tanggal jatuh tempo 7 hari dari sekarang
          "Borrowed",
        ]);
        // console.log("TEST "+element.books_id)
        insertedBooks.push(result.rows[0]);

        const updateBooks = `
            UPDATE books SET stock=(stock-1) WHERE code=$1
            `;

        await this.client.query(updateBooks, [
          element.books_code,
        ]);
      }

      await this.client.query("COMMIT");
      resp.status = 200;
      resp.message = "Berhasil meminjam buku!";
      resp.data = insertedBooks;
      // console.log("TEST "+data['books'].length)
      // console.log("TEST "+data['books'][0]['books_id'])
      return resp;
    } catch (error) {
      await this.client.query("ROLLBACK");
      const resp = new Response(400, "" + error, []);
      return resp;
    }
  }

  async update(data: any): Promise<Response> {
    try {
      const resp = new Response(200, "Inital", []);
      let insertedBooks: Borrow[] = [];
      await this.client.query("BEGIN");

      for (const element of data["books"]) {
        const checkMemberQuery = `
          SELECT books_code, members_code
          FROM borrowed
          WHERE books_code = $1 and members_code=$2 and borrow_status='Borrowed' 
          `;
        const checkMemberBooks = await this.client.query(checkMemberQuery, [
          element.books_code,
          data.members_code,
        ]);

        if (checkMemberBooks.rows.length < 1) {
          resp.status = 201;
          resp.message =
            "Data buku " +
            element.books_code +
            " dan member " +
            data.members_code +
            " tidak sesuai!";
          resp.data = [];
          return resp;
        }

        const updateBorrow = `
            UPDATE borrowed SET borrow_back_date=$1, borrow_status = 'Returned' WHERE books_code=$2 AND members_code=$3
            RETURNING id, members_code, books_code, borrow_qty, borrow_start_date, borrow_due_date, borrow_back_date, borrow_status
            `;

        const resultBorrow = await this.client.query(updateBorrow, [
          new Date(),
          element.books_code,
          data.members_code,
        ]);
        insertedBooks.push(resultBorrow.rows[0]);

        const updateBooks = `
            UPDATE books SET stock=(stock+1) WHERE code=$1
            `;

        await this.client.query(updateBooks, [
          element.books_code,
        ]);
      }

      const checkDateReturnQuery = `
          SELECT borrow_due_date
          FROM borrowed
          WHERE members_code=$1 and borrow_status='Borrowed' 
          GROUP BY members_code, borrowed.borrow_due_date
          `;
      const checkReturnBooks = await this.client.query(checkDateReturnQuery, [
        data.members_code,
      ]);

      if (checkReturnBooks.rows.length > 0) {
        const returnDate = checkReturnBooks.rows[0].borrow_due_date;
        const totalDate = calculateRemainingDays(returnDate);
        if (totalDate > 1) {
          const updateQuery = `
            UPDATE members SET status = 'Penalized' WHERE code=$1
            `;

          const result = await this.client.query(updateQuery, [
            data.members_code,
          ]);
        }
      }
      await this.client.query("COMMIT");

      resp.status = 200;
      resp.message ="Berhasil mengembalikan buku!";
      resp.data = insertedBooks;
      return resp;
    } catch (error) {
      await this.client.query("ROLLBACK");
      const resp = new Response(400, "" + error, []);
      return resp;
    }
  }
}

function generateUniqueCode() {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}

function calculateRemainingDays(borrow_due_date: Date): number {
  const now = Date.now(); // Waktu saat ini dalam milidetik
  const dueDate = new Date(borrow_due_date).getTime(); // Konversi borrow_due_date ke milidetik

  const differenceInMilliseconds = dueDate - now; // Selisih waktu dalam milidetik
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24); // Konversi milidetik ke hari

  return Math.floor(differenceInDays); // Mengembalikan selisih dalam hari (dibulatkan ke bawah)
}
