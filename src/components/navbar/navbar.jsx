import React from "react";
import './navbar.scss';
import { Navbar, Container, Nav} from 'react-bootstrap';

export default function Navbar({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav w-full" sticky="top" expand="lg" variant="dark">
      <Container className="navbar-container flex">
        <Navbar.Brand href="/">MyFlix Movies App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto navbar-elements__style justify-between">
            {isAuth() && (
              // <Nav.Link as={Link} to={`/`}>Movies</Nav.Link>
              <Nav.Link href={"/"}>Movies</Nav.Link>
            )}

            {isAuth() && (
              // <Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>
              <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
            )}

            {isAuth() && (
              //<Nav.Link as={Link} to="/" onClick={onLoggedOut}>Logout</Nav.Link>
              <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
            )}

            {!isAuth() && (
              // <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link href={"/"}>Login</Nav.Link>
            )}

            {!isAuth() && (
              // <Nav.Link href="/register">Sign Up</Nav.Link>
              <Nav.Link href={"/register"} variant="Nav.Link">Sign Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



