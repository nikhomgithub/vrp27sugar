import React from 'react';
import axios from 'axios';

import testTemplate from './testTemplate'
//===============================
//import renderModalError from './render/renderModalError'
import ModalConfirm from '../ModalConfirm'
import Tree from './Tree'
import treeUtil from './treeUtil'
import {MainContext} from '../../context/MainContext';
import ModalOfTree from './ModalOfTree'
import axiosUtil from '../../util/axiosUtil'
import renderModalError from '../renderModalError'
import StateTemplate from '../../model/StateTemplate'
import FormTemplate from '../../render/renderForm/FormTemplate'
import ModalForm from '../../render/renderForm/ModalForm'
import { de } from 'date-fns/locale';

const {genArrayForFilterAxios,genFD,addFileNameInPhotoUrl,catchErrorToMessage}=axiosUtil

const {convertToObject,createGroupTree,findAllChildrenId,findAllChildrenByGroupTree,
       openAllParentId} = treeUtil

const {groupState,testData}=testTemplate

function AppTree() {

console.log('AppTree')

const groupDataUrl = "spgroup"

const {myheader}=React.useContext(MainContext)

const [groupSt,setGroupSt]=React.useState({
    reloadGroup:true,
    groupTree:null,
    openArray:[1],
    tempObj:null,
    mainGroup:null,
    lastRecordGroup:{id:0},
    showError:false,
    message:null,
    showAdd:false,
    showEdit:false,
    showConfirm:false,
    allDeleteId:[]
})

const [editGroup,setEditGroup]=React.useState(null)          
const [editData,setEditData]=React.useState(null)



//=====================================================


const changeKeyInData=({data,id,key,value,openArray})=>{
  //console.log('changeKeyInData')
  //console.log(openArray)

  let tempArray=[]
  openArray.map((i,idx)=>{
      if(i!=id){
        tempArray=[...tempArray,i]
      }
   
  })
  tempArray=[...tempArray,id]

  let tempData=[]
  if(data){
    data.map(i=>{
        if (i.id==id){
            tempData=[...tempData,{...i,[key]:value}]
        }else{
            tempData=[...tempData,i]
        }
    })
  //setData([...tempData])
  }
  //console.log('000df0df')
  //console.log(tempArray)

  return {groupTree:tempData,openArray:tempArray}
}   


const reloadAxiosGroup=({mainGroup,openArray})=>{
  console.log('reloadAxios')

  let qry={$or:[{parentId:1},{id:1}]}

  if(mainGroup>0){
    qry={$or:[{parentId:1},{id:1},{mainGroup}]}
  }
  
  let tempOpenArray = [1]
  if(mainGroup>1){
    tempOpenArray=[1,mainGroup]
  }
  //console.log('openArray')
  //console.log(openArray)
  if(openArray){
    tempOpenArray=openArray
  }

  if(groupDataUrl){
      axios.post(`/${groupDataUrl}/getcustom`,qry,myheader)
      .then(result=>{
          //console.log('...........')
          //console.log(groupSt)  
        
          const temp= createGroupTree({group:result.data.data,openArrayIn:tempOpenArray})
          const groupTree=temp.groupTree
          const openArray=temp.openArray
          
          //setReloadGroup(false)
          let tempSt = { ...groupSt,
            groupTree: groupTree,
            openArray: openArray,
            tempObj:convertToObject(groupTree,groupState),
            lastRecordGroup: {id:result.data.lastRecordId},
            reloadGroup:false,
            showAdd:false,
            showEdit:false,
            showConfirm:false,
            mainGroup
          }

          setGroupSt(tempSt)
      })
      .catch(error=>{
          catchErrorToMessage(error,(value)=>{setGroupSt({...groupSt,message:value})})
          //setMessage(error.response.data.message)
          const tempSt={...groupSt,
            reloadGroup:false,
            showError:true
          }
          console.log(tempSt)
          //setGroupSt(tempSt)
          //setReloadGroup(false)
      })
  } 
}
//=================================
const deleteAxiosGroup=(id,parentId,allDeleteId)=>{
  
  const qry = {id,parentId,allDeleteId}

  if(groupDataUrl){
    axios.post(`/${groupDataUrl}/deletegroup`,qry,myheader)
    .then(result=>{ 
      reloadAxiosGroup({mainGroup:groupSt.mainGroup,openArray:groupSt.openArray})
    } )
    .catch(error=>{
      catchErrorToMessage(error,(value)=>{setGroupSt({...groupSt,message:value})})
    })
  }
}

const addAxiosGroup = (formInputState)=>{

  const qry = formInputState
  // id,groupName,
  //parentId,mainGroup,parentGroup
  //children
  if(groupDataUrl){
    axios.post(`/${groupDataUrl}/addgroup`,qry,myheader)
    .then(result=>{ 
      reloadAxiosGroup({mainGroup:groupSt.mainGroup,openArray:groupSt.openArray})
    } )
    .catch(error=>{
      showErrorModal()
    })
  }

}
//=================================
const folderOpenFunc=(i)=>{
  if(i.id>1){
    const {groupTree}=groupSt
    const temp = changeKeyInData({data:groupTree,id:i.id,key:"open",value:false,openArray:groupSt.openArray})
    const temp2 = convertToObject(temp.groupTree,groupState)
    const tempSt={...groupSt,tempObj:temp2,groupTree:temp.groupTree,openArray:temp.openArray}
    setGroupSt(tempSt)
  }
}
const folderClosePlusFunc=(i)=>{

  if(i.parentId!=1){
    const {groupTree}=groupSt
    const temp = changeKeyInData({data:groupTree,id:i.id,key:"open",value:true,openArray:groupSt.openArray})
    const temp2 = convertToObject(temp.groupTree,groupState)
    const tempSt={...groupSt,tempObj:temp2,groupTree:temp.groupTree,openArray:temp.openArray}
    setGroupSt(tempSt)
  }
  else {
    reloadAxiosGroup({mainGroup:i.id,openArray:null})
  } 
  
}
const folderCloseFunc=(i)=>{

  if(i.parentId!=1){
    const {groupTree}=groupSt
    const temp = changeKeyInData({data:groupTree,id:i.id,key:"open",value:true,openArray:groupSt.openArray})
    const temp2 = convertToObject(temp.groupTree,groupState)
    const tempSt={...groupSt,tempObj:temp2,groupTree:temp.groupTree,openArray:temp.openArray}
    setGroupSt(tempSt)
  }
  else {
    reloadAxiosGroup({mainGroup:i.id,openArray:null})
  } 

}
const pOpenFunc=(i)=>{
  
  console.log(`filterGroup : ${i.id}`)

  if(i.mainGroup==groupSt.mainGroup){
    const {folders,...remaining}=i
    setEditGroup(remaining)
  }


  //setselectGroupObjectId(i.id)
  //setEditGroup(i)
}
const pCloseFunc=(i)=>{
  console.log(`filterGroup : ${i.id}`)

  if(i.mainGroup==groupSt.mainGroup){
    const {folders,...remaining}=i
    setEditGroup(remaining)
  }

}

const hideConfirmModal=()=>{
  const temp = {...groupSt,showConfirm:false}
  setGroupSt(temp)
}

const hideErrorModal=()=>{
  const temp = {...groupSt,showError:false}
  setGroupSt(temp)
}

const hideEditModal=()=>{
    const temp={...groupSt,showEdit:false}
    setGroupSt(temp)
}

const hideAddModal=()=>{
  const temp={...groupSt,showAdd:false}
  setGroupSt(temp)
}

const showErrorModal=()=>{
    const temp = {...groupSt,showError:true}
    setGroupSt(temp)
}

const showDelModal=()=>{
  if(editGroup.mainGroup==groupSt.mainGroup){
    const temp = {...groupSt,showConfirm:true}
    setGroupSt(temp)
  }
}

const showAddModal=()=>{
  const temp = {...groupSt,showAdd:true}
  setGroupSt(temp)
}

const showEditModal=()=>{
  const temp = {...groupSt,showEdit:true}
  setGroupSt(temp)
}

const delFunc=()=>{
  console.log('delFunc')
  const temp=findAllChildrenByGroupTree(editGroup.id,groupSt.groupTree)
  const id=editGroup.id
  const parentId=editGroup.parentId
  const allDeleteId=temp.allDeleteId
  deleteAxiosGroup(id,parentId,allDeleteId)
}

const addFunc=(formInputState)=>{
  console.log('addFunc')
  addAxiosGroup(formInputState)
}



const editFunc=(formInputState)=>{
  let {id,newId,parentId,newParentId,mainGroup,parentGroup} = formInputState
  //สองค่านี้อยู่ในฟอร์มต้องเปลี่ยนเป็นตัวเลข 
  newId = parseInt(newId)
  newParentId = parseInt(newParentId) 
  //ปรับแก้ค่าใน formInputStte ที่เป็นสตริงให้เป็น number 
  let newFormInputState = {...formInputState,newId,parentId}

  console.log('editFunc')



  const editIdChange=()=>{
    if(newId<=1){
      //error  
    }
    let newMainGroup=null
    if(parentId==1){ newMainGroup=newId }
    else{ newMainGroup=mainGroup }
    newFormInputState= {...newFormInputState,newMainGroup}

    const temp=findAllChildrenByGroupTree(id,groupSt.groupTree)
    const allChildrenId=temp.allDeleteId
    let tempAllChilden=temp.allDeleteObject

    let newAllChildren = []

    tempAllChilden.map((i,idx)=>{
      if(idx>0){  //ไม่เอาตัวเราเอง
        let temp=[]  //ไว้จัดเก็บ parentGroup ใหม่ ของลูกๆ 
        i.parentGroup.map(j=>{
          if(j==id){
            temp=[...temp,newId]
          }
          else{
            temp=[...temp,j]
          }
        })
        const newParentIdOfChildren=temp[temp.length-1]
        const newI={...i,
          mainGroup:newMainGroup,
          parentId:newParentIdOfChildren,
          parentGroup:temp
        }
        newAllChildren=[...newAllChildren,newI]
      }
    }) 
    console.log('-------------')
    console.log(newFormInputState)
    console.log(newAllChildren)
    console.log(allChildrenId)
  }

  //4................................
  if( (newId!=id)&&(newParentId!=parentId) ){

  }
  else if(id!=newId){
    if(newId>1){
      let newMainGroup=null
      if(parentId==1){ newMainGroup=newId }
      else{ newMainGroup=mainGroup }
      newFormInputState= {...newFormInputState,newMainGroup}

      const temp=findAllChildrenByGroupTree(id,groupSt.groupTree)
      const allChildrenId=temp.allDeleteId
      let tempAllChilden=temp.allDeleteObject

      let newAllChildren = []

      tempAllChilden.map((i,idx)=>{
        if(idx>0){  //ไม่เอาตัวเราเอง
          let temp=[]  //ไว้จัดเก็บ parentGroup ใหม่ ของลูกๆ 
          i.parentGroup.map(j=>{
            if(j==id){
              temp=[...temp,newId]
            }
            else{
              temp=[...temp,j]
            }
          })
          const newParentIdOfChildren=temp[temp.length-1]
          const newI={...i,
            mainGroup:newMainGroup,
            parentId:newParentIdOfChildren,
            parentGroup:temp
          }
          newAllChildren=[...newAllChildren,newI]
        }
      }) 

      console.log('-------------')
      console.log(newFormInputState)
      console.log(newAllChildren)
      console.log(allChildrenId)

    }
  }
  else if(parentId!=newParentId){
    //test 5, parentId=
    let myParent = {id:5,groupName:"five",mainGroup:2,parentId:2,parentGroup:[1,2],children:[15,21]}
    let myNewParent = {id:9,groupName:"nine",mainGroup:3,parentId:3,parentGroup:[1,3],children:[9]}
    myParent.children=[10]
    myNewParent.children=[9,5]

    if( (newParentId>1) && (parentId!=1) ){
      let newMainGroup= myNewParent.mainGroup


    }  
  }
  else {

  }

 
  //ที่ส่งไป server คือ newId,newMianGroup, newAllChildren ==> เปลี่ยน mainGroup,parentId,parentGroup
  //ที่ server ต้อง เอา children แล้วทำการลบ เรคคอร์ด ของ children ออก และ เพิ่ม newAllChildreng เข้าไป  
  //server ต้องจบกระบวนการนี้ก่อน ถึงเริ่มทำอันหลัง 
  //.......................................

  
  //การเปลี่ยน parent
  //ถ้า ตัวเรา parentId = 1 เปลี่ยนไม่ได้
  //new parentId ต้อง > 1 เสมอ 
  

  //ต้องเปลี่ยน mainGroup เรา ตาม  new parent เสมอ เราเก็บค่าใน newMainGroup 

  //ที่ parent ต้อง ดึง id เรา ออกจาก children
  //ที่ new parent ต้อง ใส่ id เรา เข้าไปใน children
  //ที่ new parent ต้อง การ parentGroup มาแทน อันเก่า ในตัวของเรา

  //จาก  [1,2,4] เป็น [1,3] คือเปลี่ยนจาก parentId = 4 เป็น newParentID = 3
  //ใน childrn ของเราทั้งหมด ก็ต้องเปลี่ยน parentGroup กับ 
  //ใน childrn ของเราทั้งหมด ก็ต้องเปลี่ยน mainGroup เป็นของ mainGroup ของตัวแม่ เรา  
  //let myParent = {id:2,groupName:"two",mainGroup:2,parentId:1,parentGroup:[1],children:[5,10]}
  //let myNewParent = {id:3,groupName:"three",mainGroup:3,parentId:1,parentGroup:[1],children:[9]}
  
  // เปลี่ยน parent จาก 5>9 ตัวเรา คือ 15
  let myParent = {id:5,groupName:"five",mainGroup:2,parentId:2,parentGroup:[1,2],children:[15,21]}
  let myNewParent = {id:9,groupName:"nine",mainGroup:3,parentId:3,parentGroup:[1,3],children:[9]}

  //ถ้าเปลี่ยน parentId 
  //ผลต่อ parentId => newParentId, 
  //ผลต่อ mainGroup = > newMainGroup
  //ผลต่อ parentGroup = > newParentGroup 
  if( (newParentId>1) && (parentId!=1) && (newParentId != parentId) ){
      //newMainGroup เรา เท่ากับของ perent ใหม่เสมอ
      let newMainGroup= myNewParent.mainGroup
  
      //แก้ไข children ของ parent เก่า
      myParent.children=[10]

      //เพิ่ม id เราเข้าไปใน childrent ของ แม่ใหม่เสมอ
      myNewParent.children=[9,5]
      //เปลี่ยน parentGroup เราให้เหมือนกับ กับ ของ newParent แล้วเพิ่ม id ของ new Parent เข้าไป 
      let newParentGroup = [...myNewParent.parentGroup,myNewParent.id]
      //newParentGroup[newParentGroup.length-1]=newParentId
      //console.log(newParentGroup)
      //console.log('my new arentGroup')
      //console.log(newParentGroup)

      let newFormInputState={...formInputState,newMainGroup,newParentGroup}

      //สรุป
      //สิ่งที่เราสนในตัวของเรา เมือเปลี่ยน parent 
      //newMainGroup,newParentId,newParentGroup
      //ส่วนตัวแม่เก่า คือ children
      //ส่วนตัวแม่ใหม่ คือ children
      //ส่วนตัวลูกๆ เรา คือ parentGroup,mainGroup,

      const temp=findAllChildrenByGroupTree(id,groupSt.groupTree)
      let tempAllChilden=temp.allDeleteObject

      //console.log('tempAllChildren')
      //console.log(tempAllChilden)

      let newAllChildren = []


      tempAllChilden.map((i,idx)=>{
        //ไม่เอาตัวเราเอง
        if(idx>0){ 

          //temp ไว้จัดเก็บ parentGroup ใหม่ ของลูกๆ 
          let temp=[]
          //loop ใน parentGroup ของตัวลูกๆ 
          let isIdMatch=false
          i.parentGroup.map(j=>{

            //จนกระทั่งเจอ id ของเรา
            if(j==id){
              isIdMatch=true
            }
            //เริ่มจัดกับตั้งแต่ id เราเป็นต้นไป 
            if(isIdMatch){
              temp=[...temp,j]
            }
            
          })
  


          //ใช้ newParentGroup ตัวเรา ผสมกับ temp ที่ทำมาใหม่ 
          temp=[...newParentGroup,...temp]

          const newI={...i,
            mainGroup:newMainGroup,
            parentGroup:temp
          }
          
          //ได้แล้วก็รวบรวม ทุกอัน ไว้ใน newAllChildren
          newAllChildren=[...newAllChildren,newI]
  
  
        }
      }) 

      console.log('newFormInputState')
      console.log(newFormInputState)
      
      console.log('newAllChildren')
      console.log(newAllChildren)

  }
}

//ในฝั่ง server 
//เมื่อเรา แก้ id ตัวเรา 
//เราส่ง id , newId, mainGroup, newMainGroup 
//สิ่งที่เราส่งไป 
//console.log(newFormInputState)
//console.log(newAllChildren)
//สิ่งที่ server เอาไปทก รับ formInputState กับ newAllChildren ไป
//ทำการอัพเดต โดย ให้ {...formInputState,id:newId,mainGroup:newMainGroup,}
//ทำการค้นหา ค่า parent ทำการเปลี่ยน childrent ของ parent โดยเอา id เก่าเราออก แล้ว ใส่ id ใหม่เข้าไป

const refreshFunc=()=>{
  reloadAxiosGroup({mainGroup:null,openArray:null})
}

//==================================
React.useEffect(()=>{
  if(groupSt.reloadGroup){
    reloadAxiosGroup({mainGroup:null,openArray:null})
  }
},[groupSt])

//=================================

//=================================
return(
<div className="bgc-lightGray" style={{height:"100%"}}>

  <div className="flex-center-center">
    <button onClick={e=>{
      reloadAxiosGroup({mainGroup:2,openArray:[1,2,5,15,16]})
    }}>Tree 16</button>

  <button onClick={e=>{
      reloadAxiosGroup({mainGroup:4,openArray:[1,4,11,17]})
    }}>Tree 17</button>

  </div>
  <Tree
      tempObj={groupSt.tempObj}
      canGroupChange={true}
      selectGroupObjectId={editGroup?editGroup.id:null}

      folderOpenFunc={folderOpenFunc}
      folderClosePlusFunc={folderClosePlusFunc}
      folderCloseFunc={folderCloseFunc}
      pOpenFunc={pOpenFunc}
      pCloseFunc={pCloseFunc}
      delFunc={showDelModal}
      addFunc={showAddModal}
      editFunc={showEditModal}
      refreshFunc={refreshFunc}
  />

  {
      groupSt.showConfirm
      ?<ModalConfirm
        setShow={hideConfirmModal}
        submitFunction={delFunc}
      />
      :null
  }
  { 
      groupSt.showAdd
      ?<ModalForm
          lb={"เพิ่มข้อมูล"}
          formTemplate={FormTemplate.groupForm}
          stateTemplate={StateTemplate.groupState}
          loadData={{
            id:groupSt.lastRecordGroup.id+1,
            parentId:editGroup.id,
            mainGroup:editGroup.mainGroup,
            parentGroup:[...editGroup.parentGroup,editGroup.id]
          }}
          submitFunction={addFunc}
          setShow={hideAddModal}
          selectData={null}
        />
      :null
  }
  { 
      groupSt.showEdit
      ?<ModalForm
          lb={"แก้ไขข้อมูล"}
          formTemplate={FormTemplate.groupEditForm}
          stateTemplate={StateTemplate.groupState}
          loadData={{...editGroup,newId:editGroup.id,newParentId:editGroup.parentId}}
          submitFunction={editFunc}
          setShow={hideEditModal}
          selectData={null}
        />
      :null
  }
  { 
    groupSt.showError 
    ?renderModalError({
      setShow:hideErrorModal,
      message:groupSt.message,
      setMessage:()=>{}
    })
    :null

  }

</div>
)
}
export default AppTree;
/*






*/