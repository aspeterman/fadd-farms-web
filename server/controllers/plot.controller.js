import formidable from 'formidable'
import fs from 'fs'
import extend from 'lodash/extend'
import defaultImage from '../../client/assets/images/veg.jpg'
import Harvest from '../models/harvest.model'
import Plot from '../models/plot.model'
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
        let plot = new Plot(fields)
        plot.plant = req.plant
        plot.postedBy = req.profile
        if (files.image) {
            plot.image.data = fs.readFileSync(files.image.path)
            plot.image.contentType = files.image.type
        }
        try {
            let result = await plot.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const plotById = async (req, res, next, id) => {
    try {
        let plot = await Plot.findById(id)
            .populate('plant', '_id plantname')
            .populate('postedBy', '_id name')
            .exec()
        if (!plot)
            return res.status('400').json({
                error: "plot not found"
            })
        req.plot = plot
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve plot"
        })
    }
}

const photo = (req, res, next) => {
    if (req.plot.image.data) {
        res.set("Content-Type", req.plot.image.contentType)
        return res.send(req.plot.image.data)
    }
    next()
}
const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + defaultImage)
}

const read = (req, res) => {
    req.plot.image = undefined
    return res.json(req.plot)
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
        let plot = req.plot
        plot = extend(plot, fields)
        if (files.image) {
            plot.image.data = fs.readFileSync(files.image.path)
            plot.image.contentType = files.image.type
        }
        try {
            let result = await plot.save()
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
        let plot = req.plot
        let deletedHarvests = await Harvest.deleteMany({ plot: plot._id })
        let deletedPlot = await plot.remove()
        res.json({ deletedPlot, deletedHarvests })

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listByPlant = async (req, res) => {
    try {
        let plots = await Plot.find({ plant: req.plant._id })
            .populate('plant', '_id name')
            .populate('postedBy', '_id name')
            .select('-image')
        res.json(plots)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listLatest = async (req, res) => {
    try {
        let plots = await Plot.find({})
            .sort('-createdAt').limit(5)
            .populate('plant', '_id name')
            .populate('postedBy', '_id name')
            .exec()
        res.json(plots)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listCategories = async (req, res) => {
    try {
        let plots = await Plot.distinct('category', {})
        res.json(plots)
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
    if (req.query.category && req.query.category != 'All')
        query.category = req.query.category
    try {
        let plots = await Plot.find(query)
            .populate('plant', '_id name')
            .select('-image')
            .populate('postedBy', '_id name')
            .exec()
        res.json(plots)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


export default {
    create,
    plotById,
    photo,
    defaultPhoto,
    read,
    update,
    remove,
    listByPlant,
    listLatest,
    listCategories,
    list,
}
