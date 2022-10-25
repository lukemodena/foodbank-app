import React,{Fragment, useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar,Nav } from "react-bootstrap";
import FoodReachLogo from "./FoodReachLogo.png";

import { connect } from 'react-redux';
import { logout, checkAuthenticated } from "./actions/auth";

const Navigation = ({logout, checkAuthenticated, isAuthenticated}) => {

    useEffect(() => {
        checkAuthenticated();
      }, []);


    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);
    
    
    const handleLogout = (e) => {
        e.preventDefault();
        logout();

        navigate('/');
    }

    const guestLinks = () => (
        <Fragment>
            <NavLink className="d-inline p-2 bg-light text-black ml-auto" to="/login" onClick={() => setExpanded(false)}>
                Login
            </NavLink>
        </Fragment>
    )

    const authLinks = () => (
        <Fragment>
            <NavLink className="d-inline p-2 bg-light text-black" to="/contacts" onClick={() => setExpanded(false)}>
                Contacts
            </NavLink>
            <NavLink className="d-inline p-2 bg-light text-black" to="/collections" onClick={() => setExpanded(false)}>
                Collections
            </NavLink>
            <NavLink className="d-inline p-2 bg-light text-black" to="/participants" onClick={() => setExpanded(false)}>
                Participants
            </NavLink>

            <NavLink className="d-inline p-2 bg-light text-black ml-auto" to="/#" onClick={(e) => {handleLogout(e); setExpanded(false)}}>
                Logout
            </NavLink>
        </Fragment>
    )

    return (
        <Fragment>
            <Navbar className="navBar" bg="light" expand="lg" expanded={expanded} style={{borderBottom:"0.5px solid rgb(199, 199, 199)"}}>
                <div className="container">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                    {/* {(window.location.href.indexOf("contacts"))&&<h1 className='display-4'>CONTACTS</h1>} */}
                    <Navbar.Brand href="/">
                        <img src={FoodReachLogo} className="navBar-logo" style={{padding:"4px", width:"60px", height:"60px"}}/>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <NavLink className="d-inline p-2 bg-light text-black" to="/" onClick={() => setExpanded(false)}>
                                Home
                            </NavLink>
                            
                            {isAuthenticated ? authLinks() : guestLinks()}
                        </Nav>
                    </Navbar.Collapse>
                    
                </div>
            </Navbar>
        </Fragment>
    )
}

// Reducer

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated, logout })(Navigation)
