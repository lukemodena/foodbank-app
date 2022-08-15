import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class EditCollectionModal extends Component{
    constructor(props){
        super(props);
        this.state={
            photo: {
                photofilename: "anonymous.png",
                imagesrc: 'http://127.0.0.1:8000/media/anonymous.png',
                photofile: []
            },

            spreadsheet: {spreadsheetfilename: "No Spreadsheet"}
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    // Edit and save Collection Details //

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

    // Locally store photo //
    handleFileSelected = (event) => {
        const file = event.target.files[0];
        const filename = event.target.files[0].name;
        this.setState({ 
            photo: {
                photofilename: filename,
                photofile: file,
                imagesrc: 'http://127.0.0.1:8000/media/'+filename
            }
        });
    }

    handleSubmitPhoto = (event) => {
        event.preventDefault();

        // Define constant variables //

        const formData = new FormData();
        const file = this.state.photo.photofile;
        const filename = this.state.photo.photofilename;
        const ogfile =this.props.collphoto
        const id = this.props.collid
        const colldate = this.props.colldate
        const colltype = this.props.colltype
        const colltotalweight = this.props.colltotalweight
        const colltotalcost = this.props.colltotalcost
        const collspreadsheet = this.props.collspreadsheet

        // If a photo is not already associated with the collection //

        if (ogfile === "anonymous.png"){
            formData.append(
                "myFile",
                file
            );
            fetch('http://127.0.0.1:8000/Collection/FileHandle',{
                method:'POST',
                body:formData
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
            },
            (error)=>{
                alert('Failed');
            })
           
            // Update Collection //
            fetch('http://127.0.0.1:8000/collection',{
                method:'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    CollectionID:id,
                    CollectionDate:colldate,
                    Type:colltype,
                    TotalWeight:colltotalweight,
                    TotalCost:colltotalcost,
                    CollectionPhoto:filename,
                    CollectionSpreadsheet:collspreadsheet
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

        // If a photo associated with the collection exists //
        else if (ogfile !== "anonymous.png") {

            const confirmDel = `Are you sure you want to overwrite ${ogfile}?`

            // Confirm deletion of original photo, and delete request //
            if (window.confirm(confirmDel)) {
                fetch('http://127.0.0.1:8000/Collection/FileHandle',{
                    method:'DELETE',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        fileName:ogfile
                    })
                })
                .then(res=>res.json())
                .then((result)=>{
                    alert(result);
                },
                (error)=>{
                    alert('Failed');
                })

                // Upload new file //
                formData.append(
                    "myFile",
                    file
                );

                fetch('http://127.0.0.1:8000/Collection/FileHandle',{
                    method:'POST',
                    body:formData
                })

                .then(res=>res.json())
                .then((result)=>{
                    alert(result);
                },
                (error)=>{
                    alert('Failed');
                })
               
                // Update Collection //
                fetch('http://127.0.0.1:8000/collection',{
                    method:'PUT',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        CollectionID:id,
                        CollectionDate:colldate,
                        Type:colltype,
                        TotalWeight:colltotalweight,
                        TotalCost:colltotalcost,
                        CollectionPhoto:filename,
                        CollectionSpreadsheet:collspreadsheet
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
        }
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
                            Edit Collection:
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
                                    <Form.Group controlId='CollectionDate'>
                                        <Form.Label>CollectionDate</Form.Label>
                                        <Form.Control type='date' name='CollectionDate' required placeholder='CollectionDate' defaultValue={this.props.colldate}/>
                                    </Form.Group>
                                    <Form.Group controlId='Type'>
                                        <Form.Label>Collection Type</Form.Label>
                                        <Form.Select aria-label="Type" required name='Type' placeholder='Type' defaultValue={this.props.colltype}>
                                            <option>Please select collection type...</option>
                                            <option value="1">1 Month Drop Off</option>
                                            <option value="3">3 Month Collection</option>
                                            <option value="0">CANCELLED</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId='TotalWeight'>
                                        <Form.Label>TotalWeight</Form.Label>
                                        <Form.Control type='text' name='TotalWeight' required placeholder='TotalWeight' defaultValue={this.props.colltotalweight}/>
                                    </Form.Group>
                                    <Form.Group controlId='TotalCost'>
                                        <Form.Label>TotalCost</Form.Label>
                                        <Form.Control type='text' name='TotalCost' required placeholder='TotalCost' defaultValue={this.props.colltotalcost}/>
                                    </Form.Group>
                                    <Form.Group controlId='CollectionSpreadsheet'>
                                        <Form.Label>CollectionSpreadsheet</Form.Label>
                                        <Form.Control type='text' name='CollectionSpreadsheet' required placeholder='CollectionSpreadsheet' defaultValue={this.props.collspreadsheet}/>
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
