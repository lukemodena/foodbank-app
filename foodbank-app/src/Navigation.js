import React,{Component} from "react";
import { NavLink } from "react-router-dom";
import { Navbar,Nav } from "react-bootstrap";
import FoodReachLogo from "./FoodReachLogo.png";

export class Navigation extends Component{
    render(){
        return(
            <Navbar className="navBar" bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Brand href="/">
                    <img src={FoodReachLogo} className="navBar-logo"/>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/donor">
                            Donors
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/collection">
                            Collections
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" to="/participationdemo">
                            Participation Demo
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
