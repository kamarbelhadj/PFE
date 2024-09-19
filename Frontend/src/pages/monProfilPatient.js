import React, { useState,useEffect } from "react";
import axios from "axios";
import "../component/style/profileInfo.css";

const ProfileInfoPatient = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/patient/userInfo");
      const userInfo = response.data;
      setNom(userInfo.Nom);
      setPrenom(userInfo.Prenom);
      setEmail(userInfo.email);
      setNumeroTelephone(userInfo.NumTel);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "nom":
        setNom(value);
        break;
      case "prenom":
        setPrenom(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "numeroTelephone":
        setNumeroTelephone(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "currentPassword":
        setCurrentPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch("/patient/updatePersonnel", {
        nom,
        prenom,
        email,
        numtel: numeroTelephone,
      });
      console.log(response.data); // Updated patient information
      console.log("Changes saved!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.patch("/patient/updatePassword", {
        newPassword,
        currentPassword,
      });
      console.log(response.data); // Updated patient information
      console.log("Password updated!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Mon Profil</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Information personnelle:</h3>
              <div className="form-group">
                <label htmlFor="nom">Nom:</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={nom}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prénom:</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={prenom}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="numeroTelephone">Numéro de téléphone:</label>
                <input
                  type="text"
                  id="numeroTelephone"
                  name="numeroTelephone"
                  value={numeroTelephone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary" 
              onClick={handleSaveChanges}
           
              >
                Éditer
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Modifier mot de passe:</h3>
              <div className="form-group">
                <label htmlFor="newPassword">Nouveau mot de passe:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="currentPassword">Mot de passe actuel:</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={handleUpdatePassword}
        
              >
                Modifier mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoPatient;
