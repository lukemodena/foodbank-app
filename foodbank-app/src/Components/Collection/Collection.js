import React,{Component} from "react";
import {Button, Table, Dropdown, Row} from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";
import SearchBar from "./SearchBar";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AddCollectionModal } from "./AddCollModal";
import { EditCollectionModal } from "./EditCollModal";
import { EditParticipationModal } from "../Participation/Participation";
import { EditWholesaleModal } from "./Wholesale/EditWholesaleModal";

import { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto } from '../../actions/collections';
import { addWholesale, getWholesale, editWholesale } from "../../actions/wholesale";
import { getDonors } from "../../actions/donors";
import { addParticipant, getParticipants, editParticipant, getCurrentParticipants } from "../../actions/participation";

export class NewCollection extends Component{

    constructor(props){
        super(props);
        this.state={
            refresh: "NO",
            colls:[],
            whol:[],
            dons:[],
            pars: [],
            colltotalcost: null,
            searchValue: [],
            startDate: "",
            endDate: "",
            monthValue: "",
            monthFilter:"All",
            monthOptions: [
                {
                    key: 0,
                    type: "All",
                    value: "0",
                    filter: "All Collections"
                },
                {
                    key: 1,
                    type: "Monthly",
                    value: "1",
                    filter: "Monthly Collections"
                },
                {
                    key: 2,
                    type: "3 Months",
                    value: "3",
                    filter: "3 Months Collections"
                }
            ],
            photo: {
                photofilename: "anonymous.png",
                imagesrc: 'http://127.0.0.1:8000/media/anonymous.png',
                photofile: []
            }

        }
    }

    // Imported Props

    static propTypes = {
        colls: PropTypes.array.isRequired,
        dons: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
        getCollections: PropTypes.func.isRequired,
        searchCollections: PropTypes.func.isRequired,
        deleteCollection: PropTypes.func.isRequired,
        editCollection: PropTypes.func.isRequired,
        addCollectionPhoto: PropTypes.func.isRequired,
        addWholesale: PropTypes.func.isRequired,
        getWholesale: PropTypes.func.isRequired,
        editWholesale: PropTypes.func.isRequired,
        whol: PropTypes.array.isRequired,
        pars: PropTypes.array.isRequired,
        addParticipant: PropTypes.func.isRequired,
        getParticipants: PropTypes.func.isRequired,
        editParticipant: PropTypes.func.isRequired, 
        getCurrentParticipants: PropTypes.func.isRequired, 
        };


    // Handle Data Request (Initial + Refresh)

