import React,{Component} from "react";
import {Button, Table, Dropdown, Col, Form, Row, Modal, Image, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { BsPlusLg, BsDownload } from "react-icons/bs";
import SearchBar from "./SearchBar";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AddCollectionModal } from "./AddCollModal";

import { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto } from '../../actions/collections';

function EditCollectionModal(props) {
    const {
        show,
        onHide,
        handleFile,
        addphoto,
        collid,
        colldate,
        colltype,
        colltotalweight,
        colltotalcost,
        collphoto,
        collphotourl,
        collspreadsheet
    } = props
    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Edit Collection:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={addphoto}>
                                <Form.Group controlId='CollectionID'>
                                    <Form.Label>Collection ID</Form.Label>
                                    <Form.Control type='text' name='CollectionID' disabled placeholder='CollectionID' defaultValue={collid}/>
                                </Form.Group>

                                <Form.Group controlId='CollectionDate'>
                                    <Form.Label>Collection Date</Form.Label>
                                    <Form.Control type='date' name='CollectionDate' required placeholder='CollectionDate' defaultValue={colldate}/>
                                </Form.Group>
                                <Form.Group controlId='Type'>
                                    <Form.Label>Collection Type</Form.Label>
                                    <Form.Select aria-label="Type" required name='Type' placeholder='Type' defaultValue={colltype}>
                                        <option>Please select collection type...</option>
                                        <option value="1">1 Month Drop Off</option>
                                        <option value="3">3 Month Collection</option>
                                        <option value="0">CANCELLED</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='TotalWeight'>
                                    <Form.Label>Total Weight</Form.Label>
                                    <Form.Control type='text' name='TotalWeight' required placeholder='TotalWeight' defaultValue={colltotalweight}/>
                                </Form.Group>
                                <Form.Group controlId='TotalCost'>
                                    <Form.Label>Total Cost</Form.Label>
                                    <Form.Control type='text' name='TotalCost' required placeholder='TotalCost' defaultValue={colltotalcost}/>
                                </Form.Group>
                                <Form.Group controlId='CollectionPhoto'>
                                    <Form.Label>Collection Photo Filename</Form.Label>
                                    <Form.Control type='text' name='CollectionPhoto' disabled placeholder='CollectionID' defaultValue={collphoto}/>
                                </Form.Group>
                                <Form.Group controlId='CollectionSpreadsheet'>
                                    <Form.Label>CollectionSpreadsheet</Form.Label>
                                    <Form.Control type='text' name='CollectionSpreadsheet' required placeholder='CollectionSpreadsheet' defaultValue={collspreadsheet}/>
                                </Form.Group>

                                <Form.Group controlId='photofile' className="mb-3">
                                    <Form.Label>Collection Photo Upload</Form.Label>
                                    <Form.Control type="file" name='photofile' onChange={handleFile} />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant='primary' type='submit'>
                                        Update Collection
                                    </Button>
                                </Form.Group> 
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Form>
                                <Form.Group>
                                    <Image width="200px" height="200px" src={'http://127.0.0.1:8000/media/'+collphoto}/>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="outline-secondary" className="editButton">
                                        <BsDownload className="editButton-Icon"/>
                                    </Button>
                                </Form.Group>
                             
                                {/* <Link to={collphotourl} target="_blank" download></Link> */}
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


export class NewCollection extends Component{

    constructor(props){
        super(props);
        this.state={
            refresh: "NO",
            colls:[],
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
        getCollections: PropTypes.func.isRequired,
        searchCollections: PropTypes.func.isRequired,
        deleteCollection: PropTypes.func.isRequired,
        editCollection: PropTypes.func.isRequired,
        addCollectionPhoto: PropTypes.func.isRequired,
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
            this.props.colls.map(coll=>coll.TotalWeight)
            const total = this.props.colls.reduce((a,v) =>  a = a + parseInt(v.TotalWeight) , 0 )
        
            this.setState({
                refresh:"NO",
                startDate: "",
                endDate: "",
                monthValue: "",
                monthFilter:"All Donors",
                colltotalcost: total
            });
        }
    }

    // Collection Month Type Filter

    handleFilter = (value, filter) => {
        let monthType = value;

        if (monthType == "0") {
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
    
    render(){
        const {collid, colldate, colltype, colltotalweight, colltotalcost, collphoto, collphotourl, collspreadsheet}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false, refresh: "YES"});
        let editModalClose=()=>this.setState({editModalShow:false, refresh: "YES"});

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
                            {this.state.colltotalcost}kg
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
                                <th>Total Cost</th>
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
                                        
                                        <Dropdown>
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
                                                collphotourl={collphotourl}
                                                collspreadsheet={collspreadsheet}
                                                />
                                                <Dropdown.Item
                                                onClick={()=>this.handleDelete(coll.CollectionID)}>
                                                    Delete
                                                </Dropdown.Item>

                                                <Dropdown.Item 
                                                onClick={console.log("participation")}
                                                >
                                                    Participation
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
    colls: state.collections.colls,
    result: state.collections.result
});

export default connect(mapStateToProps, { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto })(NewCollection)
