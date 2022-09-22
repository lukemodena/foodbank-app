import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export class Register extends Component {
  state = {
      username: '',
      email: '',
      password: '',
      password2: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('submit')
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onChange
  render() {
    const { username, email, password, password2 } = this.state;
    return (
      <div className='col-md-6 m-auto'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
              Register: 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                      type='text' 
                      name='username' 
                      required 
                      onChange={this.onChange}
                      value={username}
                    />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type='email' 
                      name='email' 
                      required 
                      onChange={this.onChange}
                      value={email}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type='password' 
                      name='password' 
                      required 
                      onChange={this.onChange}
                      value={password}
                    />
                </Form.Group>
                <Form.Group controlId='password2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                      type='password2' 
                      name='password2' 
                      required 
                      onChange={this.onChange}
                      value={password2}
                    />
                </Form.Group>
                <Form.Group style={{paddingTop:"5px"}}>
                  <Button variant='primary' type='submit'>
                      Register
                  </Button>
                </Form.Group>
                <p>
                  Already have an account? <Link to='/login'>Login</Link>
                </p>
              </Form>
            </Col>
          </Row>

        </Modal.Body>
        
      </div>
    )
  }
}

export default Register
