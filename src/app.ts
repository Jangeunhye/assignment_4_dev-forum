import bodyParser from "body-parser";
import express from "express";
import controllers from "./contexts";

const jsonParser = bodyParser.json();
const app = express();
const port = 5050;

app.use(jsonParser);
app.use(controllers);
app.listen(port, () => {
  console.log(`안녕 서버시작 내 포트는 ${port}`);
});
