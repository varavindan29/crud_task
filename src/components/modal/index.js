import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ModalPop(props) {
    let {
        show = false,
        toggle=()=>{},
        children=''
    } = props;
    const [modal, setModal] = useState(false);


    return (
        <div>
 
            <Modal isOpen={show} toggle={toggle} {...props}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                   {children}
                </ModalBody>
         
            </Modal>
        </div>
    );
}

export default ModalPop;