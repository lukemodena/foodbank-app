import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditDonorModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/donor',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DonorID:event.target.DonorID.value,
                FullName:event.target.FirstName.value + " " + event.target.LastName.value,
                FirstName:event.target.FirstName.value,
                LastName:event.target.LastName.value,
                Email:event.target.Email.value,
                Address1:event.target.Address1.value,
                Address2:event.target.Address2.value,
                PostCode:event.target.PostCode.value,
                DonorType:event.target.DonorType.value,
                Notes:event.target.Notes.value,
                Phone:event.target.Phone.value,
                AddEmail:event.target.AddEmail.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className='container'>
                <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Edit Donor: {this.props.donfullname}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='DonorID'>
                                        <Form.Label>DonorID</Form.Label>
                                        <Form.Control type='text' name='DonorID' disabled placeholder='DonorID' defaultValue={this.props.donid}/>
                                    </Form.Group>
                                    <Form.Group controlId='FirstName'>
                                        <Form.Label>FirstName</Form.Label>
                                        <Form.Control type='text' name='FirstName' required placeholder='FirstName' defaultValue={this.props.donfirstname}/>
                                    </Form.Group>
                                    <Form.Group controlId='LastName'>
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type='text' name='LastName' required placeholder='LastName' defaultValue={this.props.donlastname}/>
                                    </Form.Group>
                                    <Form.Group controlId='FullName'>
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type='text' name='FullName' disabled placeholder='FullName' defaultValue={this.props.donfullname}/>
                                    </Form.Group>
                                    <Form.Group controlId='Email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='text' name='Email' required placeholder='Email' defaultValue={this.props.donemail}/>
                                    </Form.Group>
                                    <Form.Group controlId='Address1'>
                                        <Form.Label>Address1</Form.Label>
                                        <Form.Control type='text' name='Address1' required placeholder='Address1' defaultValue={this.props.donaddress1}/>
                                    </Form.Group>
                                    <Form.Group controlId='Address2'>
                                        <Form.Label>Address2</Form.Label>
                                        <Form.Control type='text' name='Address2' required placeholder='Address2' defaultValue={this.props.donaddress2}/>
                                    </Form.Group>
                                    <Form.Group controlId='PostCode'>
                                        <Form.Label>PostCode</Form.Label>
                                        <Form.Control type='text' name='PostCode' required placeholder='PostCode' defaultValue={this.props.donpostcode}/>
                                    </Form.Group>
                                    <Form.Group controlId='DonorType'>
                                        <Form.Label>DonorType</Form.Label>
                                        <Form.Select aria-label="DonorType" required defaultValue={this.props.dondonortype}>
                                            <option>Please select donor type...</option>
                                            <option value="1">1 Month</option>
                                            <option value="3">3 Months</option>
                                            <option value="1,spec">1 Month SPECIAL</option>
                                            <option value="3,spec">3 Months SPECIAL</option>
                                        </Form.Select>
                                    </Form.Group>  
                                    <Form.Group controlId='Notes'>
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control type='text' name='Notes' required placeholder='Notes' defaultValue={this.props.donnotes}/>
                                    </Form.Group>
                                    <Form.Group controlId='Phone'>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type='text' name='Phone' required placeholder='Phone' defaultValue={this.props.donphone}/>
                                    </Form.Group>
                                    <Form.Group controlId='AddEmail'>
                                        <Form.Label>AddEmail</Form.Label>
                                        <Form.Control type='text' name='AddEmail' required placeholder='AddEmail' defaultValue={this.props.donaddemail}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>
                                            Edit Donor
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
