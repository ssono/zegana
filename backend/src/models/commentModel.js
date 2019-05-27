const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');
const Post = require('./postModel');

const commentSchema = new Schema({
  author: {type: Schema.Types.ObjectId},
  content: {type: String, required: true},
  votes: {type: Number, default:0},
  parentComment: Schema.Types.ObjectId,
  parentPost: {type: Schema.Types.ObjectId, required:true},
  dateCreated: {type: Number, default: Date.now()},
  voters: {type: [Schema.Types.ObjectId], default: []},
  deleted: {type: Boolean, default: false}
});

//premethods

//call with instance.methodName
commentSchema.methods = {

};

//call with Model.methodName
commentSchema.statics = {

};

module.exports = mongoose.model('Comment', commentSchema);
