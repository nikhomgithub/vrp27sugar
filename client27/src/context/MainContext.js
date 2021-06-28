import React from 'react'
import axios from 'axios';
import StateTemplate from '../model/StateTemplate'
import StateUtil from '../model/StateUtil'
import ctUtil from '../util/ctUtil'
//import myheader from '../myheader'

const {basicDataState}=StateTemplate
const {genBlankState}=StateUtil
const {createTableTemplateForPage}=ctUtil

export const MainContext=React.createContext();

const MainContextProvider=(props)=>{
    console.log('MainContext')
    
    //==========================

    const [widthLeft,setWidthLeft]=React.useState(40)
 
    const [tokenSt,setTokenSt] = React.useState({
        reloadCheckToken:true,
        haveShopToken:false,
        haveUserToken:false,
        userName:null
    })

    const [basicDataSt,setBasicDataSt]=React.useState({
        reloadBasicData:true,
        basicData:null
    })



    const myheader={headers: {'Content-Type': 'application/json',
    'Shopauthorization':localStorage.getItem('shopauthorization'),
    'Userauthorization':localStorage.getItem('userauthorization')
    }}

 
    
    React.useEffect(()=>{
        const {
            reloadCheckToken,
            haveShopToken,
            haveUserToken,
            userName
        }=tokenSt
        
        let tempSt={...tokenSt}

        if(reloadCheckToken){

            if(localStorage.getItem('shopauthorization')){
                tempSt={...tempSt,haveShopToken:true}
            }
            else{
                tempSt={...tempSt,haveShopToken:false}
                localStorage.removeItem('userauthorization')
                localStorage.removeItem('username')
            }

            if(localStorage.getItem('userauthorization')&&
            localStorage.getItem('username')){
                
                tempSt={...tempSt,
                        haveUserToken:true,
                        userName:localStorage.getItem('username')
                    }
                }
            else{
                
                localStorage.removeItem('userauthorization')
                localStorage.removeItem('username')

                tempSt={...tempSt,
                    haveUserToken:false,
                    userName:null
                }
            }
            tempSt={...tempSt,
                reloadCheckToken:false
            }
            setTokenSt(tempSt)
        }
    },[tokenSt])

    React.useEffect(()=>{  
        const {reloadBasicData,basicData}=basicDataSt
        let tempSt={...basicDataSt}
        if(reloadBasicData){

            if(localStorage.getItem('shopauthorization')&&
               localStorage.getItem('userauthorization')
            //to ensure user&shop token in place before request to server
            ){
                axios.post('/basicdata/getcustom',
                {},myheader
                )
                .then(result=>{
                    //console.log(`MainContext: basicData: '/basicdata/getcustom'`)
                    //console.log(result.data.data[0])
                    tempSt={...tempSt,
                        reloadBasicData:false,
                        basicData:result.data.data[0]
                    }
                    setBasicDataSt(tempSt)
                    //console.log(result.data.data[0])
                })
                .catch(err=>{
                    //console.log(err)
                    tempSt={...tempSt,
                        reloadBasicData:false
                    }
                    setBasicDataSt(tempSt)
                })
            }
        }
    },[basicDataSt])
    
//=========================================
//==================================
return(
        <MainContext.Provider value={
            {
               //allTableTemplate,
               //reloadTableTemplate,setReloadTableTemplate,
               myheader,
               tokenSt,setTokenSt,
               basicDataSt,setBasicDataSt,
               widthLeft,setWidthLeft
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;
