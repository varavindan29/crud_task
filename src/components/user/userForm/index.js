import React, { useEffect, useState,useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator';
export const UserForm = (props) => {
    const simpleValidator = useRef(new SimpleReactValidator({ className: "text-danger", }));
    const [, forceUpdate] = useState();
    const [userObj, setUserObj] = useState({ name: '', age: '', location: "" })

    let {
        isShow = true,
        toggle = () => { },
        formSubmit = () => { },
        userEditObj = {},
        userEditIndex = -1,
        isViewModal = false
    } = props;

    useEffect(() => {

        if (userEditIndex !== -1) {
            setUserObj(userEditObj)

        } else {
            setUserObj({ name: '', age: '', location: "" })
        }


    }, [isShow]);




    const handleFormChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUserObj({
            ...userObj,
            [name]: value
        })


    }


    const handleFormSubmit = () => {
        const formValid = simpleValidator.current.allValid();

        if (formValid) {
            formSubmit(userObj);
            toggle();
        }else{
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }
       
    }

    return (


        <Modal isOpen={isShow} toggle={toggle} className={'right-modal'}>
            <ModalHeader toggle={toggle}>User Form</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-12">
                        <div class="mb-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" disabled={isViewModal} value={userObj.name} name='name' onChange={handleFormChange} placeholder="Enter Name" />
                            {simpleValidator.current.message("Name", userObj.name, "required")}
                        </div>
                    </div>
                    <div className="col-12">
                        <div class="mb-3">
                            <label class="form-label">Age</label>
                            <input type="number" class="form-control" disabled={isViewModal} value={userObj.age} name='age' onChange={handleFormChange} placeholder="Enter Age" />
                            {simpleValidator.current.message("Age", userObj.age, "required")}
                        </div>
                    </div>
                    <div className="col-12">
                        <div class="mb-3">
                            <label class="form-label">Location</label>
                            <input type="text" class="form-control" disabled={isViewModal} value={userObj.location} name='location' onChange={handleFormChange} placeholder="Enter Location" />
                            {simpleValidator.current.message("Location", userObj.location, "required")}
                        </div>
                    </div>

                </div>
            </ModalBody>
            {!isViewModal && <ModalFooter>
                <Button color="primary" onClick={handleFormSubmit}>
                    {userEditIndex === -1 ? 'Save' : "Update"}
                </Button>{' '}
                <Button color="secondary" onClick={() => toggle()}>
                    Cancel
                </Button>
            </ModalFooter>}
        </Modal>

    )


}