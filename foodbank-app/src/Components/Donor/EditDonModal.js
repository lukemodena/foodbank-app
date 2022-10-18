import React from 'react';
import {Button, Modal, Row, Col, Form} from 'react-bootstrap';



// EDIT DONOR MODAL (Function) //

export function EditDonorModal(props) {
    const { 
        show,
        onHide,
        edit,
        donid,
        donfirstname,
        donlastname,
        donfullname,
        donemail,
        donaddress1,
        donaddress2,
        donpostcode,
        dondonortype,
        donnotes,
        donphone,
        doninvolveno
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
                        Edit Donor: 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{fontSize: "15px", fontStyle: "italic"}}>{donfullname} has participated in the collection <strong>{doninvolveno}</strong> times.</p>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={edit}>
                                <Form.Group controlId='DonorID'>
                                    <Form.Control type='hidden' name='DonorID' disabled placeholder='DonorID' defaultValue={donid} />
                                </Form.Group>
                                <Form.Group controlId='FirstName'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type='text' name='FirstName' required placeholder='Enter first name...' defaultValue={donfirstname} />
                                </Form.Group>
                                <Form.Group controlId='LastName'>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type='text' name='LastName' required placeholder='Enter last name...' defaultValue={donlastname} />
                                </Form.Group>
                                <Form.Group controlId='FullName'>
                                    <Form.Control type='hidden' name='FullName' disabled placeholder='FullName' defaultValue={donfullname}/>
                                </Form.Group>
                                <Form.Group controlId='Email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='text' name='Email' required placeholder='Enter email...' defaultValue={donemail} />
                                </Form.Group>
                                <Form.Group controlId='Address1'>
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control type='text' name='Address1' required placeholder='Enter address line 1...' defaultValue={donaddress1} />
                                </Form.Group>
                                <Form.Group controlId='Address2'>
                                    <Form.Label>Address Line 2</Form.Label>
                                    <Form.Control type='text' name='Address2' required placeholder='Enter address line 2...' defaultValue={donaddress2} />
                                </Form.Group>
                                <Form.Group controlId='PostCode'>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Form.Control type='text' name='PostCode' required placeholder='Enter postcode...' defaultValue={donpostcode} />
                                </Form.Group>
                                <Form.Group controlId='DonorType'>
                                    <Form.Label>Donor Type</Form.Label>
                                    <Form.Select aria-label="DonorType" required defaultValue={dondonortype} >
                                        <option>Please select donor type...</option>
                                        <option value="1">1 Month</option>
                                        <option value="3">3 Months</option>
                                        <option value="1,spec">1 Month SPECIAL</option>
                                        <option value="3,spec">3 Months SPECIAL</option>
                                    </Form.Select>
                                </Form.Group>  
                                <Form.Group controlId='Notes'>
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type='text' name='Notes' required placeholder='Enter any notes...' defaultValue={donnotes} />
                                </Form.Group>
                                <Form.Group controlId='Phone'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type='text' name='Phone' required placeholder='Enter phone number...' defaultValue={donphone} />
                                </Form.Group>
                                <Form.Group controlId='InvolveNo'>
                                    <Form.Control type='hidden' name='InvolveNo' disabled placeholder='InvolveNo' defaultValue={doninvolveno} />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Save Donor
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