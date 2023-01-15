const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const todoSchema = new Schema({
    name: {type: String, required : true},
    amount: {type: Number, required : true},
    quantity:{type: Number, required : true},

    user : {type : Schema.Types.ObjectId, ref: "User"}
 }, {timestamps : true})

const todoModel = mongoose.model("Todo", todoSchema);
module.exports = todoModel;