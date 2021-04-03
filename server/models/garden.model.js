const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const plantSchema = new Schema({
    plantname: {
        type: String,
        required: '{PATH} is required!',
        // unique: true
    },
    category: {
        type: String,
        default: 'General'
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
    image: {
        data: Buffer,
        contentType: String
    },
    active: {
        type: Boolean,
        default: true
    },
    // plots: [{
    //   plotname: { type: String, required: 'Plot Name is Rwquired' },
    //   season: { type: String },
    //   description: { type: String },
    //   prePlantSeeds: { type: String },
    //   prePlantSeedsDate: String,
    //   prePlantGerminated: { type: String },
    //   prePlantGerminatedDate: String,
    //   seedsTransferred: { type: String },
    //   seedsTransferredDate: String,
    //   harvestYieldTally: Number,
    //   images: { type: [String] },
    //   created: { type: Date, default: Date.now },
    //   postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
    // }],
    // harvests: [{
    //   observations: { type: String },
    //   yield: { type: Number },
    //   date: { type: Date },
    //   created: { type: Date, default: Date.now },
    //   postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    //   harvestPlot: { type: mongoose.Schema.ObjectId, ref: 'Plant' }
    // }],

    likes: [{ type: Schema.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
});

const gardenSchema = new Schema({
    gardenName: { type: String },
    rows: { type: Array },
    gardenScheme: [],
    season: { type: String },
    year: { type: Number },
    image: {
        data: Buffer,
        contentType: String
    },
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: Schema.ObjectId, ref: 'User' }
    }],
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
    timeStamps: true
})

export default mongoose.model('Garden', gardenSchema);