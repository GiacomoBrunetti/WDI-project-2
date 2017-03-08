const mongoose = require('mongoose');

// we don't need a seperate model for the commentSchema
const commentSchema = new mongoose.Schema({
  content: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
// the time and date the coomment was created
  timestamps: true
});

// checks for if the user comment was created by the user and provide access to delete the comment if they wanted to
commentSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};


const pubSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  expensiveness: {type: String, required: true},
  atmosphere: {type: String, required: true},
  comments: [ commentSchema ],
  image: {type: String},
  lat: Number,
  lng: Number
});

pubSchema.virtual('src')
.get(function getImageSRC(){
  if(!this.filename) return null;
  if(this.filename.match(/^http/)) return this.filename;
  return `https://s3-eu-west-1.amazonaws.com/wdi-ldn-25/${this.filename}`;
});

module.exports = mongoose.model('Pub', pubSchema);
