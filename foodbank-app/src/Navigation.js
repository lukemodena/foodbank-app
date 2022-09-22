import React,{Component} from "react";
import { NavLink } from "react-router-dom";
import { Navbar,Nav } from "react-bootstrap";
import FoodReachLogo from "./FoodReachLogo.png";

export class Navigation extends Component{
    constructor(props){
        super(props);
        this.state={
            authenticated: false
        }
    }

    componentDidMount() {
        let isAuthenticated = window.localStorage.getItem('isAuthenticated');
        this.setState({authenticated: isAuthenticated})
    }

    componentDidUpdate() {
        if (window.localStorage.getItem('isAuthenticated') !== this.state.authenticated) {
            let isAuthenticated = window.localStorage.getItem('isAuthenticated');
            this.setState({
                authenticated: isAuthenticated
            });
        } 
    }

    render(){
        
        return(
            <Navbar className="navBar" bg="light" expand="lg" style={{borderBottom:"0.5px solid rgb(199, 199, 199)"}}>

                <div className="container">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Brand href="/">
                        <img src={FoodReachLogo} className="navBar-logo" style={{padding:"4px", width:"60px", height:"60px"}}/>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <NavLink className="d-inline p-2 bg-light text-black" to="/">
                                Home
                            </NavLink>
                            {this.state.authenticated && <NavLink className="d-inline p-2 bg-light text-black" to="/donor">
                                Donors
                            </NavLink>}
                            <NavLink className="d-inline p-2 bg-light text-black" to="/collection">
                                Collections
                            </NavLink>
                
                            <NavLink className="d-inline p-2 bg-light text-black" to="/register">
                                Register
                            </NavLink>
                            <NavLink className="d-inline p-2 bg-light text-black" to="/login">
                                Login
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}
