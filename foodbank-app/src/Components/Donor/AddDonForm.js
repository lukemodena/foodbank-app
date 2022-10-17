import React,{Component} from 'react';
import { Button, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDonor } from '../../actions/donors';


export class AddDonorForm extends Component{

    constructor(props){
        super(props);
        this.state={
            fname:"",
            lname:"",
            fullname:"",
            Email:"",
            Address1:"",
            Address2:"",
            PostCode:"",
            Notes:"N/A",
            Phone:""
        }
    };

    static propTypes = {
        addDonor: PropTypes.func.isRequired,
    };

    // Handle Full Name  


    handleFirstName = (e) => {
        let value1 = e.target.value;
        let value2 = this.state.lname
        this.setState(prevState => ({
            ...prevState.fname,
            fname: value1
        }));
        this.getFullName(value1, value2)
    }

    handleLastName = (e) => {
        let value1 = this.state.fname
        let value2 = e.target.value;
        this.setState(prevState => ({
            ...prevState.lname,
            lname: value2
        }));
        this.getFullName(value1, value2)
    }

    getFullName = (value1, value2) => {
        let res = value1 + " " + value2;
        this.setState(prevState => ({
            ...prevState.fullname,
            fullname: res
        }));
    }

    // Form Manager

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // Add Donor

    handleSubmit = (e) => {
        e.preventDefault()
        let fullName = e.target.FullName.value;
        let firstName = e.target.FirstName.value;
        let lastName = e.target.LastName.value;
        let email = e.target.Email.value;
        let address1 = e.target.Address1.value;
        let address2 = e.target.Address2.value;
        let postCode = e.target.PostCode.value;
        let donorType = e.target.DonorType.value;
        let notes = e.target.Notes.value;
        let phone = e.target.Phone.value;

        this.props.addDonor(fullName, firstName, lastName, email, address1, address2, postCode, donorType, notes, phone);

        this.setState({
            fname:"",
            lname:"",
            fullname:"",
            Email:"",
            Address1:"",
            Address2:"",
            PostCode:"",
            Notes:"N/A",
            Phone:""
        })
    }

    render() {

        return (
            // Add Donor Form 
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='FirstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' name='FirstName' required placeholder='Enter first name...' onChange={this.handleFirstName} value={this.state.fname}/>
                    </Form.Group>
                    <Form.Group controlId='LastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' name='LastName' required placeholder='Enter last name...' onChange={this.handleLastName} value={this.state.lname}/>
                    </Form.Group>
                    <Form.Group controlId='FullName'>
                        <Form.Control type='hidden' name='FullName' disabled placeholder='FullName' value={this.state.fullname}/>
                    </Form.Group>
                    <Form.Group controlId='Email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' name='Email' required placeholder='Enter email...' onChange={this.onChange} value={this.state.Email}/>
                    </Form.Group>
                    <Form.Group controlId='Address1'>
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type='text' name='Address1' required placeholder='Enter address line 1...' onChange={this.onChange} value={this.state.Address1}/>
                    </Form.Group>
                    <Form.Group controlId='Address2'>
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type='text' name='Address2' required placeholder='Enter address line 2...' onChange={this.onChange} value={this.state.Address2}/>
                    </Form.Group>
                    <Form.Group controlId='PostCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type='text' name='PostCode' required placeholder='Enter postcode...' onChange={this.onChange} value={this.state.PostCode}/>
                    </Form.Group>
                    <Form.Group controlId='DonorType'>
                        <Form.Label>Donor Type</Form.Label>
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
                        <Form.Control type='text' name='Notes' required placeholder='Enter any notes...' onChange={this.onChange} value={this.state.Notes}/>
                    </Form.Group>
                    <Form.Group controlId='Phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type='text' name='Phone' required placeholder='Enter phone number...' onChange={this.onChange} value={this.state.Phone}/>
                    </Form.Group>
                    <Form.Group>
                        <Button variant='primary' type='submit'>
                            Add Donor
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

// Reducer

export default connect(null, { addDonor })(AddDonorForm)
