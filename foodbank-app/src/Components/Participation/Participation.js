import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditParticipationModal extends Component{
    constructor(props){
        super(props);
        this.state={
            dons:[]
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    refreshList(){
        fetch('http://127.0.0.1:8000/donors')
        .then(response=>response.json())
        .then(data=>{
            this.setState({dons:data});
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    handleSubmit(event){
        event.preventDefault()
        fetch('http://127.0.0.1:8000/collection',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CollectionID:event.target.CollectionID.value,
                CollectionDate:event.target.CollectionDate.value,
                Type:event.target.Type.value,
                TotalWeight:event.target.TotalWeight.value,
                TotalCost:event.target.TotalCost.value,
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
        const {dons}=this.state;
        return (
            <div className='container'>
                <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered>
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
                                        <option>Please specify...</option>
                                        {dons.map(don=>
                                            <option key={don.DonorID} value={don.DonorID}>
                                                {don.FullName}
                                            </option>
                                        )}   
                                    </Form.Group>
                                    <Form.Group controlId='Participation'>
                                        <Form.Label>Donor Participating</Form.Label>
                                        <Form.Select aria-label="Type" required name='Participation' placeholder='Participation'>
                                            <option>Please specify...</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
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
                                            Update Collection
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmitPhoto}>
                                    <Form.Group controlId='CollectionID'>
                                        <Form.Label>CollectionID</Form.Label>
                                        <Form.Control type='text' name='CollectionID' disabled placeholder='CollectionID' defaultValue={this.props.collid}/>
                                    </Form.Group>
                                    <Image width="200px" height="200px" src={'http://127.0.0.1:8000/media/'+this.props.collphoto}/>
                                    <input onChange={this.handleFileSelected} type="file" id='photofile' accept='image/*'/>
                                    <Form.Group>
                                        <Button variant='primary' type='submit'>
                                            UploadPhoto
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
