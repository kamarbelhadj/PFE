import { useState } from 'react';
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../redux/actions/authActions";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/loginForm.css';

const LoginForm = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = {
      Email: Email,
      Password: Password,
    };
    dispatch(LoginAction(formValues, navigate));
  };

  // Display the error using react-toastify
  const displayError = (errorMessage) => {
    toast.error(errorMessage);
  };

  return (
    <>
      <Container fluid>
        <Row className="login-form-container">
          <Col className=" justify-content-center align-items-center" md={'6'} lg={'6'}>
            <img
              className="mx-auto d-block imageReg"
              src={require("../assets/registration.png")}
              alt="image1"
            />
          </Col>
          <Col className=" justify-content-center align-items-center login-form-connect " md={'6'} lg={'4'} >

            <h2 className="my-2 fw-bold">Se connecter</h2>
            <ToastContainer /> {/* Add this component to render the toasts */}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="Email">
                <Form.Control
                  type="email"
                  placeholder="Entez votre email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors && !!errors.Email}
                />
                {errors && errors.Email && (
                  <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors && !!errors.Password}
                />
                {errors && errors.Password && (
                  <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
                )}
              </Form.Group>

              <Button className='btn1' variant="primary" type="submit">
                Connecter
              </Button>
              <Link to="/patient/register" className="my-link mt-2">Créer un compte</Link>
            </Form>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;
