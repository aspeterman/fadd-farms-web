import formidable from 'formidable'
import fs from 'fs'
import extend from 'lodash/extend'
import Plant from '../models/plant.model'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let plant = new Plant(fields)
        plant.postedBy = req.profile
        if (files.photo) {
            plant.photo.data = fs.readFileSync(files.photo.path)
            plant.photo.contentType = files.photo.type
        }
        try {
            let result = await plant.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        let plant = req.plant
        plant = extend(plant, fields)
        if (files.photo) {
            plant.photo.data = fs.readFileSync(files.photo.path)
            plant.photo.contentType = files.photo.type
        }
        try {
            await plant.save()
            res.json(plant)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const postByID = async (req, res, next, id) => {
    try {
        let plant = await Plant.findById(id).populate('postedBy', '_id name').exec()
        if (!plant)
            return res.status('400').json({
                error: "Plant not found"
            })
        req.plant = plant
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve use plant"
        })
    }
}

const listByUser = async (req, res) => {
    try {
        let plants = await Plant.find({ postedBy: req.profile._id })
            .populate('comments.postedBy', '_id name')
            .populate('plots.postedBy', '_id name')
            .populate('harvests.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        res.json(plants)
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
        let plants = await Plant.find({ postedBy: { $in: req.profile.following } })
            .populate('comments.postedBy', '_id name')
            .populate('plots.postedBy', '_id name')
            .populate('harvests.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('plantname')
            .exec()
        res.json(plants)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getOne = async (req, res, data) => {
    try {
        let plant = await Plant.findById(req.params.plantId)
        res.json(plant)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    let plant = req.plant
    try {
        let deletedPlant = await plant.remove()
        res.json(deletedPlant)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.plant.photo.contentType)
    return res.send(req.plant.photo.data)
}

const like = async (req, res) => {
    try {
        let result = await Plant.findByIdAndUpdate(req.body.plantId, { $push: { likes: req.body.userId } }, { new: true })
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const unlike = async (req, res) => {
    try {
        let result = await Plant.findByIdAndUpdate(req.body.plantId, { $pull: { likes: req.body.userId } }, { new: true })
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const isPoster = (req, res, next) => {
    let isPoster = req.plant && req.auth && req.plant.postedBy._id == req.auth._id
    if (!isPoster) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

const comment = async (req, res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId
    try {
        let result = await Plant.findByIdAndUpdate(req.body.plantId, { $push: { comments: comment } }, { new: true })
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
        let result = await Plant.findByIdAndUpdate(req.body.plantId, { $pull: { comments: { _id: comment._id } } }, { new: true })
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
const plot = async (req, res) => {
    let plot = req.body.plot
    plot.postedBy = req.body.userId
    try {
        let result = await Plant.findByIdAndUpdate(req.body.plantId, { $push: { plots: plot } }, { new: true })
            .populate('plots.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const unplot = async (req, res) => {
    let plot = req.body.plot
    try {
        let result = await Plant.findByIdAndUpdate(req.body.plantId, { $pull: { plots: { _id: plot._id }, harvests: { harvestPlot: plot._id } } }, { new: true })
            .populate('plots.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const harvest = async (req, res) => {
    let harvest = req.body.harvest
    harvest.postedBy = req.body.userId
    harvest.harvestPlot = req.body.plotId
    try {
        let result = await Plant.findByIdAndUpdate(req.body.plantId, { $push: { harvests: harvest } }, { new: true })
            .populate('harvestPlot', '_id plotname')
            // .populate('harvests.harvestPlot', '_id plotname')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const unharvest = async (req, res) => {
    let harvest = req.body.harvest
    try {
        let result = await Plant.findByIdAndUpdate(req.body.plantId, { $pull: { harvests: { _id: harvest._id } } }, { new: true })
            .populate('harvests.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {
    listByUser,
    listNewsFeed,
    create,
    update,
    postByID,
    getOne,
    remove,
    photo,
    like,
    unlike,
    comment,
    uncomment,
    plot,
    unplot,
    isPoster,
    harvest,
    unharvest
}
