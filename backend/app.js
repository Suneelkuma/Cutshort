const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
var jwt = require('jsonwebtoken');
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/post");
const todosRoutes = require("./routes/todo");
dotenv.config({ path: "./config.env" });
require('./db/connection')
const PORT = process.env.PORT;


const secret = "RESTAPI";
const app = express();

app.get("/", (req, res) => {
    res.send("Ok");
});

app.use("/api/v1", loginRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", todosRoutes);
app.listen(PORT, () => console.log(`The server is up at  ${PORT}`));