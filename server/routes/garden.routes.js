import express from 'express'
import authCtrl from '../controllers/auth.controller'
import gardenCtrl from '../controllers/garden.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/garden/new/:userId')
    .post(authCtrl.requireSignin, gardenCtrl.create)

router.route('/api/garden/update')
    .put(authCtrl.requireSignin, gardenCtrl.update)

router.route('/api/garden/photo/:gardenId')
    .get(gardenCtrl.photo)

router.route('/api/garden/by/:userId')
    .get(authCtrl.requireSignin, gardenCtrl.listByUser)

router.route('/api/garden/feed/:userId')
    .get(authCtrl.requireSignin, gardenCtrl.listNewsFeed)

router.route('/api/garden/like')
    .put(authCtrl.requireSignin, gardenCtrl.like)
router.route('/api/garden/unlike')
    .put(authCtrl.requireSignin, gardenCtrl.unlike)

router.route('/api/garden/comment')
    .put(authCtrl.requireSignin, gardenCtrl.comment)
router.route('/api/garden/uncomment')
    .put(authCtrl.requireSignin, gardenCtrl.uncomment)

router.route('/api/garden/:gardenId')
    .delete(authCtrl.requireSignin, gardenCtrl.isPoster, gardenCtrl.remove)
    .get(authCtrl.requireSignin, gardenCtrl.getOne)

router.param('userId', userCtrl.userByID)
router.param('gardenId', gardenCtrl.gardenByID)

export default router
