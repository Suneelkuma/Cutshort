const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');
const Post = require("../models/post");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "RESTAPI";
const router = express.Router();
const authenticate=require('../middleware/authenticate')
router.post("/posts",authenticate, async (req, res) => {
    try{
        const posts = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user: req.user
        });
        res.json({
            status: "Sucess",
            posts
    
        })

    }catch(e){
        res.status(500).json({
            status: "Failed",
            message : e.message
    
        })
    }

});

router.get("/posts",authenticate, async (req, res) => {
    // write the code to fetch posts
    try{
        const {PageSize = 5, pageNo = 1} = req.query;

        const posts = await Post.find().skip((pageNo -1) * PageSize).limit(PageSize).populate("user");
        res.json({
            status: "Sucess",
            posts
        })
    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message : e.message
    
        })
    }

});

router.put("/posts/:id",authenticate, async (req, res) => {
    // write the code to fetch posts
    try{
        const userPost = await Post.findOne({$and : [{user: req.user},{ _id: req.params.id}]});

        if(userPost){
            const posts = await Post.updateOne({_id: req.params.id}, req.body);
            res.json({
                status: "Sucess",
                posts
            })
        }else {
            res.status(401).json({
                status: "Failed",
                message: "User is not authorised to make changes in this post"
            })
        }

    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message : e.message
    
        })
    }

});

router.delete("/posts/:id",authenticate, async (req, res) => {
    try{
        const userPost = await Post.findOne({$and : [{user: req.user},{ _id: req.params.id}]});

        if(userPost){
            const posts = await Post.deleteOne({_id: req.params.id});
            res.json({
                status: "Sucess",
                message: "Post deleted"
            })
        }else {
            res.status(401).json({
                status: "Failed",
                message: "User is not authorised to make changes in this post"
            })
        }

    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message : e.message
    
        })
    }

});
module.exports = router;