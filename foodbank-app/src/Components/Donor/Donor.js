import React,{Component} from "react";
import {Button, ButtonToolbar, Table, Dropdown, Row} from 'react-bootstrap';
import { BsPlusLg } from "react-icons/bs";
import { AddDonorModal } from "./AddDonModal";
import { EditDonorModal } from "./EditDonModal";
import SearchBar from "./SearchBar"


export class Donor extends Component{

    constructor(props){
        super(props);
        this.state={
            dons:[],
            Url: {donorUrl: '',
                donorName:'All Donors'},
            searchValue: "",
            update:"",
        }
        
        this.handleAll = this.handleAll.bind(this);
        this.handleMonthly = this.handleMonthly.bind(this);
        this.handle3Months = this.handle3Months.bind(this);
        this.handleSpecial = this.handleSpecial.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    

    refreshList(){
        fetch('http://127.0.0.1:8000/searchdonors'+this.state.Url.donorUrl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({dons:data});
        })
    }
    
    handleAll = () => {
        let value = '';
        this.setState(prevState => ({
            Url: {
                ...prevState.Url,
                donorUrl: value,
                donorName: 'All Donors'
            }
        }));
        this.setState({update:'YES'});
        this.refreshList();
    }

    handleMonthly = () => {
        let value = '?search=1';
        this.setState(prevState => ({
            Url: {
                ...prevState.Url,
                donorUrl: value,
                donorName: 'Monthly Donors'
            }
        }));
        this.setState({update:'YES'});
        this.refreshList();
    }

    handle3Months = () => {
        let value = '/threemonthdonortype';
        this.setState(prevState => ({
            Url: {
                ...prevState.Url,
                donorUrl: value,
                donorName: '3 Months Donors'
            }
        }));
        this.setState({update:'YES'});
        this.refreshList();
    }


    handleSpecial = () => {
        let value = '?search=spec';
        this.setState(prevState => ({
            Url: {
                ...prevState.Url,
                donorUrl: value,
                donorName: 'Special Donors'
            }
        }));
        this.setState({update:'YES'});
        this.refreshList();
    }

    getUrl() {
        return this.state.Url.donorName;
    }

    handleSearch = (searchValue) => {
        let newValue = searchValue
        this.setState({searchValue: newValue});
        if (this.state.Url.donorName === "All Donors"){
            let value = "?fullname=" + newValue
            this.setState(prevState => ({
                Url: {
                    ...prevState.Url,
                    donorUrl: value
                }
            }));
            this.setState({update:'YES'});
            
        } else if (this.state.Url.donorName === "Monthly Donors"){
            let value = "?search=1&fullname=" + newValue
            this.setState(prevState => ({
                Url: {
                    ...prevState.Url,
                    donorUrl: value
                }
            }));
            this.setState({update:'YES'});
            
        } else if (this.state.Url.donorName === "3 Months Donors"){
            let value = "?search=1&?search=3&fullname=" + newValue
            this.setState(prevState => ({
                Url: {
                    ...prevState.Url,
                    donorUrl: value
                }
            }));
            this.setState({update:'YES'});
            
        } else if (this.state.Url.donorName === "Special Donors"){
            let value = "?search=spec&fullname=" + newValue
            this.setState(prevState => ({
                Url: {
                    ...prevState.Url,
                    donorUrl: value
                }
            }));
            this.setState({update:'YES'});
            
        } else {
            this.setState({update:'YES'});
            
        }
    }
    

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate() {
        if (this.state.update === "YES") {
            this.refreshList();
            this.setState({update:'No'});
        }
    }

    deleteDon(donid){
        if(window.confirm('Are you sure?')){
            fetch('http://127.0.0.1:8000/donor/'+donid,{
                method:'DELETE',
                headers:{'Accept':'application/json',
                'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {dons, donid, donfullname, donfirstname, donlastname, donemail, donaddress1, donaddress2, donpostcode, dondonortype, donnotes, donphone, donaddemail}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        console.log(this.state.searchValue)
        return(
            <div>

                <div style={{margin:"auto"}}>
                    <Row>
                        <Dropdown className="dropdownFilter">
                            <Dropdown.Toggle className="dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                                {this.getUrl()}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.handleAll()} href="#/all">All</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handleMonthly()} href="#/monthly">Monthly</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handle3Months()} href="#/3months">3 Months</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.handleSpecial()} href="#/special">Special</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <SearchBar callback={(searchValue) => this.handleSearch(searchValue)}/>
                        
                        <Button variant="secondary" className="addButton"
                        onClick={()=>this.setState({addModalShow:true})}>
                            <BsPlusLg className="addButton-Icon"/>
                        </Button>
                        <AddDonorModal show={this.state.addModalShow}
                        onHide={addModalClose}/>
                        
                    </Row>

                </div>

                <div style={{overflowX:"auto"}}>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FullName</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Address1</th>
                                <th>Address2</th>
                                <th>PostCode</th>
                                <th>DonorType</th>
                                <th>Notes</th>
                                <th>Phone</th>
                                <th>AddEmail</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dons.map(don=>
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

                                            <Dropdown.Item
                                            onClick={()=>this.deleteDon(don.DonorID)}>
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