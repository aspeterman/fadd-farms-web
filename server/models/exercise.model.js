const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  date: {
    type: String
  },
  plantname: {
    type: String,
    required: true
  },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: Schema.ObjectId, ref: 'User' }
  }],
  season: { type: String },
  description: { type: String },

  prePlantSeeds: { type: String },
  prePlantSeedsDate: String,
  prePlantGerminated: { type: String },
  prePlantGerminatedDate: String,
  seedsTransferred: { type: String },
  seedsTransferredDate: String,
  harvestYield: { type: [Number] },
  harvestYieldTally: Number,
  harvestYieldDate: { type: [String] },
  observations: { type: [String] },
  images: { type: [String] },
  harvest: { type: [Object] }
}, {
  timestamps: true,
});

export default mongoose.model('Exercise', exerciseSchema)
