const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');
const Comment = require('./commentModel');

const postSchema = new Schema({
  title: {type: String, required: true},
  problem: {type: String, required: true},
  pitch: {type: String, required: true},
  edits: {type: [String], default: []},
  author: {type: Schema.Types.ObjectId, required: true},
  dateCreated: {type: Number, default: Date.now()},
  tags: {type: [String], default: []},
  votes: {type: Number, default: 0},
  voters: {type: [Schema.Types.ObjectId], default: []}
});


//instance.methodName
postSchema.methods = {

  voteUpdateData: async function(voterId){

    voterId = mongoose.Types.ObjectId(voterId);
    let voting = true;
    let newVoters = [];

    //check if voting or unvoting and assemble data
    for(let i = 0; i<this.voters.length; i++){
      let v = this.voters[i];

      if(voterId.equals(v)){
        voting = false;
      }
      else {
        newVoters.push(v);
      }
    }

    //update author's kudos
    let author = await User.findById(this.author)
      .catch(err => {
        console.log(err);
      })
    let votes = voting ? author.votes + 1: author.votes -1;
    User.findByIdAndUpdate(
      this.author,
      {votes: votes},
      {useFindAndModify: false}
    ).catch(err => {
      console.log(err);
    });

    //return correct data
    if(!voting){

      return{
        votes: this.votes - 1,
        voters: newVoters
      }

    }
    else{
      newVoters.push(voterId);
      return {
          votes: this.votes + 1,
          voters: newVoters
      }

    }
  }

}

//Post.staticName
postSchema.statics = {


};

module.exports = mongoose.model('Post', postSchema);
