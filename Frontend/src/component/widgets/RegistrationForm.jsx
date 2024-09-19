import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "../style/RegistrationForm.css";
import { useDispatch } from "react-redux";
import { Registration } from "../../redux/actions/authActions";
import {useNavigate }from 'react-router-dom';

import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Gendre, setGendre] = useState("");
  const [DateNaissance, setDateNaissance] = useState("");
  const [NumTel, setNumTel] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const errors=useDispatch(state=>state.errors);
  const navigate= useNavigate()
  const handleSubmit = (e) => {
    if (Password !== ConfirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    
   e.preventDefault();
    
    const formValues = {
      Nom: Nom,
      Prenom: Prenom,
      Email: Email,
      Password: Password,
      Gendre: Gendre,
      DateNaissance: DateNaissance,
      NumTel: NumTel,
    };
    console.log('formvalue',formValues)
    dispatch(Registration(formValues,navigate));
   
  };
  const handleGenderChange = (event) => {
    setGendre(event.target.value);
  };

  return (
    <>
    <Container fluid>
    <Row className="mt-5">
      <Col className=" justify-content-center align-items-center"  md={'12'} lg={'6'}>
      <img
        className="mx-auto d-block imageReg"
        src={require("../assets/registration.png")}
        alt="image1"
      />
      </Col>
      <Col className="mx-0  align-items-center justify-content-center">
        <Row className="my-0">
        <h3>S'inscrire :</h3>
        
          {/* <button as={Link} to="/medecin/register" variant="primary" color="primary" className="btn1" >
            êtes-vous un professionnel de santé
          </button> */}
          <Button as={Link} to="/medecin/register" variant="primary" color="primary" className="btn1">
            êtes-vous un professionnel de santé</Button>
        </Row>
      {/* <div className="registration-form-container">
        <div className="container mt-3"> */}

          {/* <Button className="btn1" size="lg" >button</Button> */}

          {/* </a> */}
          <Row className="align-items-center my-0">
            <Col xs="5">
            <div className="h-divider"></div>
            </Col>
            <Col xs="2" md="auto">
              <h3 className="text-center fw-bold">sinon</h3>
            </Col>
            <Col xs="5">
            <div className="h-divider"></div>
            </Col>
          </Row>
          <Row className="mt-0 mb-2">
            <h5>Merci de saisir votre informations :</h5>
          </Row>
        
          <Row className="my-0">
            <Form onSubmit={handleSubmit}>
              
              <Form.Group>
              <div className="d-flex">
                <Form.Check
                  inline
                  type="radio"
                  label="Homme"
                  name="gender"
                  id="male"
                  className="form-check-inline"
                  value="homme"
                  checked={Gendre=== 'homme'}
                  onChange={handleGenderChange}
                  errors={errors.Gendre}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Femme"
                  name="gender"
                  id="female"
                  className="form-check-inline"
                  value="femme"
                  checked={Gendre === 'femme'}
                  onChange={handleGenderChange}
                  errors={errors.Gendre}
                />
              </div>
              
            </Form.Group  >
                  <div className="form-group">
                    <Form.Group controlId="Nom">
                      <Form.Control
                        type="text"
                        placeholder="Entez votre nom"
                        value={Nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                        
                      />
                    </Form.Group>
                  </div>
      
                  <div className="form-group">
                    <Form.Group controlId="Prenom">
                      <Form.Control
                        type="text"
                        placeholder="Entez votre prénom"
                        value={Prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                        
                      />
                    </Form.Group>
                  </div>
      
                  <div className="form-group">
                    <Form.Group controlId="Email">
                      <Form.Control
                        type="email"
                        placeholder="Entez votre address email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        
                      />
                    </Form.Group>
                  </div>
      
                  <div className="form-group">
                    <Form.Group controlId="NumTel">
                      <Form.Control
                        type="tel"
                        htmlFor="phone"
                        placeholder="Entrez votre numéro de téléphone"
                        value={NumTel}
                        onChange={(e) => setNumTel(e.target.value)}
                        pattern="[0-9]{8}"
                        required
                        
                      />
                    </Form.Group>
                  </div>
      
                  <div className="form-group">
                    <Form.Group controlId="DateNaissance">
                      <Form.Control
                        type="date"
                        placeholder=""
                        value={DateNaissance}
                        onChange={(e) => setDateNaissance(e.target.value)}
                        required
                        
                      />
                    </Form.Group>
                  </div>
                  <div className="form-group">
                    <Form.Group controlId="Password">
                      <Form.Control
                        type="password"
                        placeholder="Enter your mot de passe"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      
                      />
                    </Form.Group>
                  </div>
                  <div className="form-group">
                    <Form.Group controlId="ConfirmPassword">
                      <Form.Control
                        type="password"
                        placeholder="Confirmez votre modt de passse"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="form-group">
                  <Button variant="primary"  type="Submit" className="btn1">
                    Soumettre
                  </Button>
                  </div>

            </Form>
          </Row>
        {/* </div>
      </div> */}
      </Col>
    </Row>


    </Container>

    </>
  );
};

export default RegistrationForm;
