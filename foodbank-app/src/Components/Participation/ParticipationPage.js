import React, { Component } from 'react';
import {Button, Table, Dropdown, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { BsPlusLg } from "react-icons/bs";

import PropTypes from 'prop-types';

import { AddParticipationModal } from './AddParticipationModal';
import { EditParticipationModal } from './EditParticipationModal';
import SearchBar from './SearchBar';

import { getDonors } from '../../actions/donors';
import { getCollections } from '../../actions/collections';
import { getParticipantList, editParticipant, deleteParticipant, getCurrentParticipants } from '../../actions/participation';
import { getWholesale } from '../../actions/wholesale';

// MAIN DONORS PAGE //

export class ParticipationPage extends Component {

    // Set Default States

    constructor(props){
        super(props);
        this.state={
            refresh: "NO",
            collectionDate:"Select Collection",
            collectionID:"Not Specified",
            value: dayjs('2022-04-07 T00:00:00'),
            donationTypeVal: null,
            totalDonatedVal: "0",
            paymentRecievedVal: "false",
            showAddButton: false,
            dons: [],
            searchValue: "",
            typeValue: "",
            typeFilter:"All",
            monthOptions: [
                {
                    key: 0,
                    type: "All",
                    value: "",
                    filter: "All"
                },
                {
                    key: 1,
                    type: "Drop-Off",
                    value: "1",
                    filter: "Drop-Off"
                },
                {
                    key: 2,
                    type: "Collection",
                    value: "2",
                    filter: "Collection"
                },
                {
                    key: 3,
                    type: "Cash Donation",
                    value: "3",
                    filter: "Cash Donation"
                },
                {
                    key: 4,
                    type: "Online Order",
                    value: "4",
                    filter: "Online Order"
                }
            ],
        }
    }

    // Imported Props

    static propTypes = {
        parsList: PropTypes.array.isRequired,
        colls: PropTypes.array.isRequired,
        dons: PropTypes.array.isRequired,

        getCollections: PropTypes.func.isRequired,
        getParticipantList: PropTypes.func.isRequired,
        deleteParticipant: PropTypes.func.isRequired,
        editParticipant: PropTypes.func.isRequired,
        getCurrentParticipants: PropTypes.func.isRequired,
        getDonors: PropTypes.func.isRequired,
        getWholesale:PropTypes.func.isRequired,
        whol: PropTypes.array.isRequired
      };

    // Handle Data Request (Initial + Refresh)

    componentDidMount() {
        this.props.getCollections();
        this.props.getDonors();
    }

    componentDidUpdate() {
        if (this.state.refresh === "YES") {
            let collection = this.state.collectionID;
            let searchInput =this.state.searchValue;
            let type = this.state.typeValue;
            this.props.getParticipantList(collection, searchInput, type);
            this.props.getWholesale(collection)
            this.props.getDonors();
            this.setState({
                refresh:"NO"
            });
        }
    }

    // Collection Date Picker

    handleFilter = (CollectionID, CollectionDate) => {
        let collection = CollectionID;
        let searchInput =this.state.searchValue;
        let type = this.state.typeValue;
        this.props.getWholesale(collection)
        this.props.getParticipantList(collection, searchInput, type);
        this.setState({
            collectionDate: CollectionDate,
            collectionID: collection,
            showAddButton: true
        });
    }

    // Participant Type Filter

    handleTypeFilter = (value, filter) => {
        let type = value;
        let collection = this.state.collectionID;
        let searchInput = this.state.searchValue;
        
        this.props.getParticipantList(collection, searchInput, type);

        this.setState({
            typeValue: type,
            typeFilter: filter
        });
        
    }

    // Add Participant

    handleAddParticipant = (CollectionID, DonorID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, WholesaleID) => {
        
        let colId = CollectionID
        let donId = DonorID
        let payRec = PaymentRecieved
        let donTyp = DonationType
        let totDon = TotalDonated
        let time = DropOffTime
        let whoId = WholesaleID

        let droTim = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(time)
        let CollID = colId
        let DonID = donId

        // Checks if Donor already Participant in collection, 
        // - If yes, new participant is not added 
        // - if no, new participant is added + if cash donation wholesale is updated
        
        this.props.getCurrentParticipants(CollID, DonID, payRec, donTyp, totDon, droTim, donId, colId, whoId)
    };

    // Edit Participant

    handleEditParticipant = (CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID) => {

        this.props.editParticipant(CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID)
    };

    // Participant Delete

    handleDelete = (parId, parTotDon, collId, wholId) => {
        if(window.confirm('Are you sure?')){
            this.props.deleteParticipant(parId, parTotDon, collId, wholId);
            this.setState({refresh:"YES"})
        }
    }

    // Participation Search

    handleSearch = (searchValue) => {
        let collection = this.state.collectionID;
        let searchInput = searchValue;
        this.setState({searchValue: searchInput});
        let type = this.state.typeValue;
        this.props.getParticipantList(collection, searchInput, type);
    }
    

    // Participant Type

    handleParticipantType = (inputValue) => {
        let participantType = inputValue;

        if (participantType === "0") {
            let type = "N/A"
            return type
        } else if (participantType === "1") {
            let type = "Drop-Off"
            return type
        } else if (participantType === "2") {
            let type = "Collection"
            return type
        } else if (participantType === "3") {
            let type = "Cash Donation"
            return type
        } else if (participantType === "4") {
            let type = "Online Order"
            return type
        } else {
            let type = "N/A"
            return type
        }
    };

    // Participant Payment

    handleParticipantPayment = (inputValue) => {
        let participantPayment = inputValue;

        if (participantPayment === "true") {
            let recieved = "Yes"
            return recieved
        } else if (participantPayment === "false") {
            let recieved = "No"
            return recieved
        } else {
            let recieved = "N/A"
            return recieved
        }
    };

    render() {
        const {parid, donid, whoid, collid, colldate, donfullname, donemail, donaddress1, donaddress2, donpostcode, donnotes, donphone, pardontype, partotdon, partime, parrec, dons}=this.state;
        let addParticipationClose=()=>this.setState({addParticipationShow:false, refresh: "YES"});
        let editParticipationClose=()=>this.setState({editParticipationShow:false, refresh: "YES"});

        const typeChanger = (inputValue) => {
            this.setState({donationTypeVal:inputValue});
        };

        const handleChange = (newValue) => {
            this.setState({value:newValue});
        };
        
        const totDonChange = (inputValue) => {
            this.setState({totalDonatedVal:inputValue});
        };

        const payRecChange = (inputValue) => {
            this.setState({paymentRecievedVal:inputValue});
        };
    
        return (
            <div>

                <div style={{margin:"auto"}}>
                    <Row>

                        <Dropdown className="participation-dropdownFilter">

                            {/* Collection Filter */}

                            <Dropdown.Toggle className="participation-dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                                {this.state.collectionDate}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.props.colls.map((coll) => (
                                    <Dropdown.Item key={coll.CollectionID} onClick={() => this.handleFilter(coll.CollectionID, coll.CollectionDate)} href="#/participants">{coll.CollectionDate}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Participant Type Filter */}
                        {(this.state.showAddButton === true) &&<Dropdown className="participation-dropdownFilter">

                            <Dropdown.Toggle className="participationType-dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                                {this.state.typeFilter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.state.monthOptions.map((option) => (
                                    <Dropdown.Item key={option.key} onClick={() => this.handleTypeFilter(option.value, option.filter)} href="#/participants">{option.type}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>}

                        {/* Participant Search */}

                        {(this.state.showAddButton === true) &&<SearchBar callback={(searchValue) => this.handleSearch(searchValue)}/>}

                        {/* Add New Participant Modal */}

                        {(this.state.showAddButton === true) &&<Button variant="secondary" className="participant-addButton"
                        onClick={()=>this.setState({
                            addParticipationShow:true,
                            collid:this.state.collectionID,
                            whoid:this.props.whol[0].WholesaleID,
                            dons:this.props.dons,
                            colldate:this.state.collectionDate
                        })}>
                            <BsPlusLg className="participant-addButton-Icon"/>
                        </Button>}
                        <AddParticipationModal 
                            show={this.state.addParticipationShow}
                            onHide={addParticipationClose}
                            addpart={this.handleAddParticipant}
                            collid={collid}
                            whoid={whoid}
                            dons={dons}
                            colldate={colldate}
                        />

                    </Row>

                </div>
                
                {/* Participant Table */}
                <div style={{overflowX:"auto"}}>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Options</th>
                                <th>Name</th>
                                <th>Donation Type</th>
                                <th>Total Donated</th>
                                <th>Payment Recieved</th>
                                <th>Drop-Off Time</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.parsList.map((par)=>
                                <tr key={par.ParticipationID}>
                                    <td>{par.ParticipationID}</td>
                                    <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>

                                            {/* Edit Donor Modal */}

                                            <Dropdown.Item onClick={() => 
                                                    {this.setState({
                                                        editParticipationShow:true,
                                                        parid:par.ParticipationID,
                                                        donid:par.DonorID,
                                                        collid:par.CollectionID,
                                                        whoid:par.WholesaleID,
                                                        donfullname:par.FullName,
                                                        donemail:par.Email,
                                                        donaddress1:par.Address1,
                                                        donaddress2:par.Address2,
                                                        donpostcode:par.PostCode,
                                                        donnotes:par.Notes,
                                                        donphone:par.Phone,
                                                        pardontype:par.DonationType,
                                                        partotdon:par.TotalDonated,
                                                        partime:dayjs(`2022-04-07 T${par.DropOffTime}`),
                                                        parrec:par.PaymentRecieved
                                                    }); 
                                                    typeChanger(par.DonationType); 
                                                    handleChange(dayjs(`2022-04-07 T${par.DropOffTime}`));
                                                    totDonChange(par.TotalDonated);
                                                    payRecChange(par.PaymentRecieved)}}>
                                                More Information...
                                            </Dropdown.Item>
                                            <EditParticipationModal show={this.state.editParticipationShow}
                                                onHide={editParticipationClose}
                                                editpart={this.handleEditParticipant}
                                                parid={parid}
                                                donid={donid}
                                                collid={collid}
                                                whoid={whoid}
                                                donfullname={donfullname}
                                                donemail={donemail}
                                                donaddress1={donaddress1}
                                                donaddress2={donaddress2}
                                                donpostcode={donpostcode}
                                                donnotes={donnotes}
                                                donphone={donphone}
                                                pardontype={pardontype}
                                                partotdon={partotdon}
                                                partime={partime}
                                                parrec={parrec}
                                                value={this.state.value}
                                                donationTypeVal={this.state.donationTypeVal}
                                                typeChanger={typeChanger}
                                                handleChange={handleChange}
                                                totalDonatedVal={this.state.totalDonatedVal}
                                                paymentRecievedVal={this.state.paymentRecievedVal}
                                                totDonChange={totDonChange}
                                                payRecChange={payRecChange}
                                            />
                                            {/* Delete Donor */}

                                            <Dropdown.Item
                                                onClick={()=>this.handleDelete(par.ParticipationID, par.TotalDonated, par.CollectionID, par.WholesaleID)}>
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </td>
                                    <td>{par.FullName}</td>
                                    <td>{this.handleParticipantType(par.DonationType)}</td>
                                    <td>{par.TotalDonated}</td>
                                    <td>{this.handleParticipantPayment(par.PaymentRecieved)}</td>
                                    <td>{par.DropOffTime}</td>
                                    <td>{par.Email}</td>
                                    <td>{par.Phone}</td>
                                    
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
    parsList: state.participants.parsList,
    result: state.participants.result,
    colls: state.collections.colls,
    dons: state.donors.dons,
    whol: state.wholesale.whol
});

export default connect(mapStateToProps, { getCollections, getWholesale, getParticipantList, deleteParticipant, editParticipant, getCurrentParticipants, getDonors })(ParticipationPage)
