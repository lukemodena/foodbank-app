import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {connect} from "react-redux"
import PropTypes from "prop-types"

const PrivateRoute = ({ element: Element, auth, ...rest }) => {
  return (
    <Route 
        {...rest}
        render={props => {
            return <Element {...props} />
        }}
    />
  )
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);