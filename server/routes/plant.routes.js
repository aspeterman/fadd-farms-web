import express from 'express'
import authCtrl from '../controllers/auth.controller'
import plantCtrl from '../controllers/plant.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/plants/new/:userId')
    .post(authCtrl.requireSignin, plantCtrl.create)

router.route('/api/plants/image/:plantId')
    .get(plantCtrl.photo, plantCtrl.defaultPhoto)
router.route('/api/plants/defaultphoto')
    .get(plantCtrl.defaultPhoto)

router.route('/api/plants/by/:userId')
    .get(authCtrl.requireSignin, plantCtrl.listByUser)

router.route('/api/plants/feed/:userId')
    .get(authCtrl.requireSignin, plantCtrl.listNewsFeed)

router.route('/api/plants')
    .get(plantCtrl.list)

router.route('/api/products/categories')
    .get(plantCtrl.listCategories)

router.route('/api/plants/like')
    .put(authCtrl.requireSignin, plantCtrl.like)
router.route('/api/plants/unlike')
    .put(authCtrl.requireSignin, plantCtrl.unlike)

router.route('/api/plants/comment')
    .put(authCtrl.requireSignin, plantCtrl.comment)
router.route('/api/plants/uncomment')
    .put(authCtrl.requireSignin, plantCtrl.uncomment)

// router.route('/api/plants/plot')
//     .put(authCtrl.requireSignin, plantCtrl.plot)
// router.route('/api/plants/unplot')
//     .put(authCtrl.requireSignin, plantCtrl.unplot)

// router.route('/api/plants/harvest')
//     .put(authCtrl.requireSignin, plantCtrl.harvest)
// router.route('/api/plants/unharvest')
//     .put(authCtrl.requireSignin, plantCtrl.unharvest)

router.route('/api/plants/getone/:plantId')
    .get(plantCtrl.getOne)

router.route('/api/plants/:plantId')
    .put(plantCtrl.update)
    .delete(authCtrl.requireSignin, plantCtrl.isPoster, plantCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('plantId', plantCtrl.postByID)

export default router
