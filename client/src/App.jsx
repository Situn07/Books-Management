import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Book Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              {user && (
                <Nav.Link as={Link} to="/add-book">Add Book</Nav.Link>
              )}
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Navbar.Text className="me-3">
                    Welcome, {user.email}
                  </Navbar.Text>
                  <Button variant="outline-light" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="me-2">
                    Login
                  </Nav.Link>
                  <Button as={Link} to="/register" variant="outline-light">
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <>
              <h1 className="text-center mb-4">Books Collection</h1>
              <BookList />
            </>
          } />
          
          <Route path="/add-book" element={
            <PrivateRoute>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <h2 className="text-center mb-4">Add New Book</h2>
                  <BookForm />
                </div>
              </div>
            </PrivateRoute>
          } />

          {/* Redirect to home if route not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;