const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plantSchema = new Schema({
  plots: [{
    season: { type: String },
    description: { type: String },
    prePlantSeeds: { type: String },
    prePlantSeedsDate: String,
    prePlantGerminated: { type: String },
    prePlantGerminatedDate: String,
    seedsTransferred: { type: String },
    seedsTransferredDate: String,
    harvestYieldTally: Number,
    images: { type: [String] },
    harvests: [{
      observations: { type: String },
      yield: { type: Number },
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }],
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }],
  harvests: [{
    observations: { type: String },
    yield: { type: Number },
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }],
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: Schema.ObjectId, ref: 'User' }
  }],
  likes: [{ type: Schema.ObjectId, ref: 'User' }],
  postedBy: { type: Schema.ObjectId, ref: 'User' },
  plantname: {
    type: String,
    required: '{PATH} is required!',
    unique: true
  },
  exercises: {
    type: Array
  },
  description: {
    type: String,
  },
  spacing: {
    type: String
  },
  soil: {
    type: String
  },
  plantHeight: {
    type: String
  },
  careDuringGrowth: {
    type: String
  },
  pests: {
    type: String
  },
  whenToPlant: {
    type: String
  },
  photo: {
    data: Buffer,
    contentType: String
  },
}, {
  timestamps: true,
});

// const imageSchema = Schema({
//   plant: {
//     type: Schema.Types.ObjectId,
//     ref: 'Plant' },
//   url: String,
// });

export default mongoose.model('Plant', plantSchema);
