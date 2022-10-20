import React from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/';
import { TimePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { SuccessModal } from '../common/SuccessModal';

export function AddParticipationModal(props){
    const {
        show,
        onHide,
        addpart,
        collid,
        whoid,
        dons,
        colldate,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd
    } = props

    const [value, setValue] = React.useState(dayjs('2022-04-07 T00:00:00'));
    const handleChange = (newValue) => {
        setValue(newValue);
      };

    const [donationTypeVal, setDonationTypeVal] = React.useState('')
    const typeChange = (e) => {
        setDonationTypeVal(e.target.value);
    };

    const [totalDonatedVal, setTotalDonatedVal] = React.useState('0')
    const totDonChange = (e) => {
        setTotalDonatedVal(e.target.value);
    };

    const [paymentRecievedVal, setPaymentRecievedVal] = React.useState('false')
    const payRecChange = (e) => {
        setPaymentRecievedVal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let CollectionID = e.target.CollectionID.value;
        let DonorID = e.target.DonorID.value;
        let PaymentRecieved = paymentRecievedVal;
        let DonationType = e.target.DonationType.value;
        let TotalDonated = totalDonatedVal;
        let DropOffTime = value;
        let WholesaleID = e.target.WholesaleID.value;

        setValue('2022-04-07 T00:00:00'); 
        setDonationTypeVal(''); 
        setTotalDonatedVal('0'); 
        setPaymentRecievedVal('false');
        addpart(CollectionID, DonorID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, WholesaleID);
    }


    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={() => {setValue('2022-04-07 T00:00:00'); setDonationTypeVal(''); setTotalDonatedVal('0'); setPaymentRecievedVal('false'); onHide()}}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Add Participating Donor: (Collection {colldate})
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
                                    <Form.Label>Donor</Form.Label>
                                    <Form.Select aria-label="DonorID" required name='DonorID' placeholder='DonorID'>
                                        {dons.map((don)=> (
                                            <option key={don.DonorID} value={don.DonorID}>
                                                {don.FullName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='DonationType'>
                                    <Form.Label>Donation Type</Form.Label>
                                    <Form.Select aria-label="DonationType" required name='DonationType' placeholder='DonationType' onChange={typeChange}>
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
                                                onChange={handleChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>}
                                    </Stack>
                                    <Form.Control type='hidden' name='DropOffTime' placeholder='DropOffTime' value={value}/>
                                </Form.Group>
                                
                                <Form.Group controlId='TotalDonated'>
                                    {donationTypeVal === '3' &&<Form.Label>Total Donated (£)</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Control type='text' name='TotalDonated' required placeholder='TotalDonated' defaultValue={totalDonatedVal} onChange={totDonChange}/>}
                                </Form.Group>
                                <Form.Group controlId='PaymentRecieved'>
                                    {donationTypeVal === '3' &&<Form.Label>Payment Recieved</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Select aria-label="PaymentRecieved" required name='PaymentRecieved' placeholder='PaymentRecieved' defaultValue={paymentRecievedVal} onChange={payRecChange}>
                                        <option>Please specify...</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Form.Select>}
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
                    <Button variant='danger' onClick={() => {setValue('2022-04-07 T00:00:00'); setDonationTypeVal(''); setTotalDonatedVal('0'); setPaymentRecievedVal('false'); onHide()}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
