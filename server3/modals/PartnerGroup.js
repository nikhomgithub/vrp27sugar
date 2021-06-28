const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartnerGroupSchema = new Schema({
    id:{type:Number,required:true}, //ไอดีกลุ่ม
    groupName: {type: String,required:true}, //ชื่อกลุ่ม 
    parentGroup:{type:[Number]}, //กลุ่ม
    children:{type:[Number]}, //กลุ่มย่อย
    parentId:{type:Number}, //ไอดีกลุ่มแม่
    mainGroup:{type:Number},//
    userId:{type:String},
    shopId:{type:String,required:true},
});

PartnerGroupSchema.index({id:1,groupName:1})

module.exports = PartnerGroup = mongoose.model('PartnerGroup', PartnerGroupSchema);