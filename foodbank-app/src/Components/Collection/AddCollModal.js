import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class AddCollectionModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    photofilename = "anonymous.png";
    spreadsheetfilename = "No Spreadsheet";
    imagesrc = 'http://127.0.0.1:8000/media/'+this.photofilename;

    handleSubmit(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/collection',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CollectionID:null,
                CollectionDate:event.target.CollectionDate.value,
                Type:event.target.Type.value,
                TotalWeight:parseFloat(event.target.TotalWeight.value),
                TotalCost:parseFloat(event.target.TotalCost.value),
                CollectionPhoto:this.photofilename,
                CollectionSpreadsheet:this.spreadsheetfilename
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
                            Add Collection: 
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId='CollectionDate'>
                                        <Form.Label>CollectionDate</Form.Label>
                                        <Form.Control type='date' name='CollectionDate' required placeholder='CollectionDate'/>
                                    </Form.Group>
                                    <Form.Group controlId='Type'>
                                        <Form.Label>Collection Type</Form.Label>
                                        <Form.Select aria-label="Type" required name='Type' placeholder='Type'>
                                            <option>Please select collection type...</option>
                                            <option value="1">1 Month Drop Off</option>
                                            <option value="3">3 Month Collection</option>
                                            <option value="0">CANCELLED</option>
                                        </Form.Select>
                                    </Form.Group> 
                                    <Form.Group controlId='TotalWeight'>
                                        <Form.Label>TotalWeight</Form.Label>
                                        <Form.Control type='text' name='TotalWeight' required placeholder='TotalWeight'/>
                                    </Form.Group>
                                    <Form.Group controlId='TotalCost'>
                                        <Form.Label>TotalCost</Form.Label>
                                        <Form.Control type='text' name='TotalCost' required placeholder='TotalCost'/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>
                                            Add Collection
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc}/>
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
