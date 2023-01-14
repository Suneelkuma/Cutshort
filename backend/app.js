const express = require("express");
const mongoose = require('mongoose');


const secret = "RESTAPI";
const app = express();

app.get("/", (req, res) => {
    res.send("Ok");
});

app.listen(3000, () => console.log("The server is up at 3000 port"));