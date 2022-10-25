import React,{Fragment, useEffect, useState} from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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

    const location = useLocation();
    
    const pathname = location.pathname;

    const guestLinks = () => (
        <Fragment>
            {(pathname === "/login") &&<p className="navLink-Log-Current">Login</p>}
            {(pathname !== "/login") &&<NavLink className="navLink-Log" to="/login" style={{ textDecoration: 'none' }} onClick={() => setExpanded(false)}>
                Login
            </NavLink>}
        </Fragment>
    )

    const authLinks = () => (
        <Fragment>
            {(pathname === "/contacts") &&<p className="navLink-Current">Contacts</p>}
            {(pathname !== "/contacts") &&<NavLink className="navLink" to="/contacts" style={{ textDecoration: 'none' }} onClick={() => setExpanded(false)}>
                Contacts
            </NavLink>}
            {(pathname === "/collections") &&<p className="navLink-Current">Collections</p>}
            {(pathname !== "/collections") &&<NavLink className="navLink" to="/collections" style={{ textDecoration: 'none' }} onClick={() => setExpanded(false)}>
                Collections
            </NavLink>}
            {(pathname === "/participants") &&<p className="navLink-Current">Participants</p>}
            {(pathname !== "/participants") &&<NavLink className="navLink" to="/participants" style={{ textDecoration: 'none' }} onClick={() => setExpanded(false)}>
                Participants
            </NavLink>}
            <NavLink className="navLink-Log" to="/#" style={{ textDecoration: 'none' }} onClick={(e) => {handleLogout(e); setExpanded(false)}}>
                Logout
            </NavLink>
        </Fragment>
    )

    return (
        <Fragment>
            <Navbar className="navBar" bg="light" expand="lg" fixed="top" expanded={expanded} style={{borderBottom:"0.5px solid rgb(199, 199, 199)"}}>
                <div className="container">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}/>
                    {/* {(window.location.href.indexOf("contacts"))&&<h1 className='display-4'>CONTACTS</h1>} */}
                    <Navbar.Brand href="/">
                        <img src={FoodReachLogo} className="navBar-logo" style={{padding:"4px", width:"60px", height:"60px"}}/>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            {(pathname === "/") &&<p className="navLink-Current">Home</p>}
                            {(pathname !== "/") &&<NavLink className="navLink" to="/" style={{ textDecoration: 'none' }} onClick={() => setExpanded(false)}>
                                Home
                            </NavLink>}
                            
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
