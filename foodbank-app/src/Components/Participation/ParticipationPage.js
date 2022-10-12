import React, { Component } from 'react';
import {Table, Dropdown, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import PropTypes from 'prop-types';

import { EditParticipationModal } from './EditParticipationModal';

import { getCollections } from '../../actions/collections';
import { getParticipantList, editParticipant, deleteParticipant, getCurrentParticipants } from '../../actions/participation';

// MAIN DONORS PAGE //

export class ParticipationPage extends Component {

    // Set Default States

    constructor(props){
        super(props);
        this.state={
            refresh: "NO",
            collectionDate:"Select Collection",
            collectionID:"Not Specified",
            value: dayjs('2022-04-07'),
            donationTypeVal: null,
            totalDonatedVal: "0",
            paymentRecievedVal: "false"
        }
    }

    // Imported Props

    static propTypes = {
        parsList: PropTypes.array.isRequired,
        colls: PropTypes.array.isRequired,
        getCollections: PropTypes.func.isRequired,
        getParticipantList: PropTypes.func.isRequired,
        deleteParticipant: PropTypes.func.isRequired,
        editParticipant: PropTypes.func.isRequired,
        getCurrentParticipants: PropTypes.func.isRequired
      };

    // Handle Data Request (Initial + Refresh)

    componentDidMount() {
        this.props.getCollections();
    }

    componentDidUpdate() {
        if (this.state.refresh === "YES") {
            let collection = this.state.collectionID;
            this.props.getParticipantList(collection);
            this.setState({
                refresh:"NO"
            });
        }
    }

    // Collection Date Picker

    handleFilter = (CollectionID, CollectionDate) => {
        let collection = CollectionID;
        this.props.getParticipantList(collection);
        this.setState({
            collectionDate: CollectionDate,
            collectionID: collection
        });
    }

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

    render() {
        const {parid, donid, whoid, collid, donfullname, donemail, donaddress1, donaddress2, donpostcode, donnotes, donphone, pardontype, partotdon, partime, parrec}=this.state;
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

                        {/* Collection Filter */}

                        <Dropdown className="dropdownFilter">
                            <Dropdown.Toggle className="dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                                {this.state.collectionDate}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.props.colls.map((coll) => (
                                    <Dropdown.Item key={coll.CollectionID} onClick={() => this.handleFilter(coll.CollectionID, coll.CollectionDate)} href="#/participants">{coll.CollectionDate}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                    </Row>

                </div>
                
                {/* Participant Table */}
                <div style={{overflowX:"auto"}}>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                    <td>{par.FullName}</td>
                                    <td>{par.DonationType}</td>
                                    <td>{par.TotalDonated}</td>
                                    <td>{par.PaymentRecieved}</td>
                                    <td>{par.DropOffTime}</td>
                                    <td>{par.Email}</td>
                                    <td>{par.Phone}</td>
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
    colls: state.collections.colls
});

export default connect(mapStateToProps, { getCollections, getParticipantList, deleteParticipant, editParticipant, getCurrentParticipants })(ParticipationPage)
