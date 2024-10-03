const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction'); 
const dateFormat = require('../utils/dateFormat'); 

// Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],  // Embedding Reaction schema
},
{
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
});

// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
