import React from "react";
import {Button, Col, Form, Row, Modal, Image} from 'react-bootstrap';
import { BsDownload } from "react-icons/bs";

export function EditCollectionModal(props) {
    const {
        show,
        onHide,
        handleFile,
        addphoto,
        collid,
        colldate,
        colltype,
        colltotalweight,
        colltotalcost,
        collphoto,
        collspreadsheet,
        collstatus
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
                        Edit Collection:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={addphoto}>
                                <Form.Group controlId='CollectionID'>
                                    <Form.Control type='hidden' name='CollectionID' disabled placeholder='CollectionID' defaultValue={collid}/>
                                </Form.Group>

                                <Form.Group controlId='CollectionDate'>
                                    <Form.Label>Collection Date</Form.Label>
                                    <Form.Control type='date' name='CollectionDate' required placeholder='CollectionDate' defaultValue={colldate}/>
                                </Form.Group>
                                <Form.Group controlId='Type'>
                                    <Form.Label>Collection Type</Form.Label>
                                    <Form.Select aria-label="Type" required name='Type' placeholder='Type' defaultValue={colltype}>
                                        <option>Please select collection type...</option>
                                        <option value="1">1 Month Drop Off</option>
                                        <option value="3">3 Month Collection</option>
                                        <option value="0">CANCELLED</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='TotalWeight'>
                                    <Form.Label>Total Weight</Form.Label>
                                    <Form.Control type='text' name='TotalWeight' required placeholder='TotalWeight' defaultValue={colltotalweight}/>
                                </Form.Group>
                                <Form.Group controlId='TotalCost'>
                                    <Form.Label>Total Cost</Form.Label>
                                    <Form.Control type='text' name='TotalCost' required placeholder='TotalCost' defaultValue={colltotalcost}/>
                                </Form.Group>
                                <Form.Group controlId='CollectionStatus'>
                                    <Form.Label>Collection Status</Form.Label>
                                    <Form.Select aria-label="CollectionStatus" required name='CollectionStatus' placeholder='CollectionStatus' defaultValue={collstatus}>
                                        <option>Please select collection status...</option>
                                        <option value="PLANNED">Planned</option>
                                        <option value="ACTIVE">Active</option>
                                        <option value="ARCHIVED">Archived</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='CollectionPhoto'>
                                    <Form.Control type='hidden' name='CollectionPhoto' disabled placeholder='CollectionID' defaultValue={collphoto}/>
                                </Form.Group>
                                <Form.Group controlId='CollectionSpreadsheet'>
                                    <Form.Label>CollectionSpreadsheet</Form.Label>
                                    <Form.Control type='text' name='CollectionSpreadsheet' required placeholder='CollectionSpreadsheet' defaultValue={collspreadsheet}/>
                                </Form.Group>

                                <Form.Group controlId='photofile' className="mb-3">
                                    <Form.Label>Collection Photo Upload</Form.Label>
                                    <Form.Control type="file" name='photofile' onChange={handleFile} />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Save Collection
                                    </Button>
                                </Form.Group> 
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Form>
                                <Form.Group>
                                    <Image width="200px" height="200px" src={`${process.env.REACT_APP_API}media/photos/`+collphoto}/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="outline-secondary" className="editButton">
                                        <BsDownload className="editButton-Icon"/>
                                    </Button>
                                </Form.Group>
                             
                                {/* <Link to={collphotourl} target="_blank" download></Link> */}
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