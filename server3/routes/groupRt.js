const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const params=require('./params')

const dataRt = require('./dataRt')

const checkNone=()=>{return (req,res,next)=>{next()}}
const checkShopToken=require('../middleware/checkShopToken')
const checkUserLevel=require('../middleware/checkUserLevel')

const param=params.group

const routeTemplate=[
    
    {route:"init",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"restore",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"backup",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    
    {route:"getcustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"deletegroup",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"addgroup",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"updategroup",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
]  

dataRt({router,param,routeTemplate})

module.exports = router;