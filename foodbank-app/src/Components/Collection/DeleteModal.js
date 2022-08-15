import React,{Component} from "react";
import {Button, ButtonToolbar, Alert, Modal } from 'react-bootstrap';


export class DeleteModal extends Component{

    constructor(props){
        super(props);
    }


    deleteColl(collid){
        if(window.confirm('Are you sure?')){
            fetch('http://127.0.0.1:8000/collection/'+collid,{
                method:'DELETE',
                headers:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
        this.refreshList();
    }
    render(){
        return(
            <div>
                <Modal 
                {...this.props}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered>
                    <Alert variant="danger" onClose={this.props.onHide} dismissible>
                        <Alert.Heading>Delete Collection</Alert.Heading>
                        <p>
                            Are you sure you would like to delete this collection?
                        </p>
                        <Button onClick={this.deleteColl}>Yes</Button>
                    </Alert>
                </Modal>
            </div>
        )
    }
}