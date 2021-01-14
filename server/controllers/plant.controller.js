import formidable from 'formidable'
import fs from 'fs'
import extend from 'lodash/extend'
import defaultImage from '../../client/assets/images/veg.jpg'
import Harvest from '../models/harvest.model'
import Plant from '../models/plant.model'
import Plot from '../models/plot.model'
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
        if (files.image) {
            plant.image.data = fs.readFileSync(files.image.path)
            plant.image.contentType = files.image.type
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
        let plant = await Plant.findByIdAndUpdate(req.plant)
            .populate('comments.postedBy', '_id name')
            .populate('plots.postedBy', '_id name')
            .populate('harvests.postedBy', '_id name')
            .populate('postedBy', '_id name')
        plant = extend(plant, fields)
        if (files.image) {
            plant.image.data = fs.readFileSync(files.image.path)
            plant.image.contentType = files.image.type
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

const listNewsFeed = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    const { limit, offset } = req.query;
    const page = offset / limit || 1
    try {
        let countPlants = await Plant.find({ postedBy: { $in: req.profile.following } })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        let plants = await Plant.find({ postedBy: { $in: req.profile.following } })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort('plantname')
            .exec()
        let totalPages = countPlants.length

        res.json({
            plants,
            currentPage: page,
            totalPages: Math.ceil(totalPages / limit),
            perPage: limit
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const getOne = async (req, res, data) => {
    try {
        let plant = await Plant.findById(req.params.plantId)
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
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
        let deletedHarvests = await Harvest.deleteMany({ plant: plant._id })
        let deletedPlots = await Plot.deleteMany({ plant: plant._id })
        let deletedPlant = await plant.remove()
        res.json({ deletedPlant, deletedPlots, deletedHarvests })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.plant.image.contentType)
    return res.send(req.plant.image.data)
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + defaultImage)
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

const list = async (req, res) => {
    const query = {}
    if (req.query.search)
        query.plantname = { '$regex': req.query.search, '$options': "i" }
    if (req.query.category && req.query.category != 'All')
        query.category = req.query.category
    if (req.query.active && req.query != "All")
        query.active = req.query.active
    try {
        let plants = await Plant.find(query)
            .populate('comments.postedBy', '_id name')
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

const listCategories = async (req, res) => {
    try {
        let plants = await Plant.distinct('category', {})
        res.json(plants)
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
    defaultPhoto,
    like,
    unlike,
    comment,
    uncomment,
    isPoster,
    list,
    listCategories
}
