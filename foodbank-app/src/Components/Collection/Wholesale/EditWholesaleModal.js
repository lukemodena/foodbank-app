import React from "react";
import {Button, Col, Form, Row, Modal} from 'react-bootstrap';

import { SuccessModal } from "../../common/SuccessModal";

export function EditWholesaleModal(props) {
    const {
        show,
        onHide,
        editwhol,
        collid,
        whoid,
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
                        Cash Donations:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <SuccessModal show={successModalShow}
                                onHide={successModalClose}
                                reqStatus={reqStatus}
                                type={type}
                                isAdd={isAdd}
                            />
                            <Form onSubmit={editwhol}>
                                <Form.Group controlId='CollectionID'>
                                    <Form.Label>Collection ID</Form.Label>
                                    <Form.Control type='text' name='CollectionID' disabled placeholder='CollectionID' defaultValue={collid}/>
                                </Form.Group>
                                <Form.Group controlId='WholesaleID'>
                                    <Form.Label>Wholesale ID</Form.Label>
                                    <Form.Control type='text' name='WholesaleID' disabled placeholder='WholesaleID' defaultValue={whoid}/>
                                </Form.Group>
                                <Form.Group controlId='TotalDonated'>
                                    <Form.Label>Total Donated</Form.Label>
                                    <Form.Control type='text' name='TotalDonated' disabled placeholder='TotalDonated' defaultValue={whototaldonated}/>
                                </Form.Group>
                                <Form.Group controlId='AddDonation'>
                                    <Form.Label>Add Donation</Form.Label>
                                    <Form.Control type='text' name='AddDonation' placeholder='AddDonation' defaultValue={"0"}/>
                                </Form.Group>
                                <Form.Group controlId='TotalSpent'>
                                    <Form.Label>Total Spent</Form.Label>
                                    <Form.Control type='text' name='TotalSpent' placeholder='TotalSpent' defaultValue={whototalspent}/>
                                </Form.Group>
                                <Form.Group controlId='Receipt'>
                                    <Form.Label>Receipt</Form.Label>
                                    <Form.Control type='text' name='Receipt' disabled placeholder='Receipt' defaultValue={whoreceipt}/>
                                </Form.Group>
                                <Form.Group controlId='Remainder'>
                                    <Form.Label>Remainder</Form.Label>
                                    <Form.Control type='text' name='Remainder' disabled placeholder='Remainder' defaultValue={whoremainder}/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Save Cash Donation
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