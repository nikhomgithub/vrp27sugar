const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id:{type:Number,required:true}, // ไอดี
    barcode:{type:String}, // บาร์โค้ด
    name:{type:String}, // ชื่อ
    groupId: {type: Number}, // ไอดีกลุ่ม
    groupName: {type:String}, // ชื่อกลุ่ม
    photoUrl1:{type:[String]}, // 
    unit:{type:String},  // หน่วย
    price:{ type:Number}, // ราคา
    remark:{type:String}, // หมายเหตุ
    
    userId:{type:String},
    shopId:{type:String,required:true}, //
    
    isRawMat:{type:Boolean}, //เป็นวัตถุดิบ
    detail:{ // รายละเอียด
        type:[{
            id:{type:Number}, // ไอดี
            barcode:{type:String}, // บาร์โค้ด
            name:{type:String}, // ชื่อ
            groupId:{type:Number}, // ไอดีกลุ่ม
            groupName:{type:String}, // ชื่อกลุ่ม
            unit:{type:String}, // หน่วย
            price:{type:Number}, // ราคา 
            quantity:{type:Number}, // จำนวน 
            result:{type:Number},
            remark:{type:String}, //หมายเหตุ
            isRawMat:{type:Boolean} // เป็นวัตถุดิบ
        }]
    },
    stock:{type:Number,default:0}, // ยอดสต็อค
    order:{type:Number,default:0}, // ยอดจอง
    plan:{type:Number,default:0} //ยอดแผน

});

ProductSchema.index({id:1,name:1})

module.exports = Product = mongoose.model('Product', ProductSchema);