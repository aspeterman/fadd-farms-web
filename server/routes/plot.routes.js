import express from 'express'
import authCtrl from '../controllers/auth.controller'
import plantCtrl from '../controllers/plant.controller'
import plotCtrl from '../controllers/plot.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/plots/by/:plantId/:userId')
    .post(authCtrl.requireSignin, plotCtrl.create)
    .get(plotCtrl.listByPlant)

router.route('/api/plots/latest/:userId')
    .get(authCtrl.requireSignin, plotCtrl.listLatest)


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
    .put(authCtrl.requireSignin, plotCtrl.update)
    .delete(authCtrl.requireSignin, plotCtrl.remove)

router.param('plantId', plantCtrl.postByID)
router.param('plotId', plotCtrl.plotById)
router.param('userId', userCtrl.userByID)

export default router
