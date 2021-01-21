import formidable from 'formidable'
import Garden from '../models/garden.model'
import errorHandler from './../helpers/dbErrorHandler'
const create = async (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                message: "Image could not be uploaded"
            })
        }
        let garden = new Garden(fields)

        garden.postedBy = req.profile
        if (files.image) {
            garden.image.data = fs.readFileSync(files.image.path)
            garden.image.contentType = files.image.type
        }
        try {
            let result = await garden.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const update = async (req, res) => {
    let garden = req.body.garden
    try {
        let result = await Garden.findByIdAndUpdate(req.body.gardenId, { $push: { rows: garden } }, { new: true })
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getOne = async (req, res, data) => {
    try {
        let garden = await Garden.findById(req.params.gardenId)
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
        res.json(garden)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const gardenByID = async (req, res, next, id) => {
    try {
        let garden = await Garden.findById(id).populate('postedBy', '_id name').exec()
        if (!garden)
            return res.status('400').json({
                error: "garden not found"
            })
        req.garden = garden
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve use garden"
        })
    }
}

const listByUser = async (req, res) => {
    try {
        let gardens = await Garden.find({ postedBy: req.profile._id })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        res.json(gardens)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listNewsFeed = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try {
        let gardens = await Garden.find({ postedBy: { $in: req.profile.following } })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        res.json(gardens)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    let garden = req.garden
    try {
        let deletedgarden = await garden.remove()
        res.json(deletedgarden)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.garden.photo.contentType)
    return res.send(req.garden.photo.data)
}

const like = async (req, res) => {
    try {
        let result = await Garden.findByIdAndUpdate(req.body.gardenId, { $push: { likes: req.body.userId } }, { new: true })
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const unlike = async (req, res) => {
    try {
        let result = await Garden.findByIdAndUpdate(req.body.gardenId, { $pull: { likes: req.body.userId } }, { new: true })
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const comment = async (req, res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId
    try {
        let result = await Garden.findByIdAndUpdate(req.body.gardenId, { $push: { comments: comment } }, { new: true })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const uncomment = async (req, res) => {
    let comment = req.body.comment
    try {
        let result = await Garden.findByIdAndUpdate(req.body.gardenId, { $pull: { comments: { _id: comment._id } } }, { new: true })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const isPoster = (req, res, next) => {
    let isPoster = req.garden && req.auth && req.garden.postedBy._id == req.auth._id
    if (!isPoster) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

export default {
    listByUser,
    listNewsFeed,
    create,
    update,
    getOne,
    gardenByID,
    remove,
    photo,
    like,
    unlike,
    comment,
    uncomment,
    isPoster
}
