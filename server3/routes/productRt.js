const express = require("express");
const router = express.Router();
const uuid = require("uuid");
//const productData = require('./product.json')

const dataRt = require('./dataRt')
const params=require('./params')

const checkNone=()=>{return (req,res,next)=>{next()}}
const checkShopToken=require('../middleware/checkShopToken')
const checkUserLevel=require('../middleware/checkUserLevel')

const param=params.product

const routeTemplate=[
    
    {route:"init",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"restore",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    {route:"backup",type:"post", useRoute:true, 
    checkAuth:checkNone,checkLevel:checkNone},
    
    {route:"getlimit",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"deletecustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"addcustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
    {route:"updatecustom",type:"post", useRoute:true, 
    checkAuth:checkShopToken,checkLevel:checkUserLevel},
]  

dataRt({router,param,routeTemplate})

module.exports = router;