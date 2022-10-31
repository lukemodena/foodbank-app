import React,{Component} from "react";
import {Button, Table, Dropdown, Row} from 'react-bootstrap';
import { BsXCircle } from "react-icons/bs";
import SearchBar from "./SearchBar";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { EditCollectionModal } from "./EditCollModal";
import { AddParticipationModal } from "../Participation/AddParticipationModal";
import { EditWholesaleModal } from "./Wholesale/EditWholesaleModal";
import { SuccessModal } from "../common/SuccessModal";

import { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto, checkStatusEdit, deleteCollectionsMulti } from '../../actions/collections';
import { addWholesale, getWholesale, editWholesale } from "../../actions/wholesale";
import { getDonors } from "../../actions/donors";
import { addParticipant, getCurrentParticipants } from "../../actions/participation";

export class OldCollection extends Component{

    constructor(props){
        super(props);
        this.state={
            refresh: "NO",
            colls:[],
            whol:[],
            dons:[],
            pars: [],
            totalWeight: null,
            totalCost: null,
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
                    filter: "All"
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
                imagesrc: `${process.env.REACT_APP_API}media/photos/anonymous.png`,
                photofile: []
            },
            isChecked:[]
        }
    }

    // Imported Props

    static propTypes = {
        colls: PropTypes.array.isRequired,
        dons: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
        totalc: PropTypes.number.isRequired,
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
        getCurrentParticipants: PropTypes.func.isRequired,
        checkStatusEdit: PropTypes.func.isRequired,
        deleteCollectionsMulti: PropTypes.func.isRequired,
        };


    // Handle Data Request (Initial + Refresh)

    componentDidMount(){
        let status = 'ARCHIVED';
        this.props.getCollections(status);
        const totalw = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 );
        const totalc = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalCost) , 0 );

        this.setState({
            totalWeight: totalw,
            totalCost: totalc
        })
    }

    componentDidUpdate() {
        if (this.state.refresh === "YES") {
            let status = 'ARCHIVED';
            this.props.getCollections(status);
            const totalw = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 );
            const totalc = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalCost) , 0 );
        
            this.setState({
                refresh:"NO",
                startDate: "",
                endDate: "",
                monthValue: "",
                monthFilter:"All",
                totalWeight: totalw,
                totalCost: totalc
            });
        }
    }

    // Collection Month Type Filter

    handleFilter = (value, filter) => {
        let monthType = value;
        let status = 'ARCHIVED';

        if (monthType === "0") {
            this.props.getCollections(status);
            const totalw = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 );
            const totalc = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalCost) , 0 );
            this.setState({
                monthValue: monthType,
                monthFilter: filter,
                totalWeight: totalw,
                totalCost: totalc
            });
        } else {
            let searchInputStart = this.state.startDate;
            let searchInputEnd = this.state.endDate;
            this.props.searchCollections(monthType, searchInputStart, searchInputEnd, status);
            const totalw = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 );
            const totalc = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalCost) , 0 );

            this.setState({
                monthValue: monthType,
                monthFilter: filter,
                totalWeight: totalw,
                totalCost: totalc
            }) 
        }
    }

    // Collection Search

    handleSearch = (startDate, endDate) => {
        let monthType = this.state.monthValue;
        let startYear = Intl.DateTimeFormat('en-GB', { year: "numeric" }).format(startDate)
        let startMonth = Intl.DateTimeFormat('en-GB', { month: "2-digit" }).format(startDate)
        let startDay = Intl.DateTimeFormat('en-GB', { day: "2-digit" }).format(startDate)
        let searchInputStart = `${startYear}-${startMonth}-${startDay}`

        let endYear = Intl.DateTimeFormat('en-GB', { year: "numeric" }).format(endDate)
        let endMonth = Intl.DateTimeFormat('en-GB', { month: "2-digit" }).format(endDate)
        let endDay = Intl.DateTimeFormat('en-GB', { day: "2-digit" }).format(endDate)
        let searchInputEnd = `${endYear}-${endMonth}-${endDay}`
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
            this.setState({successDeleteModalShow:true});
        }
    }


    handleChecked = (e) => {
        const id = e.target.value;

        this.setState({
            isChecked:[...this.state.isChecked, id]
        });
    };
    
    handleDeleteMulti = (e) => {
        e.preventDefault()

        let toDelete = this.state.isChecked
        let length = toDelete.length

        if (length === 0){
            let message = `Please select the collection dates you'd like to delete`
            window.confirm(message)
        } else {
            let message = `Are you sure you want to delete ${length} record/s?`
            if(window.confirm(message)){
                this.props.deleteCollectionsMulti(toDelete);
                
                this.setState({successDeleteModalShow:true});
            }
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
            let status = e.target.CollectionStatus.value;

            if (status === "ACTIVE"){
                this.props.checkStatusEdit(status, collectionId)

                this.props.editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status);
                this.setState({successModalShow:true});
            } else {
                this.props.editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status);
                this.setState({successModalShow:true});
            }

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
            let status = e.target.CollectionStatus.value;

            formData.append(
                "myFile",
                file
            );

            if (status === "ACTIVE"){
                this.props.checkStatusEdit(status, collectionId)

                this.props.addCollectionPhoto(file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet, status);
                this.setState({successModalShow:true});
            } else {
                this.props.addCollectionPhoto(file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet, status);
                this.setState({successModalShow:true});
            }
        }
    };

    // Collection Type

    handleCollectionType = (inputValue) => {
        let collectionType = inputValue;

        if (collectionType === "1") {
            let type = "Monthly"
            return type
        } else if (collectionType === "3") {
            let type = "3 Months"
            return type
        }
    };

    // Collection Date

    handleCollectionDate = (inputValue) => {
        let dateFormat = dayjs(`${inputValue} T00:00:00`);
        let collectionDate = Intl.DateTimeFormat('en-GB', {  month: "short", day: "numeric", year: "numeric" }).format(dateFormat);

        return collectionDate
    }
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
        this.setState({successModalShow:true});
    };

    
    render(){
        const {collid, colldate, colltype, colltotalweight, colltotalcost, collphoto, collspreadsheet, collstatus, whoid, whototaldonated, whototalspent, whoremainder, whoreceipt, dons, type, isAdd, reqStatus}=this.state;
   
        let editModalClose=()=>this.setState({editModalShow:false, refresh: "YES"});
        let addParticipationClose=()=>this.setState({addParticipationShow:false, refresh: "YES"});
        let editWholesaleClose=()=>this.setState({editWholesaleShow:false, refresh: "YES"});
        let successModalClose=()=>this.setState({successModalShow:false});
        let successDeleteModalClose=()=>this.setState({successDeleteModalShow:false});
       
        return(
            <div style={{paddingTop: "38.5px"}}>
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

                        <Button variant="font-size: 15px;" disabled className="totalButton">
                            {this.props.total}kg
                        </Button>
                        <Button variant="font-size: 15px;" disabled className="totalButtonCash">
                            £{this.props.totalc}
                        </Button>
                    </Row>

                    <SuccessModal show={this.state.successDeleteModalShow}
                        onHide={successDeleteModalClose}
                        reqStatus={reqStatus}
                        type={type}
                        isAdd={isAdd}
                    />
                </div>
                {/* Collection Table */}                    
                <div style={{overflowX:"auto"}}>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>
                                    <Button className="deleteButton" variant="outline-secondary" onClick={(e) =>{
                                        this.setState({
                                            successDeleteModalShow:false,
                                            reqStatus:`Collections deleted`,
                                            type:"collection",
                                            isAdd:false
                                        });
                                        this.handleDeleteMulti(e)}}>
                                        <BsXCircle className='deleteIcon'/>
                                    </Button>
                                </th>
                                <th>ID</th>
                                <th>Options</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Total Weight (kg)</th>
                                <th>Estimated Cost (£)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.colls.map(coll=>
                                <tr key={coll.CollectionID}>
                                    <td><input type="checkbox" value={coll.CollectionID} checked={coll.isChecked} onChange={(e) => this.handleChecked(e)}/></td>
                                    <td>{coll.CollectionID}</td>
                                    <td>
                                        
                                        <Dropdown onToggle={() => this.handleGetWholesale(coll.CollectionID)}>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
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
                                                    collspreadsheet:coll.CollectionSpreadsheet,
                                                    collstatus:coll.CollectionStatus,
                                                    successModalShow:false,
                                                    reqStatus:`Collection on ${coll.CollectionDate} saved`,
                                                    type:"collection",
                                                    isAdd:false
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
                                                collstatus={collstatus}
                                                successModalShow={this.state.successModalShow}
                                                successModalClose={successModalClose}
                                                reqStatus={reqStatus}
                                                type={type}
                                                isAdd={isAdd}
                                                />

                                                {/* Delete Collection */}

                                                <Dropdown.Item
                                                onClick={()=>{
                                                    this.setState({
                                                        successDeleteModalShow:false,
                                                        reqStatus:`Collection on ${coll.CollectionDate} deleted`,
                                                        type:"collection",
                                                        isAdd:false
                                                    });    
                                                    this.handleDelete(coll.CollectionID)}}
                                                >
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
                                                        whoreceipt:this.props.whol[0].WholesaleReceipt,
                                                        reqStatus:`Cash donation for collection on ${coll.CollectionDate} saved`,
                                                        type:"wholesale",
                                                        isAdd:false
                                                    })}
                                                >
                                                    Manage Wholesale
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
                                                successModalShow={this.state.successModalShow}
                                                successModalClose={successModalClose}
                                                reqStatus={reqStatus}
                                                type={type}
                                                isAdd={isAdd}
                                                />

                                                <Dropdown.Item onClick={() => 
                                                    this.setState({
                                                        addParticipationShow:true,
                                                        collid:coll.CollectionID,
                                                        whoid:this.props.whol[0].WholesaleID,
                                                        dons:this.props.dons,
                                                        colldate:coll.CollectionDate,
                                                        reqStatus:`Participant for collection on ${coll.CollectionDate} saved`,
                                                        type:"participant",
                                                        isAdd:true
                                                    })}
                                                >
                                                    Add Participant
                                                </Dropdown.Item>
                                                <AddParticipationModal show={this.state.addParticipationShow}
                                                onHide={addParticipationClose}
                                                addpart={this.handleAddParticipant}
                                                collid={collid}
                                                whoid={whoid}
                                                dons={dons}
                                                colldate={colldate}
                                                successModalShow={this.state.successModalShow}
                                                successModalClose={successModalClose}
                                                reqStatus={reqStatus}
                                                type={type}
                                                isAdd={isAdd}
                                                />
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        
                                    </td>
                                    <td>{this.handleCollectionDate(coll.CollectionDate)}</td>
                                    <td>{this.handleCollectionType(coll.Type)}</td>
                                    <td>{coll.TotalWeight}</td>
                                    <td>{coll.TotalCost}</td>
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
    total: state.collections.total,
    totalc: state.collections.totalc,
});

export default connect(mapStateToProps, { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto, addWholesale, getWholesale, editWholesale, getDonors, addParticipant, getCurrentParticipants, checkStatusEdit, deleteCollectionsMulti})(OldCollection)
