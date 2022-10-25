import React from 'react';
import {Modal, Button, Row, Col, Form, Dropdown} from 'react-bootstrap';

import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { TimePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { SuccessModal } from '../common/SuccessModal';


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
        payRecChange,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd
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
        let time = value;
        let WholesaleID = e.target.WholesaleID.value;

        let DonationChange = parseFloat(TotalDonated) - parseFloat(originalTotalDonated)
        let DropOffTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(time)
        //console.log(CollectionID, DonorID, ParticipantID, PaymentRecieved, "DonType:", DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID);

        editpart(CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID);
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
                            <SuccessModal show={successModalShow}
                                onHide={successModalClose}
                                reqStatus={reqStatus}
                                type={type}
                                isAdd={isAdd}
                            />
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
                            
                                <Form.Group style={{paddingTop: "25px"}}>
                                    <Button variant='primary' type='submit'>
                                        Save Participant
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>    
                        <Col sm={6}>
                            <Modal.Body>
                                <p>
                                    Full Name: <br />
                                    <strong>{donfullname}</strong> <br />
                                    Address: <br />
                                    <strong>{donaddress1} <br />
                                    {donaddress2} <br />
                                    {donpostcode}</strong> <br />
                                    Email: <br />
                                    <strong>{donemail}</strong> <br />
                                    Phone: <br />
                                    <strong>{donphone}</strong> <br />
                                    Notes: <br />
                                    <strong>{donnotes}</strong> <br />
                                </p>

                            </Modal.Body>
                           
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
