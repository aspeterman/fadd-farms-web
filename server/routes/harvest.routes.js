import express from 'express'
import authCtrl from '../controllers/auth.controller'
import harvestCtrl from '../controllers/harvest.controller'
import plotCtrl from '../controllers/plot.controller'

const router = express.Router()

router.route('/api/harvests/by/:plotId')
    .post(authCtrl.requireSignin, harvestCtrl.create)
    .get(harvestCtrl.listByPlot)

router.route('/api/harvests/latest')
    .get(harvestCtrl.listLatest)

router.route('/api/harvests')
    .get(harvestCtrl.list)

router.route('/api/harvests/:harvestId')
    .get(harvestCtrl.read)

router.route('/api/harvest/image/:harvestId')
    .get(harvestCtrl.photo, harvestCtrl.defaultPhoto)
router.route('/api/harvest/defaultphoto')
    .get(harvestCtrl.defaultPhoto)

router.route('/api/harvest/:plotId/:harvestId')
    .put(authCtrl.requireSignin, harvestCtrl.update)
    .delete(authCtrl.requireSignin, harvestCtrl.remove)

router.param('plotId', plotCtrl.plotById)
router.param('harvestId', harvestCtrl.harvestById)

export default router
