import React, { useState } from "react";
import { userData } from '../../assets/data/user';
import { UserForm } from '../../components/user'
import { CommanAlert } from '../../components/common'
export const UserPage = () => {
    const [userList, setUserList] = useState(userData)
    const [isUserModalForm, setIsUserModalForm] = useState(false)
    const [userEditIndex, setUserEditIndex] = useState(-1)
    const [userDeleteIndex, setUserDeleteIndex] = useState(-1);
    const [isUserDeleteModal, setIsUserDeleteModal] = useState(false)
    const [userEditObj, setUserEditObj] = useState({})
    const [isViewModal, setIsViewModal] = useState(false)

    const handleUserFromSubmit = (data) => {

        if (userEditIndex === -1) {
            setUserList(oldArray => [...oldArray, data]);
        } else {
            userList[userEditIndex] =data;

            setUserList([...userList]);

        }
        setUserEditIndex(-1);
        setUserEditObj({})


    };


    const handleEditUserForm = (i, isView) => {
        setUserEditIndex(i);
        setIsUserModalForm(true);
        setUserEditObj(userList[i]);

        if(isView){
            setIsViewModal(true)
        }else{
            setIsViewModal(false)
        }

    };

    const handleModalToggle = (isOpen=false) => {
        setUserEditIndex(-1);
        setIsUserModalForm(isOpen);
        setUserEditObj({});
        setIsViewModal(false)
    };



    const handleDelete=(i)=>{
        setIsUserDeleteModal(true)
        setUserDeleteIndex(i)
    }

    const handleDeleteConform=(value)=>{

        if(value){
            userList.splice(userDeleteIndex,1);
            setUserList([...userList]);
        }else{

        };
        setUserDeleteIndex(-1)
        setIsUserDeleteModal(false)
    };

   

    return (
        <div className="row">
            <div className="col-md-12 col-sm-12">

                <button type="button" class="btn btn-primary btn-sm" onClick={()=>handleModalToggle(true)}>Add User</button>
            </div>

            <div className="col-md-12 col-sm-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Location</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList?.map(({ name, age, location }, i) =>
                            <tr key={i}>
                                <th scope="row" >{i + 1}</th>
                                <td>{name}</td>
                                <td>{age}</td>
                                <td>{location}</td>
                                <td>
                                    <button type="button" class="btn btn-primary btn-sm" onClick={() => handleEditUserForm(i,false)}>Update</button>
                                    <button type="button" class="btn btn-danger btn-sm mx-2" onClick={()=>handleDelete(i)}>Delete</button>
                                    <button type="button" class="btn btn-primary btn-sm" onClick={()=>handleEditUserForm(i,true)}>View</button>

                                </td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
            <CommanAlert isShow={isUserDeleteModal} toggle={handleDeleteConform}/>

            <UserForm isShow={isUserModalForm} isViewModal={isViewModal} userEditObj={userEditObj} userEditIndex={userEditIndex} formSubmit={handleUserFromSubmit} toggle={()=>handleModalToggle(false)} />
        </div>
    )

}