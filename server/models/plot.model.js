const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const plotSchema = new Schema({
    name: { type: String, required: 'Plot Name is Rwquired' },
    image: {
        data: Buffer,
        contentType: String
    },
    season: { type: String, enum: ['Spring', 'Fall'] },
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
    plant: { type: mongoose.Schema.ObjectId, ref: 'Plant' },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
}, {
    timestamps: true
})

export default mongoose.model('Plot', plotSchema);
