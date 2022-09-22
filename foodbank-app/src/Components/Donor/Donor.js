import React, { Component } from 'react';
import {Button, Table, Dropdown, Modal, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { BsPlusLg } from "react-icons/bs";
import PropTypes from 'prop-types';
import { AddDonorModal } from "./AddDonModal";
import SearchBar from "./SearchBar";

import { getDonors, searchDonors, deleteDonor, editDonor } from '../../actions/donors';


// EDIT DONOR MODAL (Function) //

function EditDonorModal(props) {
    const { 
        show,
        onHide,
        edit,
        donid,
        donfirstname,
        donlastname,
        donfullname,
        donemail,
        donaddress1,
        donaddress2,
        donpostcode,
        dondonortype,
        donnotes,
        donphone,
        donaddemail,
    } = props

    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Edit Donor: {donfullname}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={edit}>
                                <Form.Group controlId='DonorID'>
                                    <Form.Label>DonorID</Form.Label>
                                    <Form.Control type='text' name='DonorID' disabled placeholder='DonorID' defaultValue={donid} />
                                </Form.Group>
                                <Form.Group controlId='FirstName'>
                                    <Form.Label>FirstName</Form.Label>
                                    <Form.Control type='text' name='FirstName' required placeholder='FirstName' defaultValue={donfirstname} />
                                </Form.Group>
                                <Form.Group controlId='LastName'>
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control type='text' name='LastName' required placeholder='LastName' defaultValue={donlastname} />
                                </Form.Group>
                                <Form.Group controlId='FullName'>
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control type='text' name='FullName' disabled placeholder='FullName' defaultValue={donfullname}/>
                                </Form.Group>
                                <Form.Group controlId='Email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='text' name='Email' required placeholder='Email' defaultValue={donemail} />
                                </Form.Group>
                                <Form.Group controlId='Address1'>
                                    <Form.Label>Address1</Form.Label>
                                    <Form.Control type='text' name='Address1' required placeholder='Address1' defaultValue={donaddress1} />
                                </Form.Group>
                                <Form.Group controlId='Address2'>
                                    <Form.Label>Address2</Form.Label>
                                    <Form.Control type='text' name='Address2' required placeholder='Address2' defaultValue={donaddress2} />
                                </Form.Group>
                                <Form.Group controlId='PostCode'>
                                    <Form.Label>PostCode</Form.Label>
                                    <Form.Control type='text' name='PostCode' required placeholder='PostCode' defaultValue={donpostcode} />
                                </Form.Group>
                                <Form.Group controlId='DonorType'>
                                    <Form.Label>DonorType</Form.Label>
                                    <Form.Select aria-label="DonorType" required defaultValue={dondonortype} >
                                        <option>Please select donor type...</option>
                                        <option value="1">1 Month</option>
                                        <option value="3">3 Months</option>
                                        <option value="1,spec">1 Month SPECIAL</option>
                                        <option value="3,spec">3 Months SPECIAL</option>
                                    </Form.Select>
                                </Form.Group>  
                                <Form.Group controlId='Notes'>
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type='text' name='Notes' required placeholder='Notes' defaultValue={donnotes} />
                                </Form.Group>
                                <Form.Group controlId='Phone'>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type='text' name='Phone' required placeholder='Phone' defaultValue={donphone} />
                                </Form.Group>
                                <Form.Group controlId='AddEmail'>
                                    <Form.Label>AddEmail</Form.Label>
                                    <Form.Control type='text' name='AddEmail' required placeholder='AddEmail' defaultValue={donaddemail} />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Edit Donor
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


// MAIN DONORS PAGE //


export class NewDonors extends Component {

    // Set Default States

    constructor(props){
        super(props);
        this.state={
            refresh: "NO",
            searchValue: "",
            monthValue: "",
            monthFilter:"All Donors",
            monthOptions: [
                {
                    key: 0,
                    type: "All",
                    value: "",
                    filter: "All Donors"
                },
                {
                    key: 1,
                    type: "Monthly",
                    value: "1",
                    filter: "Monthly Donors"
                },
                {
                    key: 2,
                    type: "3 Months",
                    value: "3",
                    filter: "3 Months Donors"
                },
                {
                    key: 3,
                    type: "Special",
                    value: "spec",
                    filter: "Special Donors"
                }
            ],

        }
    }

    // Imported Props

    static propTypes = {
        dons: PropTypes.array.isRequired,
        getDonors: PropTypes.func.isRequired,
        searchDonors: PropTypes.func.isRequired,
        deleteDonor: PropTypes.func.isRequired,
        editDonor: PropTypes.func.isRequired,
      };

    // Handle Data Request (Initial + Refresh)

    componentDidMount() {
        let token = window.localStorage.getItem('token')
        this.props.getDonors();
    }

    componentDidUpdate() {
        if (this.state.refresh === "YES") {
            this.props.getDonors();
            this.setState({
                refresh:"NO",
                searchValue: "",
                monthValue: "",
                monthFilter:"All Donors",
            });
        }
    }

    // Donor Month Type Filter

    handleFilter = (value, filter) => {
        let monthType = value;
        let searchInput = this.state.searchValue;
        this.props.searchDonors(monthType, searchInput);
        this.setState({
            monthValue: monthType,
            monthFilter: filter
        })
    }

    // Donor Search

    handleSearch = (searchValue) => {
        let monthType = this.state.monthValue;
        let searchInput = searchValue;
        this.setState({searchValue: searchInput});
        this.props.searchDonors(monthType, searchInput);
    }

    // Donor Delete

    handleDelete = (donId) => {
        if(window.confirm('Are you sure?')){
            this.props.deleteDonor(donId);
        }
    }

    // Donor Update

    handleEditSubmit = (e) => {
        e.preventDefault()
        let fullName = e.target.FirstName.value + " " + e.target.LastName.value;

        let donorId = e.target.DonorID.value;
        let firstName = e.target.FirstName.value;
        let lastName = e.target.LastName.value;
        let email = e.target.Email.value;
        let address1 = e.target.Address1.value;
        let address2 = e.target.Address2.value;
        let postCode = e.target.PostCode.value;
        let donorType = e.target.DonorType.value;
        let notes = e.target.Notes.value;
        let phone = e.target.Phone.value;
        let addEmail = e.target.AddEmail.value;

        this.props.editDonor(donorId, fullName, firstName, lastName, email, address1, address2, postCode, donorType, notes, phone, addEmail);
        this.setState({editModalShow:false, refresh: "YES"});
    }

    render() {
        const {donid, donfullname, donfirstname, donlastname, donemail, donaddress1, donaddress2, donpostcode, dondonortype, donnotes, donphone, donaddemail}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false, refresh: "YES"});
        let editModalClose=()=>this.setState({editModalShow:false, refresh: "YES"});

       
        return (
            <div>

                <div style={{margin:"auto"}}>
                    <Row>

                        {/* Donor Month Type Filter */}

                        <Dropdown className="dropdownFilter">
                            <Dropdown.Toggle className="dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                                {this.state.monthFilter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.state.monthOptions.map((option) => (
                                    <Dropdown.Item key={option.key} onClick={() => this.handleFilter(option.value, option.filter)} href="#/donor">{option.type}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Donor Search */}

                        <SearchBar callback={(searchValue) => this.handleSearch(searchValue)}/>

                        {/* Add New Donor Modal */}

                        <Button variant="secondary" className="addButton"
                        onClick={()=>this.setState({addModalShow:true})}>
                            <BsPlusLg className="addButton-Icon"/>
                        </Button>
                        <AddDonorModal show={this.state.addModalShow}
                        onHide={addModalClose}/>

                    </Row>

                </div>
                
                {/* Donor Table */}
                <div style={{overflowX:"auto"}}>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Forname</th>
                                <th>Surname</th>
                                <th>Email</th>
                                <th>Address 1</th>
                                <th>Address 2</th>
                                <th>Postcode</th>
                                <th>Type</th>
                                <th>Notes</th>
                                <th>Phone</th>
                                <th>Additional Email</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.dons.map((don)=>
                                <tr key={don.DonorID}>
                                    <td>{don.DonorID}</td>
                                    <td>{don.FullName}</td>
                                    <td>{don.FirstName}</td>
                                    <td>{don.LastName}</td>
                                    <td>{don.Email}</td>
                                    <td>{don.Address1}</td>
                                    <td>{don.Address2}</td>
                                    <td>{don.PostCode}</td>
                                    <td>{don.DonorType}</td>
                                    <td>{don.Notes}</td>
                                    <td>{don.Phone}</td>
                                    <td>{don.AddEmail}</td>
                                    <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>

                                            {/* Edit Donor Modal */}

                                            <Dropdown.Item
                                                onClick={()=>this.setState({editModalShow:true,
                                                    donid:don.DonorID,
                                                    donfullname:don.FullName,
                                                    donfirstname:don.FirstName,
                                                    donlastname:don.LastName,
                                                    donemail:don.Email,
                                                    donaddress1:don.Address1,
                                                    donaddress2:don.Address2,
                                                    donpostcode:don.PostCode,
                                                    dondonortype:don.DonorType,
                                                    donnotes:don.Notes,
                                                    donphone:don.Phone,
                                                    donaddemail:don.AddEmail
                                                    })}
                                            >
                                                Edit
                                            </Dropdown.Item>

                                            <EditDonorModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            edit={this.handleEditSubmit}
                                            donid={donid}
                                            donfirstname={donfirstname}
                                            donlastname={donlastname}
                                            donfullname={donfullname}
                                            donemail={donemail}
                                            donaddress1={donaddress1}
                                            donaddress2={donaddress2}
                                            donpostcode={donpostcode}
                                            dondonortype={dondonortype}
                                            donnotes={donnotes}
                                            donphone={donphone}
                                            donaddemail={donaddemail}
                                            />

                                            {/* Delete Donor */}

                                            <Dropdown.Item
                                                onClick={()=>this.handleDelete(don.DonorID)}
                                            >
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

// Reducer

const mapStateToProps = (state) => ({
    dons: state.donors.dons,
    result: state.donors.result
});

export default connect(mapStateToProps, { getDonors, searchDonors, deleteDonor, editDonor })(NewDonors)
