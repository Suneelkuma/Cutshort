const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require('express-validator');
const Todo = require("../models/todo");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "RESTAPI";
const router = express.Router();
const authenticate=require('../middleware/authenticate')

router.post("/todos",authenticate, async (req, res) => {
    try{
        const posts = await Todo.create({
            name: req.body.name,
            amount: req.body.amount,
            quantity:req.body.quantity,
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

router.get("/todos",authenticate, async (req, res) => {
    // write the code to fetch posts
    try{
        const {PageSize = 5, pageNo = 1} = req.query;

        const todos = await Todo.find().skip((pageNo -1) * PageSize).limit(PageSize).populate("user");
        res.json({
            status: "Sucess",
        todos
        })
    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message : e.message
    
        })
    }

});

router.put("/todos/:id",authenticate, async (req, res) => {
    // write the code to fetch posts
    try{
        const todosPost = await Todo.findOne({$and : [{user: req.user},{ _id: req.params.id}]});

        if(todosPost){
            const todos = await Todo.updateOne({_id: req.params.id}, req.body);
            res.json({
                status: "Sucess",
                todos
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

router.delete("/todos/:id",authenticate, async (req, res) => {
    try{
        const todosPost = await Todo.findOne({$and : [{user: req.user},{ _id: req.params.id}]});

        if(todosPost){
            const todos = await Todo.deleteOne({_id: req.params.id});
            res.json({
                status: "Sucess",
                message: "todo deleted"
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