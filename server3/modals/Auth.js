const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {authConnection} = require('./AuthConnection');

const ShopSchema = new Schema({

    /*1*/    shopName: {type: String,unique:true},//input  ชื่อร้าน 
             //shopName: {type: String,required: true,unique:true}
    /*2*/    password:{type:String},//input  รหัส 
    /*3*/    active:{type:Boolean},//autogen by mongo
    /*4*/    code:{type:String},//autogen by node
             //uuid.v4()   
    /*5*/    dateIn:{type:Date},
             //new Date().toISOString()
             //2020-12-30T12:40:20.964Z
    
    /*6*/    ownerName:{type:String,unique:true},//input ชื่อเจ้าของ 
             //ownerName:{type:String,required:true,unique:true}
    /*7*/    ownerPassword:{type:String},//input รหัส
    /*8*/    ownerActive:{type:Boolean},//autogen by mongo
    /*9*/    ownerCode:{type:String},//autogen by node 
        
    /*10*/   ownerEmail:{type:String,unique:true}, //อีเมลเจ้าของ
    });
    
ShopSchema.index({shopName:1,ownerName:1})

//===========================

const UserSchema = new Schema({
    /*1*/     id:{type:Number,required:true}, // ไอดี
    /*2*/     username:{type:String,required:true}, // ชื่อผู้ใช้ 
    /*3*/     password:{type:String,required:true}, // รหัส 
    /*4*/     active:{type:Boolean,required:true}, // 
    /*5*/     code:{type:String,required:true}, //
              //uuid.v4()   
    /*6*/     userLevel:{type:String,required:true}, // ระดับผู้ใช้
    
    /*7*/     shopId:{type:String,required:true}, // 
    /*8*/     dateIn:{type:Date,required:true}, //
              //new Date().toISOString()
              //2020-12-30T12:40:20.964Z
    /*9*/     name:{type:String}, // ชื่อ
    /*10*/    surname:{type:String}, // สกุล
    
    });
    
UserSchema.index({id:1,username:1,shopId:1})

const User = authConnection.model('User', UserSchema); 
const Shop = authConnection.model('Shop', ShopSchema);

module.exports = {
    User,
    Shop,
};