import React,{Component} from 'react';
import {Modal, Button, Row, Col, Image} from 'react-bootstrap';

import AddCollForm from './AddCollForm';


export class AddCollectionModal extends Component{

    constructor(props){
        super(props);
    };

    photofilename = "anonymous.png";
    imagesrc = 'http://127.0.0.1:8000/media/'+this.photofilename;

    render() {

        return (
            // Add Collection Form 
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
                                <AddCollForm />
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