const axios = require('axios')

const myheader={headers: {'Content-Type': 'application/json'}}

const mainUrl="localhost"

const bkDate="03_06_2021"

const qry = {shopName:"shopa",password:"shopa"}

const shopQry={...qry,filePath:`backupData/${bkDate}_shop.json`} 
const userQry={...qry,filePath:`backupData/${bkDate}_user.json`} 
const basicdataQry={...qry,filePath:`backupData/${bkDate}_basicdata.json`} 
const tableTemplateQry={...qry,filePath:`backupData/${bkDate}_tabletemplate.json`} 
const productQry={...qry,filePath:`backupData/${bkDate}_product.json`} 
const groupQry={...qry,filePath:`backupData/${bkDate}_group.json`} 

const partnerQry={...qry,filePath:`backupData/${bkDate}_partner.json`} 
const partnerGroupQry={...qry,filePath:`backupData/${bkDate}_partnergroup.json`} 

const transactionQry={...qry,filePath:`backupData/${bkDate}_transaction.json`} 
const transactionGroupQry={...qry,filePath:`backupData/${bkDate}_transactiongroup.json`} 
const transactionLogQry={...qry,filePath:`backupData/${bkDate}_transactionlog.json`} 

const getRestore = async () => {
  try {

    await axios.get(`http://${mainUrl}/shop/init`,myheader)
    await axios.post(`http://${mainUrl}/shop/restore`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/user/restore`,userQry,myheader)
    await axios.post(`http://${mainUrl}/basicdata/restore`,basicdataQry,myheader)
    await axios.post(`http://${mainUrl}/tabletemplate/restore`,tableTemplateQry,myheader)
    await axios.post(`http://${mainUrl}/product/restore`,productQry,myheader)
    await axios.post(`http://${mainUrl}/group/restore`,groupQry,myheader)

    await axios.post(`http://${mainUrl}/partner/restore`,partnerQry,myheader)
    await axios.post(`http://${mainUrl}/partnergroup/restore`,partnerGroupQry,myheader)
  
    await axios.post(`http://${mainUrl}/transaction/restore`,transactionQry,myheader)
    await axios.post(`http://${mainUrl}/transactiongroup/restore`,transactionGroupQry,myheader)
    await axios.post(`http://${mainUrl}/transactionlog/restore`,transactionLogQry,myheader)

  } catch (error) {
    console.log(error)
  }
}

console.log('test')
getRestore()