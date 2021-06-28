const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionLogSchema = new Schema({
    id:{type:Number,required:true}, // ไอดี
    date:{type:Date}, // วันที่
    //new Date().toISOString()
    //2020-12-30T12:40:20.964Z

    groupName:{type:String}, // ชื่อเอกสาร
    groupId:{type:Number}, // รหัสเอกสาร

    //status:{type:String},  // สถานะเอกสาร open,close,delete
    //transactionType:{type:String}, // ประเภทเอกสาร

    effectStock:{type:String}, // กระทบสต็อก
    effectOrder:{type:String}, // กระทบจอง
    effectPlan:{teyp:String}, // กระทบแผน

    photoUrl1:{type:[String]}, //

    partnerId:{type:Number}, // ไอดีคู่ค้า
    title:{type:String}, // คำนำหน้า
    name:{type:String}, // ชื่อ
    phone:{type:[String]}, // โทรศัพท์ 
   
    address:{  // ที่อยู่
        type: [{
            number:{type:String}, // เลขที่
            tambon:{type:String}, // ตำบล แขวง 
            district:{type:String}, // อำเภอ เขต 
            province:{type:String}, // จังหวัด
            postcode:{type:String} // รหัสไปรษณีย์
        }],        
    },

    remark:{type:String}, // หมายเหตุ

    userId:{type:String},
    shopId:{type:String,required:true}, //

    total:{type:Number}, // รวม
    reduction:{type:Number}, // ส่วนลด
    grandTotal:{type:Number}, // สุทธิ

    status:{type:String},// ["open","close","delete"]
    detail:{   // รายละเอียด
        type: [{
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
        }],        
    }
});

TransactionLogSchema.index({id:1,groupName:1,name:1})

module.exports = TransactionLog = mongoose.model('TransactionLog', TransactionLogSchema);