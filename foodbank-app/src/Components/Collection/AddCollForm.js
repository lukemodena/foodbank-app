import React,{Component} from 'react';
import { Button, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCollection, checkStatusAdd } from '../../actions/collections';
import { SuccessModal } from '../common/SuccessModal';

export class AddCollectionForm extends Component{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state={
            CollectionDate:"",
            Type:"",
            TotalWeight:"0",
            TotalCost:"0",
            Status:"PLANNED",
            successModalShow:false,
            reqStatus:"",
            type:"collection",
            isAdd: true
        }
    };

    static propTypes = {
        addCollection: PropTypes.func.isRequired,
        checkStatusAdd: PropTypes.func.isRequired
    };

    // Form Manager

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // Add Donor

    handleSubmit = (e) => {
        e.preventDefault()
        let date = e.target.CollectionDate.value;
        let type = e.target.Type.value;
        let totalWeight = e.target.TotalWeight.value;
        let totalCost = e.target.TotalCost.value;
        let photo = "anonymous.png";
        let spreadsheet = "No Spreadsheet";
        let status = e.target.CollectionStatus.value;

        if (status === "ACTIVE") {
            this.props.checkStatusAdd(status)
            this.props.addCollection(date, type, totalWeight, totalCost, photo, spreadsheet, status);

            let response = `Collection on ${date} added successfully!`

            this.setState({
                CollectionDate:"",
                Type:"",
                TotalWeight:"",
                TotalCost:"",
                Status:"PLANNED",
                successModalShow:true,
                reqStatus:response
            })
        } else {
            this.props.addCollection(date, type, totalWeight, totalCost, photo, spreadsheet, status);
            
            let response = `Collection on ${date} added`

            this.setState({
                CollectionDate:"",
                Type:"",
                TotalWeight:"",
                TotalCost:"",
                Status:"PLANNED",
                successModalShow:true,
                reqStatus:response
            })
        }
    }

    render() {
        let successModalClose=()=>this.setState({successModalShow:false});
        return (
            // Add Donor Form 
            <div>
                <SuccessModal show={this.state.successModalShow}
                        onHide={successModalClose}
                        reqStatus={this.state.reqStatus}
                        type={this.state.type}
                        isAdd={this.state.isAdd}
                />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='CollectionDate'>
                        <Form.Label>Collection Date</Form.Label>
                        <Form.Control type='date' name='CollectionDate' required placeholder='CollectionDate' onChange={this.onChange} value={this.state.CollectionDate}/>
                    </Form.Group>
                    <Form.Group controlId='Type'>
                        <Form.Label>Collection Type</Form.Label>
                        <Form.Select aria-label="Type" required name='Type' placeholder='Type' onChange={this.onChange} value={this.state.Type}>
                            <option>Please select collection type...</option>
                            <option value="1">1 Month Drop Off</option>
                            <option value="3">3 Month Collection</option>
                            <option value="0">CANCELLED</option>
                        </Form.Select>
                    </Form.Group> 
                    <Form.Group controlId='CollectionStatus'>
                        <Form.Label>Collection Status</Form.Label>
                        <Form.Select aria-label="CollectionStatus" required name='CollectionStatus' placeholder='CollectionStatus' defaultValue={this.state.Status}>
                            <option>Please select collection status...</option>
                            <option value="PLANNED">Planned</option>
                            <option value="ACTIVE">Active</option>
                            <option value="ARCHIVED">Archived</option>
                            <option value="CANCELLED">Cancelled</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId='TotalWeight'>
                        <Form.Control type='hidden' name='TotalWeight' required placeholder='TotalWeight' onChange={this.onChange} value={this.state.TotalWeight} />
                    </Form.Group>
                    <Form.Group controlId='TotalCost'>
                        <Form.Control type='hidden' name='TotalCost' required placeholder='TotalCost' onChange={this.onChange} value={this.state.TotalCost} />
                    </Form.Group>
                    <Form.Group style={{paddingTop: "25px"}}>
                        <Button variant='primary' type='submit'>
                            Add Collection
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

// Reducer

export default connect(null, { addCollection, checkStatusAdd })(AddCollectionForm)
