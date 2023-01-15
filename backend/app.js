const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
var jwt = require('jsonwebtoken');
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/post");
dotenv.config({ path: "./config.env" });
require('./db/connection')
const PORT = process.env.PORT;


const secret = "RESTAPI";
const app = express();

app.get("/", (req, res) => {
    res.send("Ok");
});
// app.use("/api/v1/posts", (req, res, next) => {
//     if (req.headers.authorization) {
//         const token = req.headers.authorization;
//         console.log("Verify token");
//         if (token) {        // verify a token symmetric
//             jwt.verify(token, secret, function (err, decoded) {
//                 if(err){
//                     return res.status(403).json({
//                         status: "failed",
//                         message: "Invalid token"
//                     })
//                 }
//                 req.user = decoded.data;
//                 next();
//             });
//         } else {
//             return res.status(403).json({
//                 status: "failed",
//                 message: "Invalid token"
//             })
//         }
//     }else {
//         return res.status(403).json({ status: "Failed", 
//         message : "Not authenticated user"});
//     }
// })
app.use("/api/v1", loginRoutes);
app.use("/api/v1", postRoutes);
app.listen(PORT, () => console.log(`The server is up at  ${PORT}`));