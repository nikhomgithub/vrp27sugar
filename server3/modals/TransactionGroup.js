const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionGroupSchema = new Schema({
    id:{type:Number,required:true}, //ไอดีกลุ่ม
    groupName: {type: String,required:true}, //ชื่อกลุ่ม 
    children:{type:[Number]}, //กลุ่มย่อย
    children:{type:[Number]}, //กลุ่มย่อย
    parentId:{type:Number}, //ไอดีกลุ่มแม่
    mainGroup:{type:Number},//
    userId:{type:String},
    shopId:{type:String,required:true},

    effectStock:{type:String},
    effectOrder:{type:String},
    effectPlan:{type:String},

    transactionType:{type:String},
});

TransactionGroupSchema.index({id:1,groupName:1})

module.exports = TransactionGroup = mongoose.model('TransactionGroup', TransactionGroupSchema);