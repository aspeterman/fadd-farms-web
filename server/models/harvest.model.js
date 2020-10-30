const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const harvestSchema = new Schema({
    observations: { type: String },
    yield: { type: Number },
    date: { type: Date, default: Date.now() },
    image: {
        data: Buffer,
        contentType: String
    },
    plot: { type: mongoose.Schema.ObjectId, ref: 'Plot' },
    plant: { type: mongoose.Schema.ObjectId, ref: 'Plant' },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
    timeStamps: true
})

export default mongoose.model('Harvest', harvestSchema);
