import React,{Component} from "react";
import {Button, ButtonToolbar, Table, Dropdown} from 'react-bootstrap';
import { AddDonorModal } from "./AddDonModal";
import { EditDonorModal } from "./EditDonModal";


export class Donor extends Component{

    constructor(props){
        super(props);
        this.state={
            dons:[],
            Url: {donorUrl: 'donor',
                donorName:'All Donors'}
        }
        
        this.handleAll = this.handleAll.bind(this);
        this.handleMonthly = this.handleMonthly.bind(this);
        this.handle3Months = this.handle3Months.bind(this);
        this.handleSpecial = this.handleSpecial.bind(this);
    }
    

    refreshList(){
        fetch('http://127.0.0.1:8000/'+this.state.Url.donorUrl)
        .then(response=>response.json())
        .then(data=>{
            this.setState({dons:data});
        })
    }
    
    handleAll() {
        let value = 'donor';
        this.setState(prevState => ({
            Url: {
                ...prevState.Url,
                donorUrl: value,
                donorName: 'All Donors'
            }
        }));
        this.refreshList();
    }

    handleMonthly() {
        let value = 'monthlydonortype';
        this.setState(prevState => ({
            Url: {
                ...prevState.Url,
                donorUrl: value,
                donorName: 'Monthly Donors'
            }
        }));
        this.refreshList();
    }

    handle3Months() {
        let value = 'threemonthdonortype';
        this.setState(prevState => ({
            Url: {
                ...prevState.Url,
                donorUrl: value,
                donorName: '3 Months Donors'
            }
        }));
        this.refreshList();
    }

    handleSpecial() {
        let value = 'specialdonortype';
        this.setState(prevState => ({
            Url: {
                ...prevState.Url,
                donorUrl: value,
                donorName: 'Special Donors'
            }
        }));
        this.refreshList();
    }

    getUrl() {
        return this.state.Url.donorName;
      }

    componentDidMount(){
        this.refreshList();
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
        return(
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Donor Type - {this.getUrl()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleAll} href="#/action-1">All</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleMonthly} href="#/action-2">Monthly</Dropdown.Item>
                        <Dropdown.Item onClick={this.handle3Months} href="#/action-3">3 Months</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleSpecial} href="#/action-3">Special</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>DonorID</th>
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
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
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
                                        donaddemail:don.AddEmail})}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                        onClick={()=>this.deleteDon(don.DonorID)}>
                                            Delete
                                        </Button>

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
                                        donaddemail={donaddemail}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Donor
                    </Button>
                    <AddDonorModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}