import React, { Component } from 'react';
import {Button, Table, Dropdown, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import { BsPlusLg } from "react-icons/bs";
import PropTypes from 'prop-types';

import { AddDonorModal } from "./AddDonModal";
import { EditDonorModal } from './EditDonModal';
import SearchBar from "./SearchBar";
import { SuccessModal } from '../common/SuccessModal';
import { AddParticipationModal } from './AddParticipatingDonorModal';

import { getDonors, searchDonors, deleteDonor, editDonor } from '../../actions/donors';
import { getActiveCollection } from '../../actions/collections';
import { getCurrentParticipants } from '../../actions/participation';

// MAIN DONORS PAGE //

export class NewDonors extends Component {

    // Set Default States

    constructor(props){
        super(props);
        this.state={
            page: "Contacts",
            refresh: "NO",
            searchValue: "",
            monthValue: "",
            monthFilter:"All Contacts",
            monthOptions: [
                {
                    key: 0,
                    type: "All",
                    value: "",
                    filter: "All Contacts"
                },
                {
                    key: 1,
                    type: "Monthly",
                    value: "1",
                    filter: "Monthly Contacts"
                },
                {
                    key: 2,
                    type: "3 Months",
                    value: "3",
                    filter: "3 Months Contacts"
                },
                {
                    key: 3,
                    type: "Other",
                    value: "0",
                    filter: "Other Contacts"
                }
            ],
        }
    }

    // Imported Props

    static propTypes = {
        dons: PropTypes.array.isRequired,
        statusCol: PropTypes.array.isRequired,
        whol: PropTypes.array.isRequired,
        getDonors: PropTypes.func.isRequired,
        searchDonors: PropTypes.func.isRequired,
        deleteDonor: PropTypes.func.isRequired,
        editDonor: PropTypes.func.isRequired,
        getActiveCollection: PropTypes.func.isRequired,
        getCurrentParticipants: PropTypes.func.isRequired,
      };

    // Handle Data Request (Initial + Refresh)

    componentDidMount() {
        this.props.getDonors();
        this.props.getActiveCollection();
    }

    componentDidUpdate() {
        if (this.state.refresh === "YES") {
            this.props.getDonors();
            this.props.getActiveCollection();
            this.setState({
                refresh:"NO",
                searchValue: "",
                monthValue: "",
                monthFilter:"All Contacts",
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

            this.setState({successDeleteModalShow:true});
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
        let phone = e.target.Phone.value
        let involveNo = e.target.InvolveNo.value

        this.props.editDonor(donorId, fullName, firstName, lastName, email, address1, address2, postCode, donorType, notes, phone, involveNo);

        this.setState({successModalShow:true});
    };

    // Add Participant

    handleAddParticipant = (CollectionID, DonorID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, WholesaleID) => {
    
        let colId = CollectionID
        let donId = DonorID
        let payRec = PaymentRecieved
        let donTyp = DonationType
        let totDon = TotalDonated
        let droTim = DropOffTime
        let whoId = WholesaleID

        //let droTim = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(time)
        let CollID = colId
        let DonID = donId

        // Checks if Donor already Participant in collection, 
        // - If yes, new participant is not added 
        // - if no, new participant is added + if cash donation wholesale is updated
        
        this.props.getCurrentParticipants(CollID, DonID, payRec, donTyp, totDon, droTim, donId, colId, whoId)
        this.setState({successModalShow:true});
        
    };

    // Donor Type

    handleDonorType = (inputValue) => {
        let donorType = inputValue;

        if (donorType === "1") {
            let type = "Monthly"
            return type
        } else if (donorType === "3") {
            let type = "3 Months"
            return type
        } else if (donorType === "0") {
            let type = "Other"
            return type
        }
    };

    render() {
        const {donid, donfullname, donfirstname, donlastname, donemail, donaddress1, donaddress2, donpostcode, dondonortype, donnotes, donphone, doninvolveno, type, isAdd, reqStatus, collid, whoid, colldate}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false, refresh: "YES"});
        let editModalClose=()=>this.setState({editModalShow:false, refresh: "YES"});
        let successModalClose=()=>this.setState({successModalShow:false});
        let successDeleteModalClose=()=>this.setState({successDeleteModalShow:false});
        let addParticipationClose=()=>this.setState({addParticipationShow:false, refresh: "YES"});
       
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
                                    <Dropdown.Item key={option.key} onClick={() => this.handleFilter(option.value, option.filter)} href="#/contacts">{option.type}</Dropdown.Item>
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
                                <th>Options</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address 1</th>
                                <th>Address 2</th>
                                <th>Postcode</th>
                                <th>Type</th>
                                <th>Notes</th>
                                <th>Phone</th>
                                <th>Times Donated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.dons.map((don)=>
                                <tr key={don.DonorID}>
                                    <td>{don.DonorID}</td>
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
                                                    doninvolveno:don.InvolveNo,
                                                    successModalShow:false,
                                                    reqStatus:`${don.FullName} saved`,
                                                    type:"contact",
                                                    isAdd:false
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
                                            doninvolveno={doninvolveno}
                                            successModalShow={this.state.successModalShow}
                                            successModalClose={successModalClose}
                                            reqStatus={reqStatus}
                                            type={type}
                                            isAdd={isAdd}
                                            />

                                            {/* Add to Participation List */}

                                            <Dropdown.Item onClick={() => 
                                                this.setState({
                                                    addParticipationShow:true,
                                                    collid:this.props.statusCol[0].CollectionID,
                                                    whoid:this.props.whol[0].WholesaleID,
                                                    colldate:this.props.statusCol[0].CollectionDate,
                                                    reqStatus:`Participant for collection on ${this.props.statusCol[0].CollectionDate} saved`,
                                                    type:"donor",
                                                    isAdd:false,
                                                    donid:don.DonorID,
                                                    donfullname:don.FullName,
                                                })}
                                            >
                                                Add to Participant List
                                            </Dropdown.Item>
                                            <AddParticipationModal show={this.state.addParticipationShow}
                                            onHide={addParticipationClose}
                                            addpart={this.handleAddParticipant}
                                            collid={collid}
                                            whoid={whoid}
                                            colldate={colldate}
                                            successModalShow={this.state.successModalShow}
                                            successModalClose={successModalClose}
                                            reqStatus={reqStatus}
                                            type={type}
                                            isAdd={isAdd}
                                            donid={donid}
                                            donfullname={donfullname}
                                            />

                                            {/* Delete Donor */}

                                            <Dropdown.Item
                                                onClick={()=>{
                                                    this.setState({
                                                        successDeleteModalShow:false,
                                                        reqStatus:`${don.FullName} deleted`,
                                                        type:"contact",
                                                        isAdd:false,
                                                    }); 
                                                    this.handleDelete(don.DonorID)}}
                                            >
                                                Delete
                                            </Dropdown.Item>
                                            <SuccessModal show={this.state.successDeleteModalShow}
                                                onHide={successDeleteModalClose}
                                                reqStatus={reqStatus}
                                                type={type}
                                                isAdd={isAdd}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </td>
                                    <td>{don.FullName}</td>
                                    <td>{don.Email}</td>
                                    <td>{don.Address1}</td>
                                    <td>{don.Address2}</td>
                                    <td>{don.PostCode}</td>
                                    <td>{this.handleDonorType(don.DonorType)}</td>
                                    <td>{don.Notes}</td>
                                    <td>{don.Phone}</td>
                                    <td>{don.InvolveNo}</td>
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
    result: state.donors.result,
    statusCol: state.collections.statusCol,
    whol: state.wholesale.whol
});

export default connect(mapStateToProps, { getDonors, searchDonors, deleteDonor, editDonor, getActiveCollection, getCurrentParticipants })(NewDonors)
