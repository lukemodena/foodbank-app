import React from "react";
import {Button, Col, Form, Row, Modal, Image} from 'react-bootstrap';
import { BsDownload } from "react-icons/bs";
import { SuccessModal } from "../common/SuccessModal";

export function MoreInformationModal(props) {
    const {
        show,
        onHide,
        colldate,
        colltype,
        colltotalweight,
        colltotalcost,
        collphoto,
        collspreadsheet,
        collstatus,
        whototaldonated,
        whototalspent,
        whoremainder,
        whoreceipt,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd
    } = props

    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        {colldate}:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        
                        <Col sm={6}>    
                            <p>
                                Collection Type: <br />
                                <strong>{colltype}</strong> <br />
                                Total Weight: <br />
                                <strong>{colltotalweight}kg</strong> <br />
                                Estimated Cost: <br />
                                <strong>£{colltotalcost}</strong> <br />
                                Total Donated: <br />
                                <strong>£{whototaldonated}</strong> <br />
                                Total Spent: <br />
                                <strong>£{whototalspent}</strong> <br />
                                Remainder: <br />
                                <strong>£{whoremainder}</strong> <br />
                                Status: <br />
                                <strong>{collstatus}</strong> <br />
                            </p>
                        </Col>
                        <Col sm={6}>
                            <Image width="200px" height="200px" src={`${process.env.REACT_APP_API}media/photos/`+collphoto}/>
                        </Col>
                        <Col sm={6}>
                            <Form>
                                <Form.Group>
                                    <Button variant="outline-secondary" className="editButton">
                                        <BsDownload className="editButton-Icon"/>
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}