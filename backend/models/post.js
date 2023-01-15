const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const postSchema = new Schema({
    title: String, 
    body: String,
    user : {type : Schema.Types.ObjectId, ref: "User"}
 }, {timestamps : true})

const blogModel = mongoose.model("Blog", postSchema);
module.exports = blogModel;