require("dotenv").config();
const express = require("express");
const notFound = require("./middlewares/notFound");
const error = require("./middlewares/error");
const todoRoute = require("./routes/todoRoute");
const authRoute = require("./routes/authRoute");
const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use(["/todo", "/todos"], todoRoute);

app.use(notFound);
app.use(error);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server on port", port));
