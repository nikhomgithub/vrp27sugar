const axios = require('axios')

let myheader={headers: {'Content-Type': 'application/json'}}

const mainUrl="localhost:3001"

const shopQry = {shopName:"shopa",password:"shopa"}

const getInit = async () => {
  try {

    await axios.get(`http://${mainUrl}/shop/init`,myheader)
    console.log('getInit')
    const result= await axios.post(`http://${mainUrl}/shop/shoplogin`,shopQry,myheader)
    

    myheader={ headers: {'Content-Type': 'application/json',
                        'Shopauthorization':`b ${result.data.shopToken}`}
             }
              
    
    await axios.get(`http://${mainUrl}/user/init`,myheader)
    
    await axios.get(`http://${mainUrl}/basicdata/init`,myheader)
    await axios.get(`http://${mainUrl}/product/init`,myheader)
    await axios.get(`http://${mainUrl}/group/init`,myheader)
    await axios.get(`http://${mainUrl}/partner/init`,myheader)
    await axios.get(`http://${mainUrl}/partnergroup/init`,myheader)

    await axios.get(`http://${mainUrl}/transaction/init`,myheader)
    await axios.get(`http://${mainUrl}/transactiongroup/init`,myheader)
    await axios.get(`http://${mainUrl}/transactionlog/init`,myheader)
    
  } catch (error) {
    console.log('error')
  }
}

console.log('test')
getInit()