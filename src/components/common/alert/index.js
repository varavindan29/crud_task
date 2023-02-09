
import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import alertIcon from '../../../assets/img/alert.png'

export const CommanAlert = (props) => {
    let {
        isShow = true,
        toggle = () => { },
        formSubmit = () => { },
        userEditObj = {},
        userEditIndex = -1
    } = props;
    return (
        <Modal isOpen={isShow} toggle={toggle} >
            {/* <ModalHeader toggle={toggle}>User Form</ModalHeader> */}
            <ModalBody className="text-center mt-2">
                <img src={alertIcon} />
                <div className="row mt-4">
                    <div className="col-md-12">
                        <h4>Are You Sure want Delete
                            this User</h4>
                    </div>
                    <div className="col-md-12 mt-5">
                        <Button color="primary" className="custom-btn me-3" onClick={() => toggle(false)}>
                            No
                        </Button>{' '}
                        <Button color="secondary" className="custom-btn" onClick={() => toggle(true)}>
                            yes
                        </Button>
                    </div>

                </div>
            </ModalBody>

        </Modal>

    )
}