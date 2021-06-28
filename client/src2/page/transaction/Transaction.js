import React from 'react';

import PageComponent from '../../component/dataComponent/PageComponent.js'
import {MainContext} from '../../context/MainContext';

import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../../render/renderForm/FormTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import ModalComponent from '../../render/ModalComponent'
import CardTemplate from '../../component/card/CardTemplate'
//import './App2.css'

function Transaction() {
const {groupForm,productForm,
       partnerForm,partnerGroupForm,
       transactionForm,transactionGroupForm
      }=FormTemplate
const {groupState,productState,
       partnerState,partnerGroupState,
       transactionState,transactionGroupState 
      }=StateTemplate
const {productFilter,partnerFilter,transactionFilter}=FilterTemplate
const {productInputState,partnerInputState,transactionInputState}=inputState
const {transactionCard}=CardTemplate
//=======================================
const [isSecond,setIsSecond]=React.useState(false)
React.useEffect(()=>{
    if(!isSecond){
        setIsSecond(true)
    }
},[isSecond])    

//=======================================
const [showTransactionGroupModal,
    setShowTransactionGroupModal]=React.useState(false)
const [showPartnerModal,setShowPartnerModal]=React.useState(false)
const [showProductModal,setShowProductModal]=React.useState(false)

const {basicData,widthLeft,setWidthLeft,myheader,allTableTemplate}=React.useContext(MainContext)

const [selectTransactionGroup,setSelectTransactionGroup]=React.useState(null)
const [selectPartner,setSelectPartner]=React.useState(null)
const [selectProduct,setSelectProduct]=React.useState(null)


const [iconActionData,setIconActionData]=React.useState(null)
const [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)

React.useEffect(()=>{
    if(selectTransactionGroup){
    setIconActionData({groupId:selectTransactionGroup.id,
                       groupName:selectTransactionGroup.groupName,
                       effectStock:selectTransactionGroup.effectStock, // กระทบสต็อก
                       effectOrder:selectTransactionGroup.effectOrder, // กระทบจอง
                       effectPlan:selectTransactionGroup.effectPlan // กระทบแผน
                   
                    })
    }
},[selectTransactionGroup])

React.useEffect(()=>{
    if(selectPartner){
    setIconActionData({partnerId:selectPartner.id,
                       title:selectPartner.title,
                       name:selectPartner.name,
                       phone:selectPartner.phone,
                       address:selectPartner.address
                    })
    }
},[selectPartner])

React.useEffect(()=>{
    if(selectProduct){
    setIconActionDataDetail(selectProduct)
    }
},[selectProduct])

const transactionCalculation=(formInputState)=>{
    const {total,reduction,grandTotal,detail}=formInputState
    
    let tempTotal = 0
    let tempDetail=[]

    detail.map(i=>{
        const roundQuantity=parseInt(i.quantity*100)
        const roundPrice=parseInt(i.price*100)
        const tempResult=roundQuantity*roundPrice

        tempTotal=tempTotal+tempResult

        const tempObj={...i,["result"]:tempResult/10000}
        
        tempDetail=[...tempDetail,tempObj]
    })
    const roundReduction=parseInt(reduction*10000)

    const tempGrandTotal=(tempTotal-roundReduction)/10000
    let tempFormInputState={...formInputState,
                            ["detail"]:tempDetail,
                            ["total"]:tempTotal/10000,
                            ["grandTotal"]:tempGrandTotal}
    return tempFormInputState
}

return(
<div className="bgc-lightGray" style={{height:"100%",width:"100%"}}>
    <PageComponent
        basicData={basicData}
        dataForm={transactionForm}
        dataGroupForm={transactionGroupForm}
        dataState={transactionState}
        dataState={transactionState}
        dataGroupState={transactionGroupState}
        dataFilter={transactionFilter}
        dataInputState={transactionInputState}
        groupTitle={"ประเภทธุรกรรม"}
        tableTitle={"รายการธุรกรรม"}
        detailTableTitle={"รายการสินค้า"}
        graphTitle={"กราฟข้อมูลธุรกรรม"}
        addFormTitle={"เพิ่มข้อมูลธุรกรรม"}
        editFormTitle={"แก้ไขข้อมูลธุรกรรม"}
        
        tableHeadColor={"#F7786B"}
        detailTableHeadColor={"#F7CAC9"}
        graphColor={"#FF6F61"}
        graphDetailKey={"name"}
        dataUrl={"transaction"}
        groupDataUrl={"transactiongroup"}
        canDataChange={true}
        allTableTemplate={allTableTemplate}
        dataTableTemplateName={"transactionTableTemplate"}
        detailTableTemplateName={"productDetailTableTemplate"}

        calculation={transactionCalculation}
        iconAction={[()=>setShowTransactionGroupModal(true),
                     ()=>setShowPartnerModal(true),
                     ()=>setShowProductModal(true),
                    ]}
        iconActionData={iconActionData}
        iconActionDataDetail={iconActionDataDetail}
        widthLeft={widthLeft}
        setWidthLeft={setWidthLeft}
        cardTemplate={transactionCard}
        cardTitle={"แสดงธุรกรรมอัตโนมัติ"}
        intervalTime={4000}
        myheader={myheader}
        totalSwapPage={4}
        swapPageOption={["group-table","table-detailTable","table-graph","card"]}
        keyName={["photoUrl1"]}
    />

    {showTransactionGroupModal
    ?<ModalComponent className="bd-red"
        funcCancel={()=>{
            setIconActionData({
                groupId:"",groupName:"",
                effectStock:"คงที่",effectOrder:"คงที่",effectPlan:"คงที่",
            })
            setShowTransactionGroupModal(false)
        }}
        funcOK={()=>setShowTransactionGroupModal(false)}
        children={
            <PageComponent
                dataGroupState={transactionGroupState}
                groupDataUrl={"transactiongroup"}
                groupTitle={"ประเภทธุรกรรม"}
                setSelectGroup={setSelectTransactionGroup}
                myheader={myheader}
                totalSwapPage={1}
                swapPageOption={["group"]}
                canGroupChange={false}
            />
        }
    />
    :null
    }




    {showPartnerModal
    ?<ModalComponent className="bd-red"
        funcCancel={()=>{
            setIconActionData({partnerId:"",
                title:"",
                name:"",
                phone:[],
                address:[]

             })
            setShowPartnerModal(false)
        }}
        funcOK={()=>setShowPartnerModal(false)}

        children={
            <PageComponent
                basicData={basicData}
                dataForm={partnerForm}

                dataForm={partnerForm}
                dataGroupForm={partnerGroupForm}
                dataState={partnerState}
                dataGroupState={partnerGroupState}
                dataFilter={partnerFilter}
                dataInputState={partnerInputState}
                groupTitle={"ประเภทคู่ค้า"}
                tableTitle={"ตารางคู่ค้า"}
                graphTitle={"กราฟข้อมูลคู่ค้า"}
                addFormTitle={"เพิ่มข้อมูลคู่ค้า"}
                editFormTitle={"แก้ไขข้อมูลคู่ค้า"}
                tableHeadColor={"#6B5B95"}
                detailTableHeadColor={"#34568B"}
                graphColor={"#FF6F61"}
                graphDetailKey={"name"}
                dataUrl={"partner"}
                groupDataUrl={"partnergroup"}

                canDataChange={false}
                allTableTemplate={allTableTemplate}

                dataTableTemplateName={"partnerTableTemplate"}
                setSelectData={setSelectPartner}
                widthLeft={widthLeft}
                setWidthLeft={setWidthLeft}
                myheader={myheader}
                totalSwapPage={1}
                swapPageOption={["group-table"]}            
            />
        }
    />
    :null
    }

    {showProductModal
     ?<ModalComponent className="bd-red"
        funcOK={()=>setShowProductModal(false)}
        children={
            <PageComponent
                basicData={basicData}
                dataForm={productForm}
                dataGroupForm={groupForm}
                dataState={productState}
                dataGroupState={groupState}
                dataFilter={productFilter}
                dataInputState={productInputState}
                groupTitle={"กลุ่มสินค้า"}
                tableTitle={"ตารางสินค้า"}
                tableHeadColor={"#6B5B95"}
                dataUrl={"product"}
                groupDataUrl={"group"}
                canDataChange={false}
                dataTableTemplateName={"productTableTemplate"}
                detailTableTemplateName={"productDetailTableTemplate"}
                setSelectData={setSelectProduct}
                widthLeft={widthLeft}
                setWidthLeft={setWidthLeft}
                myheader={myheader}
                totalSwapPage={1}
                swapPageOption={["group-table"]}
            />
     }
    />

    :null
    }
</div>
)

}
export default Transaction;