import React from 'react';
import {Modal, Button, Row, Col, Form, Dropdown} from 'react-bootstrap';

import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { TimePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export function EditParticipationModal(props){
    const {
        show,
        onHide,
        addpart,
        collid,
        whoid,
        dons
    } = props

    const [value, setValue] = React.useState(new Date('2014-08-18T00:00:00'));
    const handleChange = (newValue) => {
        setValue(newValue);
      };



    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Add Participating Donor:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
        
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={addpart}>
                                <Form.Group controlId='CollectionID'>
                                    <Form.Control type='hidden' name='CollectionID' disabled placeholder='CollectionID' defaultValue={collid}/>
                                </Form.Group>
                                <Form.Group controlId='WholesaleID'>
                                    <Form.Control type='hidden' name='WholesaleID' disabled placeholder='WholesaleID' defaultValue={whoid}/>
                                </Form.Group>
                                <Form.Group controlId='DonorID'>
                                    <Form.Label>Donor</Form.Label>
                                    <Form.Select aria-label="DonorID" required name='DonorID' placeholder='DonorID'>
                                        {dons.map((don)=> (
                                            <option key={don.DonorID} value={don.DonorID}>
                                                {don.FullName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='Participation'>
                                    <Form.Label>Donor Participating</Form.Label>
                                    <Form.Select aria-label="Participation" required name='Participation' placeholder='Participation'>
                                        <option>Please specify...</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='DonationType'>
                                    <Form.Label>Donation Type</Form.Label>
                                    <Form.Select aria-label="DonationType" required name='DonationType' placeholder='DonationType'>
                                        <option>Please specify...</option>
                                        <option value="0">N/A</option>
                                        <option value="1">Drop-Off</option>
                                        <option value="2">Collection</option>
                                        <option value="3">Money Donation</option>
                                        <option value="4">Online Order</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='DropOffTime'>
                                    <Form.Label>Drop-Off Time</Form.Label>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="DropOffTime"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Form.Control type='hidden' name='DropOffTime' placeholder='DropOffTime' value={value}/>
                                </Form.Group>
                                
                                <Form.Group controlId='TotalDonated'>
                                    <Form.Label>Total Donated</Form.Label>
                                    <Form.Control type='text' name='TotalDonated' required placeholder='TotalDonated'/>
                                </Form.Group>
                            
                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Add Participant
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                {/* <Button onClick={this.participationList}>
                    Participant List    
                </Button> */}
                <Modal.Footer>
                    <Button variant='danger' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
