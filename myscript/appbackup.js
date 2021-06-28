const axios = require('axios')

const myheader={headers: {'Content-Type': 'application/json'}}

const mainUrl="localhost:3001"

const shopQry = {shopName:"shopa",password:"shopa"}


const getBackup = async () => {
  try {

    await axios.post(`http://${mainUrl}/shop/backup`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/user/backup`,shopQry,myheader)

    await axios.post(`http://${mainUrl}/basicdata/backup`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/tabletemplate/backup`,shopQry,myheader)

    await axios.post(`http://${mainUrl}/product/backup`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/group/backup`,shopQry,myheader)

    await axios.post(`http://${mainUrl}/partner/backup`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/partnergroup/backup`,shopQry,myheader)

    await axios.post(`http://${mainUrl}/transaction/backup`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/transactionlog/backup`,shopQry,myheader)
    await axios.post(`http://${mainUrl}/transactiongroup/backup`,shopQry,myheader)
  } catch (error) {
    console.log(error)
  }
}

console.log('test')
getBackup()