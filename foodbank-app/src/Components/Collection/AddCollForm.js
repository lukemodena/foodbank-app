import React,{Component} from 'react';
import { Button, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCollection } from '../../actions/collections';


export class AddCollectionForm extends Component{

    constructor(props){
        super(props);
        console.log(this.props)
        this.state={
            CollectionDate:"",
            Type:"",
            TotalWeight:"0",
            TotalCost:"0"
        }
    };

    static propTypes = {
        addCollection: PropTypes.func.isRequired,
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

        this.props.addCollection(date, type, totalWeight, totalCost, photo, spreadsheet);

        this.setState({
            CollectionDate:"",
            Type:"",
            TotalWeight:"",
            TotalCost:""
        })
    }

    render() {

        return (
            // Add Donor Form 
            <div>
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
                    <Form.Group controlId='TotalWeight'>
                        <Form.Label>Total Weight (kg)</Form.Label>
                        <Form.Control type='text' name='TotalWeight' required placeholder='TotalWeight' onChange={this.onChange} value={this.state.TotalWeight} />
                    </Form.Group>
                    <Form.Group controlId='TotalCost'>
                        <Form.Label>Total Cost (£)</Form.Label>
                        <Form.Control type='text' name='TotalCost' required placeholder='TotalCost' onChange={this.onChange} value={this.state.TotalCost} />
                    </Form.Group>
                    <Form.Group>
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

export default connect(null, { addCollection })(AddCollectionForm)
