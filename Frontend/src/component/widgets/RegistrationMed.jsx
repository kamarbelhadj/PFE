import React, { useState, useMemo } from "react";
// import Select from "react-select";
import "../style/registerMed.css";
import countryList from "react-select-country-list";
import { useDispatch } from "react-redux";
import { RegistrationMedecin} from "../../redux/actions/authActions";
import {useNavigate }from 'react-router-dom'
import { Button, Form, Container, Row, Col } from "react-bootstrap";


const RegistrationFormMed = () => {
  const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [NumLicenceMedical, setNumLicenceMedical] = useState("");
    const [NumTel, setNumTel] = useState("");
    const [Gouvernorat, setGouvernorat] = useState("");
    const [valuePay, setValue] = useState("");
    const [valueSpecialite, setValueSpecialite] = useState("");
    const specialityOptions = [
    { value: "Cardiologue", label: "Cardiologue" },
    { value: "Médecine dentaire", label: "Médecine dentaire" },
    { value: "Dermatologie", label: "Dermatologie" },
    { value: "Gynécologie", label: "Gynécologie" },
    { value: "Ophtalmologie", label: "Ophtalmologie" },
    { value: "O.R.L", label: "O.R.L" },
    { value: "Orthopédie-Traumatologie", label: "Orthopédie-Traumatologie" },
    { value: "Pédiatrie", label: "Pédiatrie" },
    { value: "Sexologie", label: "Sexologie" },
    { value: "Gastro-entérologie", label: "Gastro-entérologie" },
    { value: "Urologie", label: "Urologie" },
    { value: "Pneumologie", label: "Pneumologie" },
    { value: "Médecine interne", label: "Médecine interne" },
    { value: "Rhumatologie", label: "Rhumatologie" },
    { value: "autre", label: "Autre" },
  ];
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const options = useMemo(() => countryList().getData(), []);


  const handleSubmit = (e) => {
    const formValues = {
      Nom: Nom,
      Prenom: Prenom,
      Email: Email,
      Password: Password,
      NumLicenceMedical: NumLicenceMedical,
      Gouvernorat: Gouvernorat,
      NumTel: NumTel,
      Pay: valuePay,
      Specialite: valueSpecialite
      // Pay: valuePay ? valuePay.label : "", // Extract label from selected option
      // Specialite: valueSpecialite ? valueSpecialite.label : "",
    };
   
      e.preventDefault();
      console.log('formvalue',formValues) 
      dispatch(RegistrationMedecin(formValues,navigate));
  }
    
  return (
    <>
     <Container fluid>

     <Row className="mt-5">

      <Col className=" justify-content-center align-items-center"  md={'12'} lg={'6'}>
          <h2>Inscription fiche praticien</h2>
          <p>Remplissez ce formulaire pour créer votre fiche praticien</p>
          <Form  onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} xs={12} sm={6} controlId="formGridPays">
                <Form.Label>Pays</Form.Label>
                <Form.Select value={valuePay} onChange={
                 
                  e=> { console.log("e.target.value", e.target.value); 
                    setValue(e.target.value)}
                  }>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>

              </Form.Group>
              <Form.Group as={Col} xs={12} sm={6} controlId="formGridSpeciality">
                <Form.Label>Spécialité</Form.Label>
                <Form.Select value={valueSpecialite} onChange={e=> {
                  console.log("e.target.value", e.target.value);
                  setValueSpecialite(e.target.value)}}>
                  {specialityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>

              </Form.Group>

            </Row>      
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} sm={6} controlId="formGridGov">
                <Form.Label>Gouvernorat</Form.Label>
                <Form.Control 
                onChange={(e) => setGouvernorat(e.target.value)}  
                placeholder="Tapez votre gouvernorat" />
              </Form.Group>

              <Form.Group as={Col} xs={12} sm={6} controlId="formGridIdMEd">
                <Form.Label>N licence médicale </Form.Label>
                <Form.Control 
                  value={ NumLicenceMedical}
                  onChange={(e) => setNumLicenceMedical(e.target.value)}
                  placeholder="Tapez le numéro de licence médicale" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} sm={6} controlId="formGridNom">
                <Form.Label>Nom</Form.Label>
                <Form.Control 
                     placeholder="Tapez votre nom"
                     value={Nom}
                     onChange={(e) => setNom(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} xs={12} sm={6} controlId="formGridPrenom">
                <Form.Label>Prénom </Form.Label>
                <Form.Control 
                  placeholder="Tapez votre prénom"
                  value={Prenom}
                  onChange={(e) => setPrenom(e.target.value)} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} xs={12} sm={6} controlId="formGridEmail">
                <Form.Label>Adresse e-mail</Form.Label>
                <Form.Control 
                  placeholder="Tapez votre adresse e-mail"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} xs={12} sm={6} controlId="formGridPrenom">
                <Form.Label>Téléphone mobile </Form.Label>
                <Form.Control 
                  placeholder="Tapez votre numéro mobile"
                  value={NumTel}
                  onChange={(e) => setNumTel(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">

              <Form.Group  controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" 
                placeholder="Password" />
              </Form.Group>
            </Row>
            <Row>
            <Button variant="primary"  type="Submit" className="btn1">
                    Soumettre
            </Button>
            </Row>
          </Form>
      </Col>

      <Col>
          <img
            className="mx-auto d-block imageReg"
            src={require("../assets/registerMed.png")}
            alt="image1"
          />
      </Col>
     </Row>

     </Container>
      {/* <div className="row">
        <div className="col-1">
          <h2>Inscription fiche praticien</h2>
          <p>Remplissez ce formulaire pour créer votre fiche praticien</p>
          <form className="formMed" onSubmit={handleSubmit}>
                     
            <div className="formRow">
              <div className="formContainer">
                <label className="form-label">Pays</label>
                <Select
                  options={options}
                  value={valuePay}
                  onChange={changeHandler}
                />
              </div>
              <div className="formContainer">
                <label className="form-label">Spécialité</label>
                <Select
                  value={valueSpecialite}
                  onChange={handlerChange}
                  options={specialityOptions}
                />
              </div>
            </div>
            <div className="formRow">
            <div className="formContainer">
                <label className="form-label">Gouvernorat</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tapez votre gouvernorat"
                  value={Gouvernorat}
                  onChange={(e) => setGouvernorat(e.target.value)}
                />

                
              </div>
              <div className="formContainer">
                <label className="form-label"> Numéro de licence médicale </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tapez le numéro de licence médicale"
                  value={ NumLicenceMedical}
                  onChange={(e) => setNumLicenceMedical(e.target.value)}
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formContainer">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tapez votre nom"
                  value={Nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
              <div className="formContainer">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tapez votre prénom"
                  value={Prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formContainer">
                <label className="form-label">Adresse e-mail</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tapez votre adresse e-mail"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formContainer">
                <label className="form-label">Téléphone mobile</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tapez votre numéro mobile"
                  value={NumTel}
                  onChange={(e) => setNumTel(e.target.value)}
                  
                />
              </div>
            </div>
            <div className="formContainer">
                <label className="form-label">Mot de passe </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Tapez votre mot de passe"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
              </div>
            
           
            <div className="formRow">
           
              <button type="Submit" className="btn">
                Soumettre 
              </button>
              
            </div>
          </form>
        </div>
        <div className="col-2">
          <img
            className="imageReg2"
            src={require("../assets/registerMed.png")}
            alt="image1"
          />
        </div>
      </div> */}
    </>
  );
};

export default RegistrationFormMed;
