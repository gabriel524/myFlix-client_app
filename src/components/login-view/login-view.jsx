import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


import { Container, Row, Col, Card, Form, Button,} from 'react-bootstrap';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
// Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

// validate user inputs
const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(username.length < 5){
     setUsernameErr('Username must be 5 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(password.length < 6){
     setPassword('Password must be 6 characters long');
     isReq = false;
    }
    return isReq;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const isReq = validate();
  if(isReq) {
    /* Send request to the server for authentication */
    axios.post('https://myflix--movies-application1.herokuapp.com/login', {
        Username: username,
        Password: password
    })
    .then(response =>{
        const data = response.data;
        props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  }
};

  return (
    <Container fluid className="mt-12">
      <Row className="justify-content-sm-center flex">
        <Col xs={12} sm={9} md={7} lg={6} xl={5} className="col-xl-8 col-lg-8 col-md-7 col-sm-9 col-12">
          <Card variant="light" bg="light">
            <Card.Body>
      <div className='form-container'>
      <h2 className="text">Login</h2>
    <Form id="formstyle">
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter your username"
        value={username} onChange={e => setUsername(e.target.value)} />
        {/* code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
        <div id="emailHelp" className="form-text">We'll never share your information with anyone.</div>
        </Form.Group>

      <Form.Group controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        value={password} onChange={e => setPassword(e.target.value)} />
        {/* code added here to display validation error */}
        {passwordErr && (
        <p className="validation-message">{passwordErr}</p>
        )}
        </Form.Group>
        <div className='button'>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
            <label className="form-check-label"><span>Keep me login</span></label>
        </div>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
        </div>
    </Form>
    </div>
    </Card.Body>
    <p className="text">Not Registered?</p>
    <Card.Footer>
      <div className='text'>
          <a className="btn btn-info" href={'/register'}>Sign Up</a></div>
     <Button className="ma-0 col-10 onset-1" variant="link">
    </Button>
    </Card.Footer>
    </Card>
    </Col>
    </Row>
    </Container>
  )
}

    








