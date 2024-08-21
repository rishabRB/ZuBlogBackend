const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authorName:{
    type:String,
    required:true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image:{
    type:String,
    required:false
  }
});

module.exports = mongoose.model("Post", PostSchema);