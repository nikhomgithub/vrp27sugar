import React from 'react';

import PageComponent from '../../component/dataComponent/PageComponent.js'
import {MainContext} from '../../context/MainContext';

import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../../render/renderForm/FormTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import ModalComponent from '../../render/ModalComponent'

function Product() {
const {groupForm,productForm,
      }=FormTemplate
const {groupState,productState,
      }=StateTemplate
const {productFilter}=FilterTemplate
const {productInputState}=inputState

const [showGroupModal,setShowGroupModal]=React.useState(false)
const [showProductModal,setShowProductModal]=React.useState(false)

const {basicData,widthLeft,setWidthLeft,myheader,
      allTableTemplate
}=React.useContext(MainContext)

const [selectProduct,setSelectProduct]=React.useState(null)
const [selectGroup,setSelectGroup]=React.useState(null)

const [iconActionData,setIconActionData]=React.useState(null)
const [iconActionDataDetail,setIconActionDataDetail]=React.useState(null)

React.useEffect(()=>{
    if(selectGroup){
    setIconActionData({groupId:selectGroup.id,
                       groupName:selectGroup.groupName})
    }
},[selectGroup])

React.useEffect(()=>{
    if(selectProduct){
    setIconActionDataDetail(selectProduct)
    }
},[selectProduct])

return(
<div className="bgc-lightGray" style={{height:"100%",width:"100%"}}>
    {allTableTemplate
    ?<PageComponent
        basicData={basicData}
        dataForm={productForm}
        dataGroupForm={groupForm}
        dataState={productState}
        dataGroupState={groupState}
        dataFilter={productFilter}
        dataInputState={productInputState}
        groupTitle={"ประเภทสินค้า"}
        tableTitle={"รายการสินค้า"}
        addFormTitle={"เพิ่มสินค้า"}
        editFormTitle={"แก้ไขสินค้า"}
        tableHeadColor={"#B55A30"}
        detailTableHeadColor={"#FDAC53"}
        dataUrl={"product"}
        groupDataUrl={"group"}
        canDataChange={true}
        allTableTemplate={allTableTemplate}
        dataTableTemplateName={"productTableTemplate"}
        detailTableTemplateName={"productDetailTableTemplate"}
        iconAction={[
            ()=>setShowGroupModal(true),
            ()=>setShowProductModal(true),
        ]}
        iconActionData={iconActionData}
        iconActionDataDetail={iconActionDataDetail}

        widthLeft={widthLeft}
        setWidthLeft={setWidthLeft}
        myheader={myheader}
        totalSwapPage={2}
        swapPageOption={["group-table","table-detailTable"]}
        keyName={["photoUrl1"]}
    />
    :null
    }
    {showGroupModal
    ?<ModalComponent className="bd-red"
        funcCancel={()=>{
            setIconActionData({groupId:"",groupName:""})
            setShowGroupModal(false)
        }}
        funcOK={()=>setShowGroupModal(false)}
        children={
            <PageComponent
                dataGroupState={groupState}
                groupDataUrl={"group"}
                setSelectGroup={setSelectGroup}
                groupTitle={"ประเภทสินค้า"}
                myheader={myheader}
                totalSwapPage={1}
                swapPageOption={["group"]}
                canGroupChange={false}
            />
        }
    />
    :null
    }

    {showProductModal&&allTableTemplate
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
                allTableTemplate={allTableTemplate}
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
export default Product;