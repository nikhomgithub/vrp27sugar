const validationTemplate =require('../middleware/validation/validationTemplate')
const initData = require('../data/initData/initData')
//const restoreData = require('../data/restoreData/restoreData')

const backupFolder='./data/backupData/'

const shop={
    modal:'../modals/Auth',
    initData:initData.shopInit,
    //restoreData:restoreData.shopRestore,
    backupFolder:backupFolder,
    //addLimit:5,
    tokenName:"shopToken",
    routeName:"shop",
    folder:"spupload/shop",
    valTemplate:validationTemplate.shop
}
const user={
    modal:'../modals/Auth',
    initData:initData.userInit,
    //restoreData:restoreData.userRestore,
    backupFolder:backupFolder,
    //addLimit:5,
    tokenName:"userToken",
    routeName:"user",
    folder:"spupload/user",
    valTemplate:validationTemplate.user
}
const basicData={
    modal:'../modals/BasicData',
    initData:initData.basicDataInit,
    //restoreData:restoreData.basicDataRestore,
    backupFolder:backupFolder,
    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"basicdata",
    folder:"spupload/basicdata",
    valTemplate:validationTemplate.basicData
}
const tableTemplate={
    modal:'../modals/TableTemplate',
    initData:initData.tableTemplate,
    //restoreData:restoreData.tableTemplateRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"tabletemplate",
    folder:"spupload/tabletemplate",
    valTemplate:null
}
const product={
    modal:'../modals/Product',
    initData:initData.productInit,
    //restoreData:restoreData.productRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"product",
    folder:"spupload/product",
    valTemplate:validationTemplate.product
}
const group={
    modal:'../modals/Group',
    initData:initData.groupInit,
    //restoreData:restoreData.groupRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"group",
    folder:"spupload/group",
    valTemplate:validationTemplate.group
}
const partner={
    modal:'../modals/Partner',
    initData:initData.partnerInit,
    //restoreData:restoreData.partnerRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"partner",
    folder:"spupload/partner",
    valTemplate:validationTemplate.partner
}
const partnerGroup={
    modal:'../modals/PartnerGroup',
    initData:initData.partnerGroupInit,
    //restoreData:restoreData.partnerGroupRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"partnergroup",
    folder:"spupload/partnergroup",
    valTemplate:validationTemplate.partnerGroup
}
const transaction={
    modal:'../modals/Transaction',
    initData:initData.transactionInit,
    //restoreData:restoreData.transactionRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"transaction",
    folder:"spupload/transaction",
    valTemplate:validationTemplate.transaction
}
const transactionGroup={
    modal:'../modals/TransactionGroup',
    initData:initData.transactionGroupInit,
    //restoreData:restoreData.transactionGroupRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"transactiongroup",
    folder:"spupload/transactiongroup",
    valTemplate:validationTemplate.transactionGroup
}
const transactionLog={
    modal:'../modals/TransactionLog',
    initData:initData.transactionLogInit,
    //restoreData:restoreData.transactionLogRestore,
    backupFolder:backupFolder,

    //dateIn: "2012-10-10"
    //addLimit:5,
    tokenName:"",
    routeName:"transactionlog",
    folder:"spupload/transactionlog",
    valTemplate:null
}


const params={shop,user,basicData,tableTemplate,
             product,group,partner,partnerGroup,
             transaction,transactionGroup,transactionLog}

module.exports=params