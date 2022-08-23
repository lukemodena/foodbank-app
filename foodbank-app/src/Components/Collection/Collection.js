import React,{Component} from "react";
import {Button, ButtonToolbar, Table, Dropdown, Row} from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";
import { AddCollectionModal } from "./AddCollModal";
import { EditCollectionModal } from "./EditCollModal";
import { DeleteModal } from "./DeleteModal";
import { EditParticipationModal } from "./EditParticipationModal";
import SearchBar from "./SearchBar";


export class Collection extends Component{

    constructor(props){
        super(props);
        this.state={
            colls:[],
            editModalShow:false,
            addModalShow:false,
            deleteModalShow: false,
            editParticipationShow: false,
            searchValue: ""
        }
    }

    refreshList(){
        fetch('http://127.0.0.1:8000/collection')
        .then(response=>response.json())
        .then(data=>{
            this.setState({colls:data});
        })
    }

    componentDidMount(){
        this.refreshList();
    }

    editModalClose = () => {
        this.setState({editModalShow:false});
        this.refreshList();
    }

    addModalClose = () => {
        this.setState({addModalShow:false});
        this.refreshList();
    }

    editParticipationClose = () => {
        this.setState({editParticipationShow:false});
        this.refreshList();
    }

    deleteModalClose = () => {
        this.setState({deleteModalShow:false});
        this.refreshList();
    }


    deleteColl(collid){
        if(window.confirm('Are you sure?')){
            fetch('http://127.0.0.1:8000/collection/'+collid,{
                method:'DELETE',
                headers:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
        this.refreshList();
    }
    
    render(){
        const {colls, collid, colldate, colltype, colltotalweight, colltotalcost, collphoto, collspreadsheet}=this.state;
        console.log('searchValue', this.state.searchValue)
        return(
            <div>
                <DeleteModal show={this.state.deleteModalShow} onHide={this.deleteModalClose} collid={collid}/>
                <div style={{margin:"auto"}}>
                    <Row>
                        <Dropdown className="dropdownFilter">
                            <Dropdown.Toggle className="dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                                Collection
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/allcollections">All</Dropdown.Item>
                                <Dropdown.Item href="#/monthlycollections">Monthly</Dropdown.Item>
                                <Dropdown.Item href="#/3monthscollections">3 Months</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <SearchBar callback={(searchValue) => this.setState({searchValue: searchValue})}/>
                        
                        <Button variant="secondary" className="addButton"
                        onClick={()=>this.setState({addModalShow:true})}>
                            <BsPlusLg className="addButton-Icon"/>
                        </Button>
                        <AddCollectionModal show={this.state.addModalShow}
                        onHide={this.addModalClose}/>
                        
                        
                    </Row>

                </div>

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
                            {colls.map(coll=>
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
                                                    collspreadsheet:coll.CollectionSpreadsheet
                                                    })}
                                                >
                                                        Edit
                                                </Dropdown.Item>

                                                <EditCollectionModal show={this.state.editModalShow}
                                                onHide={this.editModalClose}
                                                collid={collid}
                                                colldate={colldate}
                                                colltype={colltype}
                                                colltotalweight={colltotalweight}
                                                colltotalcost={colltotalcost}
                                                collphoto={collphoto}
                                                collspreadsheet={collspreadsheet}
                                                />
                                                <Dropdown.Item
                                                onClick={()=>this.deleteColl(coll.CollectionID)}>
                                                    Delete
                                                </Dropdown.Item>

                                                <Dropdown.Item
                                                onClick={()=>this.setState({deleteModalShow:true,
                                                    collid:coll.CollectionID})
                                                }>
                                                    Delete
                                                </Dropdown.Item>

                                                <Dropdown.Item 
                                                onClick={() => 
                                                    this.setState({editParticipationShow:true,
                                                    collid:coll.CollectionID
                                                    })}
                                                >
                                                    Participation
                                                </Dropdown.Item>
                                                <EditParticipationModal show={this.state.editParticipationShow}
                                                onHide={this.editParticipationClose}
                                                collid={collid}
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