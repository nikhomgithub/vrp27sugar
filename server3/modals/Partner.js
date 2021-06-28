const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
    id:{type:Number,required:true}, //ไอดี
    title:{type:String}, // คำนำหน้า
    name:{type:String}, // ชื่อ 
    phone:{type:[String]}, // โทรศัพท์
    groupId: {type: Number}, // ไอดีประเภทคู่ค้า
    groupName: {type:String}, // ชื่อกลุ่มประเภทคู่ค้า
    //partnerType:{type:String}, // ประเภทคู่ค้า  
    address:{  // ที่อยู่
        type: [{
            number:{type:String}, // เลขที่
            tambon:{type:String}, // ตำบล แขวง 
            district:{type:String}, // อำเภอ เขต 
            province:{type:String}, // จังหวัด
            postcode:{type:String} // รหัสไปรษณีย์
        }],        
    },
    photoUrl1:{type:[String]},
    remark:{type:String}, // หมายเหตุ

    userId:{type:String},
    shopId:{type:String,required:true},
});

PartnerSchema.index({id:1,name:1})

module.exports = Partner = mongoose.model('Partner', PartnerSchema);