    componentDidMount(){
        this.props.getCollections();
        const total = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 )
        this.setState({colltotalcost: total})
    }

    componentDidUpdate() {
        if (this.state.refresh === "YES") {
            this.props.getCollections();
            const total = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 )
        
            this.setState({
                refresh:"NO",
                startDate: "",
                endDate: "",
                monthValue: "",
                monthFilter:"All Collections",
                colltotalcost: total
            });
        }
    }

    // Collection Month Type Filter

    handleFilter = (value, filter) => {
        let monthType = value;

        if (monthType === "0") {
            this.props.getCollections();
            const total = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 );
            this.setState({
                monthValue: monthType,
                monthFilter: filter,
                colltotalcost: total
            });
        } else {
            let searchInputStart = this.state.startDate;
            let searchInputEnd = this.state.endDate;
            this.props.searchCollections(monthType, searchInputStart, searchInputEnd);
            const total = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 );

            this.setState({
                monthValue: monthType,
                monthFilter: filter,
                colltotalcost: total
            }) 
        }
    }

    // Collection Search

    handleSearch = (startDate, endDate) => {
        let monthType = this.state.monthValue;
        let searchInputStart = startDate;
        let searchInputEnd = endDate;
        this.setState({
            startDate: searchInputStart,
            endDate: searchInputEnd
        });
        this.props.searchCollections(monthType, searchInputStart, searchInputEnd);
    }

    // Collection Delete

    handleDelete = (collId) => {
        if(window.confirm('Are you sure?')){
            this.props.deleteCollection(collId);
            this.setState({refresh:"YES"})
        }
    }


    // Locally Store Photo
    handleFileSelected = (e) => {
        const file = e.target.files[0];
        const filename = e.target.files[0].name;
        this.setState({ 
            photo: {
                photofilename: filename,
                photofile: file,
                imagesrc: 'http://127.0.0.1:8000/media/'+filename
            }
        });
    }

    // Collection Update + Photo Update

    handleFileSubmit = (e) => {
        e.preventDefault()

        let file = e.target.photofile.files[0];

        if (file == null) {
            let collectionId = e.target.CollectionID.value;
            let date = e.target.CollectionDate.value;
            let type = e.target.Type.value;
            let totalWeight = e.target.TotalWeight.value;
            let totalCost = e.target.TotalCost.value;
            let photo = e.target.CollectionPhoto.value;
            let spreadsheet = e.target.CollectionSpreadsheet.value;

            this.props.editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet);
        } else {
            const formData = new FormData();
        
            let photo = e.target.photofile.files[0].name;
            let collectionId = e.target.CollectionID.value;
            let date = e.target.CollectionDate.value;
            let type = e.target.Type.value;
            let totalWeight = e.target.TotalWeight.value;
            let totalCost = e.target.TotalCost.value;
            let ogfile = e.target.CollectionPhoto.value;
            let spreadsheet = e.target.CollectionSpreadsheet.value;

            formData.append(
                "myFile",
                file
            );


            this.props.addCollectionPhoto(file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet);
        }
    };

    // Get Wholesale

    handleGetWholesale = (collid) => {
        let collId = collid
        this.props.getWholesale(collId)
        this.props.getDonors()
    };

    // Edit Wholesale

    handleEditWholesale = (e) => {
        e.preventDefault()

        let wholId = e.target.WholesaleID.value;
        let totalDonated = e.target.TotalDonated.value;
        let totalSpent = e.target.TotalSpent.value;
        let collId = e.target.CollectionID.value;
        let newDonationVal = e.target.AddDonation.value;
        let wholesaleReceipt = e.target.Receipt.value;

        this.props.editWholesale(wholId, totalDonated, totalSpent, collId, newDonationVal, wholesaleReceipt)
    };

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

    
    render(){
        const {collid, colldate, colltype, colltotalweight, colltotalcost, collphoto, collspreadsheet, whoid, whototaldonated, whototalspent, whoremainder, whoreceipt, dons}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false, refresh: "YES"});
        let editModalClose=()=>this.setState({editModalShow:false, refresh: "YES"});
        let editParticipationClose=()=>this.setState({editParticipationShow:false, refresh: "YES"});
        let editWholesaleClose=()=>this.setState({editWholesaleShow:false, refresh: "YES"});

        return(
            <div>
                <div style={{margin:"auto"}}>
                    <Row>

                        {/* Collection Month Type Filter */}

                        <Dropdown className="dropdownFilter">
                            <Dropdown.Toggle className="dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                                {this.state.monthFilter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.state.monthOptions.map((option) => (
                                    <Dropdown.Item key={option.key} onClick={() => this.handleFilter(option.value, option.filter)} href="#/collections">{option.type}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Collection Search */}

                        <SearchBar callback={(startDate, endDate) => this.handleSearch(startDate, endDate)}/>

                        {/* Add New Collection Modal */}

                        <Button variant="secondary" className="addButton"
                        onClick={()=>this.setState({addModalShow:true})}>
                            <BsPlusLg className="addButton-Icon"/>
                        </Button>
                        <AddCollectionModal show={this.state.addModalShow}
                        onHide={addModalClose}/>

                        <Button variant="font-size: 15px;" disabled className="totalButton">
                            {this.props.total}kg
                        </Button>
                    </Row>
                </div>
                {/* Collection Table */}                    
                <div style={{overflowX:"auto"}}>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Total Weight</th>
                                <th>Estimated Cost</th>
                                <th>Photo</th>
                                <th>Spreadsheet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.colls.map(coll=>
                                <tr key={coll.CollectionID}>
                                    <td>{coll.CollectionID}</td>
                                    <td>{coll.CollectionDate}</td>
                                    <td>{coll.Type}</td>
                                    <td>{coll.TotalWeight}</td>
                                    <td>{coll.TotalCost}</td>
                                    <td>{coll.CollectionPhoto}</td>
                                    <td>{coll.CollectionSpreadsheet}</td>
                                    <td>
                                        
                                        <Dropdown onToggle={() => this.handleGetWholesale(coll.CollectionID)}>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                ...
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>

                                                <Dropdown.Item 
                                                onClick={()=>this.setState({editModalShow:true,
                                                    collid:coll.CollectionID,
                                                    colldate:coll.CollectionDate,
                                                    colltype:coll.Type,
                                                    colltotalweight:coll.TotalWeight,
                                                    colltotalcost:coll.TotalCost,
                                                    collphoto:coll.CollectionPhoto,
                                                    collphotourl:`http://127.0.0.1:8000/media/${coll.CollectionPhoto}`,
                                                    collspreadsheet:coll.CollectionSpreadsheet
                                                    })}
                                                >
                                                        Edit
                                                </Dropdown.Item>
                                                <EditCollectionModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                fileSelect={this.handleFileSelected}
                                                addphoto={this.handleFileSubmit}
                                                collid={collid}
                                                colldate={colldate}
                                                colltype={colltype}
                                                colltotalweight={colltotalweight}
                                                colltotalcost={colltotalcost}
                                                collphoto={collphoto}
                                                collspreadsheet={collspreadsheet}
                                                />
                                                <Dropdown.Item
                                                onClick={()=>this.handleDelete(coll.CollectionID)}>
                                                    Delete
                                                </Dropdown.Item>

                                                <Dropdown.Item onClick={() => 
                                                    this.setState({
                                                        editWholesaleShow:true,
                                                        collid:coll.CollectionID,
                                                        whoid:this.props.whol[0].WholesaleID,
                                                        whototaldonated:this.props.whol[0].TotalDonated,
                                                        whototalspent:this.props.whol[0].TotalSpent,
                                                        whoremainder:this.props.whol[0].Remainder,
                                                        whoreceipt:this.props.whol[0].WholesaleReceipt
                                                    })}
                                                >
                                                    Wholesale
                                                </Dropdown.Item>
                                                <EditWholesaleModal show={this.state.editWholesaleShow}
                                                onHide={editWholesaleClose}
                                                editwhol={this.handleEditWholesale}
                                                collid={collid}
                                                whoid={whoid}
                                                whototaldonated={whototaldonated}
                                                whototalspent={whototalspent}
                                                whoremainder={whoremainder}
                                                whoreceipt={whoreceipt}
                                                />

                                                <Dropdown.Item onClick={() => 
                                                    this.setState({
                                                        editParticipationShow:true,
                                                        collid:coll.CollectionID,
                                                        whoid:this.props.whol[0].WholesaleID,
                                                        dons:this.props.dons,
                                                        colldate:coll.CollectionDate
                                                    })}
                                                >
                                                    Participation
                                                </Dropdown.Item>
                                                <EditParticipationModal show={this.state.editParticipationShow}
                                                onHide={editParticipationClose}
                                                addpart={this.handleAddParticipant}
                                                collid={collid}
                                                whoid={whoid}
                                                dons={dons}
                                                colldate={colldate}
                                                />
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
    colls: state.collections.colls,
    whol: state.wholesale.whol,
    dons: state.donors.dons,
    pars: state.participants.pars,
    result: state.collections.result,
    total: state.collections.total
});

export default connect(mapStateToProps, { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto, addWholesale, getWholesale, editWholesale, getDonors, getParticipants, addParticipant, editParticipant, getCurrentParticipants})(NewCollection)
