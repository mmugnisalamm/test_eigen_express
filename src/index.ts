import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import booksRouter from "./routes/booksRoute";
import membersRouter from "./routes/membersRoute";
import borrowRouter from "./routes/borrowRoute";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(booksRouter);
app.use(membersRouter);
app.use(borrowRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
