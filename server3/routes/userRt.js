const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const dataRt = require('./dataRt')
const params=require('./params')

const checkNone=()=>{return (req,res,next)=>{next()}}
const checkShopToken=require('../middleware/checkShopToken');
const checkUserLevel = require("../middleware/checkUserLevel");

const param=params.user

const routeTemplate=[
    
    {route:"login",type:"post",useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkNone},
    {route:"changepassword",type:"post",useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkNone},
    {route:"adduser",type:"post",useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    
    {route:"init",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"restore",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"backup",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"getcustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"deletecustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},

]  


dataRt({router,param,routeTemplate})

module.exports = router;