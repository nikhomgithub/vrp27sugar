const axios = require('axios')


const group2 = { "id": 2, "mainGroup": 2, "groupName": "two", "parentId": 1, "children": [], "parentGroup": [1] ,"shopId":"shopa"}
const group3 = { "id": 3, "mainGroup": 3, "groupName": "three", "parentId": 1, "children": [], "parentGroup": [1] ,"shopId":"shopa"}
const group4 = { "id": 4, "mainGroup": 4, "groupName": "four", "parentId": 1, "children": [], "parentGroup": [1] ,"shopId":"shopa"}


const group5 = { "id": 5, "mainGroup": 2, "groupName": "five", "parentId": 2, "children": [], "parentGroup": [1,2] ,"shopId":"shopa"}
const group6 = { "id": 6, "mainGroup": 2, "groupName": "six", "parentId": 5, "children": [], "parentGroup": [1,2,5] ,"shopId":"shopa"}

const group7 = { "id": 7, "mainGroup": 3, "groupName": "seven", "parentId": 3, "children": [], "parentGroup": [1,3] ,"shopId":"shopa"}
const group8 = { "id": 8, "mainGroup": 3, "groupName": "eight", "parentId": 7, "children": [], "parentGroup": [1,3,7] ,"shopId":"shopa"}
const group9 = { "id": 9, "mainGroup": 3, "groupName": "nine", "parentId": 3, "children": [], "parentGroup": [1,3] ,"shopId":"shopa"}
const group10 = { "id": 10, "mainGroup": 2, "groupName": "ten", "parentId": 2, "children": [], "parentGroup": [1,2] ,"shopId":"shopa"}
const group11 = { "id": 11, "mainGroup": 4, "groupName": "eleven", "parentId": 4, "children": [], "parentGroup": [1,4] ,"shopId":"shopa"}

const group12 = { "id": 12, "mainGroup": 2, "groupName": "twelve", "parentId": 5, "children": [], "parentGroup": [1,2,5] ,"shopId":"shopa"}

const group13 = { "id": 13, "mainGroup": 13, "groupName": "thirteen", "parentId": 1, "children": [], "parentGroup": [1] }


let myheader={headers: {'Content-Type': 'application/json'}}
const mainUrl="localhost"

const shopQry = {shopName:"shopa",password:"shopa"}
const userQry = {username:"usera",password:"usera"}

const getInit = async () => {
  try {

    const result1= await axios.post(`http://${mainUrl}/shop/shoplogin`,shopQry,myheader)
    
    const myheader1={ headers: {'Content-Type': 'application/json',
                        'Shopauthorization':`b ${result1.data.shopToken}`}
             }
    
    const result2= await axios.post(`http://${mainUrl}/user/login`,userQry,myheader1)

    const myheader2={ headers: {
        'Content-Type': 'application/json',
        'Shopauthorization':`b ${result1.data.shopToken}`,
        'Userauthorization':`b ${result2.data.userToken}`}
    }
    //console.log(myheader2)

    
    //await axios.get(`http://${mainUrl}/spgroup/init`,myheader1)

    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group2,myheader2)
    
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group3,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group4,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group5,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group6,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group7,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group8,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group9,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group10,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group11,myheader2)
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group12,myheader2)   
    await axios.post(`http://${mainUrl}/spgroup/addgroup`,group13,myheader2)   
    
    
  } catch (error) {
    console.log('error')
  }
}
console.log('add custom')
getInit()