import formidable from 'formidable'
import fs from 'fs'
import extend from 'lodash/extend'
import Harvest from '../models/harvest.model'
import defaultImage from './../../client/assets/images/veg.jpg'
import errorHandler from './../helpers/dbErrorHandler'

const create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                message: "Image could not be uploaded"
            })
        }
        let harvest = new Harvest(fields)
        harvest.plot = req.plot
        harvest.plant = req.plant
        harvest.postedBy = req.profile
        if (files.image) {
            harvest.image.data = fs.readFileSync(files.image.path)
            harvest.image.contentType = files.image.type
        }
        try {
            let result = await harvest.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const listHarvestFeed = async (req, res) => {
    // let following = req.profile.following
    // following.push(req.profile._id)
    try {
        let posts = await Harvest.find({})
            // let posts = await Harvest.find({ postedBy: { $in: req.profile.following } })
            // .populate('plant', '_id plantname')
            .populate('plot', '_id name')
            // .populate('postedBy', '_id name')
            .sort('-createdAt')
            .exec()
        res.json(posts)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const harvestById = async (req, res, next, id) => {
    try {
        let harvest = await Harvest.findById(id)
            .populate('plot', '_id name')
            .exec()
        if (!harvest)
            return res.status('400').json({
                error: "harvest not found"
            })
        req.harvest = harvest
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve harvest"
        })
    }
}

const photo = (req, res, next) => {
    if (req.harvest.image.data) {
        res.set("Content-Type", req.harvest.image.contentType)
        return res.send(req.harvest.image.data)
    }
    next()
}
const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + defaultImage)
}

const read = (req, res) => {
    req.harvest.image = undefined
    return res.json(req.harvest)
}

const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                message: "Photo could not be uploaded"
            })
        }
        let harvest = req.harvest
        harvest = extend(harvest, fields)
        if (files.image) {
            harvest.image.data = fs.readFileSync(files.image.path)
            harvest.image.contentType = files.image.type
        }
        try {
            let result = await harvest.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const remove = async (req, res) => {
    try {
        let harvest = req.harvest
        let deletedharvest = await harvest.remove()
        res.json(deletedharvest)

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listByPlot = async (req, res) => {
    try {
        let harvests = await Harvest.find({ plot: req.plot._id })
            // .populate('plant', '_id name')
            .populate('plot', '_id name').select('-image')
        res.json(harvests)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listLatest = async (req, res) => {
    try {
        let harvests = await Harvest.find({}).sort('-created').limit(5).populate('plot', '_id name').exec()
        res.json(harvests)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req, res) => {
    const query = {}
    if (req.query.search)
        query.name = { '$regex': req.query.search, '$options': "i" }
    try {
        let harvests = await Harvest.find(query).populate('plot', '_id name').select('-image').exec()
        res.json(harvests)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default {
    create,
    listHarvestFeed,
    harvestById,
    photo,
    defaultPhoto,
    read,
    update,
    remove,
    listByPlot,
    listLatest,
    list,
}
