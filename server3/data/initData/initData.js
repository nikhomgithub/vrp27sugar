const tableTemplate=require('./tableTemplate')
const uuid = require("uuid");

//==============================
const shopInit={
    shopName:"shopa",
    password:"shopa",
    active:true,
    code:uuid.v4(),
    dateIn: new Date().toISOString().substring(0,10),
    
    ownerName:"ownera",
    ownerPassword:"ownera",
    ownerActive:true,
    ownerCode:uuid.v4(),
    
    ownerEmail:'a@mail.com'
}
//-----------------------------
const userInit={
    id:1,
    username:"usera",
    password:"usera",
    active:true,
    code:uuid.v4(),
    userLevel:"admin",
    dateIn: new Date().toISOString().substring(0,10),
    name:"usera",
    surname:"usera"
}

//--------------------------------------
const basicDataInit={
    id:1,
    title:["นาย","นาง","นางสาว"],
    unit:["อัน","ชิ้น","แผ่น"],
    userLevel:["admin","staff","visitor"],
    //transactionType:["ซื้อ","ขาย","จอง"],
    //transactionStatus:["เสร็จ","ไม่เสร็จ"],
    //partnerType:["ผู้ซื้อ","ผู้ขาย"],

    effectStock:["บวก","ลบ","คงที่"],
    effectOrder:["บวก","ลบ","คงที่"],
    effectPlan:["บวก","ลบ","คงที่"],

    //partnerType:["ผู้ซื้อ","ผู้ขาย"],
    
    routeAuth:[
     
     {id:1,routeAddress:'/user/adduser', routeName:"N/A", userLevel:["admin"]},

     {id:4,routeAddress:'/user/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:5,routeAddress:'/user/deletecustom', routeName:"N/A", userLevel:["admin"]},

     {id:8,routeAddress:'/group/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:9,routeAddress:'/group/deletegroup', routeName:"N/A", userLevel:["admin","staff"]},
     {id:10,routeAddress:'/group/addgroup', routeName:"N/A", userLevel:["admin","staff"]},
     {id:11,routeAddress:'/group/updategroup', routeName:"N/A", userLevel:["admin","staff"]},

     {id:14,routeAddress:'/partnergroup/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:15,routeAddress:'/partnergroup/deletegroup', routeName:"N/A", userLevel:["admin","staff"]},
     {id:16,routeAddress:'/partnergroup/addgroup', routeName:"N/A", userLevel:["admin","staff"]},
     {id:17,routeAddress:'/partnergroup/updategroup', routeName:"N/A", userLevel:["admin","staff"]},

     {id:20,routeAddress:'/transactiongroup/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:21,routeAddress:'/transactiongroup/deletegroup', routeName:"N/A", userLevel:["admin","staff"]},
     {id:22,routeAddress:'/transactiongroup/addgroup', routeName:"N/A", userLevel:["admin","staff"]},
     {id:23,routeAddress:'/transactiongroup/updategroup', routeName:"N/A", userLevel:["admin","staff"]},

     {id:26,routeAddress:'/partner/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:27,routeAddress:'/partner/deletecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:28,routeAddress:'/partner/addcustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:29,routeAddress:'/partner/updatecustom', routeName:"N/A", userLevel:["admin","staff"]},

     {id:33,routeAddress:'/transaction/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:34,routeAddress:'/transaction/deletetransaction', routeName:"N/A", userLevel:["admin","staff"]},
     {id:35,routeAddress:'/transaction/addtransaction', routeName:"N/A", userLevel:["admin","staff"]},
     {id:36,routeAddress:'/transaction/updatetransaction', routeName:"N/A", userLevel:["admin","staff"]},

     {id:39,routeAddress:'/transactionlog/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:40,routeAddress:'/transactionlog/deletecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:41,routeAddress:'/transactionlog/addcustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:42,routeAddress:'/transactionlog/updatecustom', routeName:"N/A", userLevel:["admin","staff"]},

     {id:45,routeAddress:'/basicdata/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:46,routeAddress:'/basicdata/deletecustom', routeName:"N/A", userLevel:["admin"]},
     {id:47,routeAddress:'/basicdata/addcustom', routeName:"N/A", userLevel:["admin"]},
     {id:48,routeAddress:'/basicdata/updatecustom', routeName:"N/A", userLevel:["admin"]},

     {id:52,routeAddress:'/product/getlimit', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:53,routeAddress:'/product/deletecustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:54,routeAddress:'/product/addcustom', routeName:"N/A", userLevel:["admin","staff"]},
     {id:55,routeAddress:'/product/updatecustom', routeName:"N/A", userLevel:["admin","staff"]},

     {id:58,routeAddress:'/tabletemplate/getcustom', routeName:"N/A", userLevel:["admin","staff","visitor"]},
     {id:59,routeAddress:'/tabletemplate/updatetabletemplate', routeName:"N/A", userLevel:["admin","staff","visitor"]},
    
    ]
}

//------------------------------------
//------------------------------------
const productInit={
    id:1,
    barcode:"1",
    name:"สายไฟ",
    groupId:1,
    groupName:"main",
    photoUrl1:["https://picsum.photos/200"],
    unit:"อัน",
    price:100,
    remark:"ของแท้",
    isRawMat:false,
    detail:[
        {id:1,
        barcode:"1",
        name:"mux",
        groupId:"1",
        groupName:"main",
        unit:"อัน",
        remark:"dee",
        isRawMat:false,
        quantity:10,
        price:100,
        result:1000
        },
        {id:2,
        barcode:"2",
        name:"stero",
        groupId:"1",
        groupName:"main",
        unit:"อัน",
        remark:"good",
        isRawMat:true,
        quantity:10,
        price:100,
        result:1000
        },
    ],
    //stock:100,
    //order:100,
    //plan:100
}
//-------------------------------------
const groupInit={
    id:1,
    mainGroup:null,
    parentGroup:[],
    groupName: "main",
    children:[],
    parentId:null,
}

// 
//
//-------------------------------------
const partnerInit={
    id:1,
    title:"นาย",
    name:"จิตติ",
    phone:["12345","67890"],
    photoUrl1:[""],     
    remark:"ของแท้",
    groupId:1,
    groupName:"ผู้ซื้อ",
    //partnerype:"ปกติ",
    address:[{
        number:"12",
        tambon:"หมี่แดง",
        district:"เวียงพิง",
        province:"เชียงของ",
        postcode:"12345"
    }],
}
//-----------------------------------
const partnerGroupInit={
    id:1,
    mainGroup:null,
    parentGroup:[],
    groupName: "main",
    children:[],
    parentId:null,
}
//-------------------------------
const transactionInit={
    id:1,
    date:"2018-01-21",
    groupName:"ใบจอง",
    groupId:"1",

    //transactionType:"งานซ่อม",
    //status:"open",
    
    effectStock:"คงที่",
    effectOrder:"เพิ่ม",
    effectPlan:"คงที่",

    photoUrl1:[""],

    partnerId:1,
    title:"นาย",
    name:"จิตติ",
    phone:["12345","67890"],

    address:{
        number:"12",
        tambon:"good",
        district:"bad",
        province:"well",
        postcode:"2345"
    },

    remark:"ของแท้",
    
    total:100,
    reduction:20,
    grandTotal:80,

    detail:[{
        id:1,
        barcode:"1",
        name:"สายพาน",
        groupId:1,
        groupName:"main",
        unit:"เส้น",
        price:100,
        quantity:1,
        result:100,
        remark:"ok",
        isRawMat:false
    }]
}
//--------------------------------------
const transactionGroupInit={
    id:1,
    mainGroup:null,
    parentGroup:[],
    groupName: "main",
    children:[],
    parentId:null,
    effectStock:"เพิ่ม",
    effectOrder:"เพิ่ม",
    effectPlan:"คงที่",
    transactionType:"ขาย"
}
//-----------------------------------
const transactionLogInit={
    id:1,
    date:"2018-01-21",
    groupName:"ใบจอง",
    groupId:"1",

    //transactionType:"งานซ่อม",
    //status:"open",
    
    effectStock:"คงที่",
    effectOrder:"เพิ่ม",
    effectPlan:"คงที่",

    photoUrl1:[""],

    partnerId:1,
    title:"นาย",
    name:"จิตติ",
    phone:["12345","67890"],

    address:{
        number:"12",
        tambon:"good",
        district:"bad",
        province:"well",
        postcode:"2345"
    },

    remark:"ของแท้",
    
    total:100,
    reduction:20,
    grandTotal:80,
    status:"close",
    detail:[{
        id:1,
        barcode:"1",
        name:"สายพาน",
        groupId:1,
        groupName:"main",
        unit:"เส้น",
        price:100,
        quantity:1,
        result:100,
        remark:"ok",
        isRawMat:false
    }]
}
//-----------------------------------------

const initData= {
                    shopInit,userInit,
                    basicDataInit,tableTemplate,
                    productInit,groupInit,
                    partnerInit,partnerGroupInit,
                    transactionInit,transactionGroupInit,transactionLogInit
                }



module.exports = initData;