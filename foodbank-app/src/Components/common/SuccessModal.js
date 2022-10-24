import React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';


export function SuccessModal(props) {
    const {
        show,
        onHide,
        reqStatus,
        type,
        isAdd,
    } = props

    const refresh = () => {
        if (type !== "participant") {
            window.location.reload(false)
        } else {
            onHide()
        }
    }

    const log = () => {
        console.log(reqStatus)
    }
    return (
        <div className='container'>
            <Modal
            show={show}
            size='sm'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Request Status
                    </Modal.Title>
                </Modal.Header>

                {(type === "partdonor") &&<Modal.Body>
                    {reqStatus}
                </Modal.Body>}
                {(isAdd === false) &&<Modal.Body>
                    {reqStatus} successfully!
                </Modal.Body>}
                {(isAdd === true) &&<Modal.Body>
                    {reqStatus} successfully!
                    Would you like to add another {type}?
                </Modal.Body>}
                
                <Modal.Footer>
                    {(isAdd === false) &&<Button variant='danger' onClick={refresh}>Exit</Button>}
                    {(isAdd === true) &&<Row>
                        <Col>
                            <Button onClick={onHide}>Yes</Button>
                        </Col>
                        <Col>
                            <Button variant='danger' onClick={refresh}>Exit</Button>
                        </Col>
                    </Row>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}