import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddDonorModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
    }

    state = {
        newUser: { firstName: "", lastName: "" }
      };

    handleFirstName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newUser: {
                ...prevState.newUser,
                firstName: value
            }
        }));
    }

    handleLastName(e) {
        let value = e.target.value;
        this.setState(prevState => ({
            newUser: {
                ...prevState.newUser,
                lastName: value
            }
        }));
    }

    getFullName() {
        return this.state.newUser.firstName + " " + this.state.newUser.lastName;
      }

    handleSubmit(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/donor',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DonorID:null,
                FullName:event.target.FullName.value,
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
                            Add Donor: {this.getFullName()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='FirstName'>
                                        <Form.Label>FirstName</Form.Label>
                                        <Form.Control type='text' name='FirstName' required placeholder='FirstName' onChange={this.handleFirstName}/>
                                    </Form.Group>
                                    <Form.Group controlId='LastName'>
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type='text' name='LastName' required placeholder='LastName' onChange={this.handleLastName}/>
                                    </Form.Group>
                                    <Form.Group controlId='FullName'>
                                        <Form.Label>LastName</Form.Label>
                                        <Form.Control type='text' name='FullName' disabled placeholder='FullName' value={this.getFullName()}/>
                                    </Form.Group>
                                    <Form.Group controlId='Email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' name='Email' required placeholder='Email'/>
                                    </Form.Group>
                                    <Form.Group controlId='Address1'>
                                        <Form.Label>Address1</Form.Label>
                                        <Form.Control type='text' name='Address1' required placeholder='Address1'/>
                                    </Form.Group>
                                    <Form.Group controlId='Address2'>
                                        <Form.Label>Address2</Form.Label>
                                        <Form.Control type='text' name='Address2' required placeholder='Address2'/>
                                    </Form.Group>
                                    <Form.Group controlId='PostCode'>
                                        <Form.Label>PostCode</Form.Label>
                                        <Form.Control type='text' name='PostCode' required placeholder='PostCode'/>
                                    </Form.Group>
                                    <Form.Group controlId='DonorType'>
                                        <Form.Label>DonorType</Form.Label>
                                        <Form.Select aria-label="DonorType">
                                            <option>Please select donor type...</option>
                                            <option value="1">1 Month</option>
                                            <option value="3">3 Months</option>
                                            <option value="1,spec">1 Month SPECIAL</option>
                                            <option value="3,spec">3 Months SPECIAL</option>
                                        </Form.Select>
                                    </Form.Group>    
                                    <Form.Group controlId='Notes'>
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control type='text' name='Notes' required placeholder='Notes'/>
                                    </Form.Group>
                                    <Form.Group controlId='Phone'>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type='text' name='Phone' required placeholder='Phone'/>
                                    </Form.Group>
                                    <Form.Group controlId='AddEmail'>
                                        <Form.Label>AddEmail</Form.Label>
                                        <Form.Control type='email' name='AddEmail' placeholder='AddEmail'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>
                                            Add Donor
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
