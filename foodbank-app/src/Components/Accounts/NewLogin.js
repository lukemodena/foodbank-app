import React, {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import { login } from '../../actions/auth';

const NewLogin = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]:[e.target.value]});

    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    };

    if (isAuthenticated) {
      return <Navigate to='/' />
    }

  return (
    <div className='col-md-6 m-auto'>
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
              Login: 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col sm={6}>
              <Form onSubmit={e => onSubmit(e)}>
                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type='text' 
                      name='username' 
                      required 
                      onChange={e => onChange(e)}
                      value={username}
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type='password' 
                      name='password' 
                      required 
                      onChange={e => onChange(e)}
                      value={password}
                    />
                </Form.Group>

                <Form.Group style={{paddingTop:"5px"}}>
                  <Button variant='primary' type='submit'>
                      Login
                  </Button>
                </Form.Group>
                <p>
                  Don't have an account? <Link to='/register'>Register</Link>
                </p>
                <p>
                  Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
                </p>
              </Form>
            </Col>
          </Row>

        </Modal.Body>
        
      </div>
  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(NewLogin)
