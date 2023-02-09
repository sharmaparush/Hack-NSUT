const express=require('express');
const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/userController');
router.post('/create',userController.create);
router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect:'/'}
),userController.createSession);
router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/signOut',userController.destroySession);
module.exports=router;