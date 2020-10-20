const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plantSchema = new Schema({
  plantname: {
    type: String,
    required: '{PATH} is required!',
    unique: true
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
  active: {
    type: Boolean,
    default: true
  },
  plots: [{
    plotname: { type: String, required: 'Plot Name is Rwquired' },
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
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
  }],
  harvests: [{
    observations: { type: String },
    yield: { type: Number },
    date: { type: Date },
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    harvestPlot: { type: mongoose.Schema.ObjectId, ref: 'Plant' }
  }],
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: Schema.ObjectId, ref: 'User' }
  }],
  likes: [{ type: Schema.ObjectId, ref: 'User' }],
  postedBy: { type: Schema.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

export default mongoose.model('Plant', plantSchema);
