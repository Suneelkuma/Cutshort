const jwt=require('jsonwebtoken')
const User = require("../models/user");
const secret = "RESTAPI";

const authenticate=async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        console.log("Verify token");
        if (token) {        // verify a token symmetric
            jwt.verify(token, secret, function (err, decoded) {
                if(err){
                    return res.status(403).json({
                        status: "failed",
                        message: "Invalid token"
                    })
                }
                req.user = decoded.data;
                next();
            });
        } else {
            return res.status(403).json({
                status: "failed",
                message: "Invalid token"
            })
        }
    }else {
        return res.status(403).json({ status: "Failed", 
        message : "Not authenticated user"});
    }
}

module.exports=authenticate