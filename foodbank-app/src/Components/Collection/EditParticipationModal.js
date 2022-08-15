import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditParticipationModal extends Component{
    constructor(props){
        super(props);
        this.state={
            dons:[]
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.donorList=this.donorList.bind(this);
        this.participationList=this.participationList.bind(this);
    }

    donorList(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/donor')
        .then(response=>response.json())
        .then(data=>{
            this.setState({dons:data});
        })
    }

    participationList(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/participation')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
        })
    }

    handleSubmit(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/participation',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ParticipationID:null,
                Participation:event.target.Participation.value,
                DonationType:event.target.DonationType.value,
                TotalDonated:parseFloat(event.target.TotalDonated.value),
                DonorID:event.target.DonorID.value,
                CollectionID:event.target.CollectionID.value,
                WholesaleID:event.target.WholesaleID.value
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
        const {dons} = this.state;
        return (
            <div className='container'>
                <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered>
                    <Button onClick={this.donorList}>
                        Get Donors
                    </Button>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Add Participating Donor:
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='CollectionID'>
                                        <Form.Label>CollectionID</Form.Label>
                                        <Form.Control type='text' name='CollectionID' disabled placeholder='CollectionID' defaultValue={this.props.collid}/>
                                    </Form.Group>
                                    <Form.Group controlId='DonorID'>
                                        <Form.Label>Donor</Form.Label>
                                        <Form.Select aria-label="DonorID" required name='DonorID' placeholder='DonorID'>
                                            {dons.map(don=>
                                                <option key={don.DonorID} value={don.DonorID}>
                                                    {don.FullName}
                                                </option>
                                            )}  
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
                                    <Form.Group controlId='TotalDonated'>
                                        <Form.Label>Total Donated</Form.Label>
                                        <Form.Control type='text' name='TotalDonated' required placeholder='TotalDonated'/>
                                    </Form.Group>
                                    <Form.Group controlId='WholesaleID'>
                                        <Form.Label>Wholesale ID</Form.Label>
                                        <Form.Control type='text' name='WholesaleID' required placeholder='WholesaleID'/>
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
                    <Button onClick={this.participationList}>
                        Participant List    
                    </Button>
                    <Modal.Footer>
                        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
