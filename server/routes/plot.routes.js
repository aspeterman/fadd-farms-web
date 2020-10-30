import express from 'express'
import authCtrl from '../controllers/auth.controller'
import plantCtrl from '../controllers/plant.controller'
import plotCtrl from '../controllers/plot.controller'

const router = express.Router()

router.route('/api/plots/by/:plantId')
    .post(authCtrl.requireSignin, plotCtrl.create)
    .get(plotCtrl.listByPlant)

router.route('/api/plots/latest')
    .get(plotCtrl.listLatest)


router.route('/api/plots/categories')
    .get(plotCtrl.listCategories)

router.route('/api/plots')
    .get(plotCtrl.list)

router.route('/api/plots/:plotId')
    .get(plotCtrl.read)

router.route('/api/plot/image/:plotId')
    .get(plotCtrl.photo, plotCtrl.defaultPhoto)
router.route('/api/plot/defaultphoto')
    .get(plotCtrl.defaultPhoto)

router.route('/api/plot/:plantId/:plotId')
    .put(authCtrl.requireSignin, plantCtrl.isPoster, plotCtrl.update)
    .delete(authCtrl.requireSignin, plantCtrl.isPoster, plotCtrl.remove)

router.param('plantId', plantCtrl.postByID)
router.param('plotId', plotCtrl.plotById)

export default router