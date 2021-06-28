import React from 'react';

import PageComponent from '../../component/dataComponent/PageComponent.js'
import {MainContext} from '../../context/MainContext';

import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../../render/renderForm/FormTemplate'
import FilterTemplate from '../../render/renderFilter/FilterTemplate'
import inputState from '../../component/table/inputState'
import ModalComponent from '../../render/ModalComponent'

function Partner() {
const {partnerForm,partnerGroupForm}=FormTemplate
const {partnerState,partnerGroupState}=StateTemplate
const {partnerFilter}=FilterTemplate
const {partnerInputState}=inputState

const [showGroupModal,setShowGroupModal]=React.useState(false)

const {basicData,widthLeft,setWidthLeft,myheader,allTableTemplate}=React.useContext(MainContext)

const [selectGroup,setSelectGroup]=React.useState(null)

const [iconActionData,setIconActionData]=React.useState(null)

React.useEffect(()=>{
    if(selectGroup){
    setIconActionData({groupId:selectGroup.id,
                       groupName:selectGroup.groupName})
    }
},[selectGroup])


return(
<div className="bgc-lightGray" style={{height:"100%",width:"100%"}}>
    {allTableTemplate
    ?<PageComponent
        basicData={basicData}
        dataForm={partnerForm}
        dataGroupForm={partnerGroupForm}
        dataState={partnerState}
        dataGroupState={partnerGroupState}
        dataFilter={partnerFilter}
        dataInputState={partnerInputState}
        groupTitle={"ประเภทคู่ค้า"}
        tableTitle={"รายการคู่ค้า"}
        addFormTitle={"เพิ่มคู่ค้า"}
        editFormTitle={"แก้ไขคู่ค้า"}
        tableHeadColor={"#0072B5"}
        detailTableHeadColor={"#9BB7D4"}
        dataUrl={"partner"}
        groupDataUrl={"partnergroup"}
        canDataChange={true}
        allTableTemplate={allTableTemplate}
        dataTableTemplateName={"partnerTableTemplate"}
        iconAction={[()=>setShowGroupModal(true),]}
        iconActionData={iconActionData}
        widthLeft={widthLeft}
        setWidthLeft={setWidthLeft}
        myheader={myheader}
        totalSwapPage={1}
        swapPageOption={["group-table"]}
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
                dataGroupState={partnerGroupState}
                groupDataUrl={"partnergroup"}
                setSelectGroup={setSelectGroup}
                groupTitle={"ประเภทคู่ค้า"}
                myheader={myheader}
                totalSwapPage={1}
                swapPageOption={["group"]}
                canGroupChange={false}
            />
        }
    />
    :null
    }

</div>
)

}
export default Partner;
