import React from 'react';
import {Modal, Button, Row, Col, Form, Dropdown} from 'react-bootstrap';

import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { TimePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export function EditParticipationModal(props){
    const {
        show,
        onHide,
        editpart,
        parid,
        donid,
        collid,
        whoid,
        donfullname,
        donemail,
        donaddress1,
        donaddress2,
        donpostcode,
        donnotes,
        donphone,
        pardontype,
        partotdon,
        partime,
        parrec,
        value,
        donationTypeVal,
        typeChanger,
        handleChange,
        totalDonatedVal,
        paymentRecievedVal,
        totDonChange,
        payRecChange
    } = props
    
    
    const changeTime = (newValue) => {
        handleChange(newValue);
    };

    const changeType = (e) => {
        let inputValue = e.target.value
        typeChanger(inputValue)
    };

    const changeTotal = (e) => {
        let inputValue = e.target.value
        totDonChange(inputValue)
    };

    const changeRecieved = (e) => {
        let inputValue = e.target.value
        payRecChange(inputValue)
    };    
    

    const handleSubmit = (e) => {
        e.preventDefault();

        let CollectionID = e.target.CollectionID.value
        let DonorID = e.target.DonorID.value;
        let ParticipantID = e.target.ParticipantID.value;
        let PaymentRecieved = paymentRecievedVal;
        let DonationType = e.target.DonationType.value;
        let originalTotalDonated = e.target.OriginalTotalDonated.value;
        let TotalDonated = totalDonatedVal;
        let DropOffTime = value;
        let WholesaleID = e.target.WholesaleID.value;

        let DonationChange = parseFloat(TotalDonated) - parseFloat(originalTotalDonated)

        console.log(CollectionID, DonorID, ParticipantID, PaymentRecieved, "DonType:", DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID);

        //editpart(CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID);
    }


    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Participant Information:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
        
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                            
                                <Form.Group controlId='CollectionID'>
                                    <Form.Control type='hidden' name='CollectionID' disabled placeholder='CollectionID' defaultValue={collid}/>
                                </Form.Group>
                                <Form.Group controlId='WholesaleID'>
                                    <Form.Control type='hidden' name='WholesaleID' disabled placeholder='WholesaleID' defaultValue={whoid}/>
                                </Form.Group>
                                <Form.Group controlId='DonorID'>
                                    <Form.Control type='hidden' name='DonorID' disabled placeholder='DonorID' defaultValue={donid}/>
                                </Form.Group>
                                <Form.Group controlId='ParticipantID'>
                                    <Form.Control type='hidden' name='ParticipantID' disabled placeholder='ParticipantID' defaultValue={parid}/>
                                </Form.Group>
                                <Form.Group controlId='OriginalTotalDonated'>
                                    <Form.Control type='hidden' name='OriginalTotalDonated' disabled placeholder='OriginalTotalDonated' defaultValue={partotdon}/>
                                </Form.Group>

                                <Form.Group controlId='DonationType'>
                                    <Form.Label>Donation Type</Form.Label>
                                    <Form.Select aria-label="DonationType" required name='DonationType' placeholder='DonationType' onChange={changeType} defaultValue={pardontype}>
                                        <option value="">Please specify...</option>
                                        <option value="0">N/A</option>
                                        <option value="1">Drop-Off</option>
                                        <option value="2">Collection</option>
                                        <option value="3">Cash Donation</option>
                                        <option value="4">Online Order</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='DropOffTime'>
                                    <Stack>
                                        {(donationTypeVal === '1' || donationTypeVal ===  '4') &&<Form.Label>Drop-Off Time</Form.Label>}
                                        {(donationTypeVal === '1' || donationTypeVal ===  '4') &&<LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <TimePicker
                                                label="DropOffTime"
                                                value={value}
                                                onChange={changeTime}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>}
                                    </Stack>
                                    <Form.Control type='hidden' name='DropOffTime' placeholder='DropOffTime' value={value}/>
                                </Form.Group>
                                
                                <Form.Group controlId='TotalDonated'>
                                    {donationTypeVal === '3' &&<Form.Label>Total Donated (£)</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Control type='text' name='TotalDonated' required placeholder='TotalDonated' onChange={changeTotal} defaultValue={partotdon} />}
                                </Form.Group>
                                <Form.Group controlId='PaymentRecieved'>
                                    {donationTypeVal === '3' &&<Form.Label>Payment Recieved</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Select aria-label="PaymentRecieved" required name='PaymentRecieved' placeholder='PaymentRecieved' onChange={changeRecieved} defaultValue={parrec}>
                                        <option>Please specify...</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Form.Select>}
                                </Form.Group>
                            
                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Save Participant
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>    
                        <Col sm={6}>
                            <Form>
                                <Form.Group controlId='FullName'>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type='text' name='FullName' disabled placeholder='FullName' value={donfullname}/>
                                </Form.Group>
                                <Form.Group controlId='Email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='text' name='Email' disabled placeholder='Email' value={donemail} />
                                </Form.Group>
                                <Form.Group controlId='Address1'>
                                    <Form.Label>Address 1</Form.Label>
                                    <Form.Control type='text' name='Address1' disabled placeholder='Address1' value={donaddress1} />
                                </Form.Group>
                                <Form.Group controlId='Address2'>
                                    <Form.Label>Address 2</Form.Label>
                                    <Form.Control type='text' name='Address2' disabled placeholder='Address2' value={donaddress2} />
                                </Form.Group>
                                <Form.Group controlId='PostCode'>
                                    <Form.Label>Postcode</Form.Label>
                                    <Form.Control type='text' name='PostCode' disabled placeholder='PostCode' value={donpostcode} />
                                </Form.Group>
                                <Form.Group controlId='Notes'>
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type='text' name='Notes' disabled placeholder='Notes' value={donnotes} />
                                </Form.Group>
                                <Form.Group controlId='Phone'>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type='text' name='Phone' disabled placeholder='Phone' value={donphone} />
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
