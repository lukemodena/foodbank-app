import React,{Component} from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';

import AddDonForm from './AddDonForm';


export class AddDonorModal extends Component{

    constructor(props){
        super(props);
    };


    render() {

        return (
            // Add Donor Form 
            <div className='container'>
                <Modal
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered>
                    <Modal.Header closeButton>
                        <Modal.Title id='contained-modal-title-vcenter'>
                            Add Donor:
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <AddDonForm />
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
