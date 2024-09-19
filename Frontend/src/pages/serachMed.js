import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from 'react-icons/fa';

const DoctorSearch = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [followUpMessage, setFollowUpMessage] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/recherche/all");
      if (response.data.doctors) {
        setDoctors(response.data.doctors);
        setError(null);
      } else {
        setError("Aucun médecin trouvé");
      }
    } catch (error) {
      console.error(error);
      setError("Une erreur s'est produite lors de la récupération des médecins.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFollowUpRequest = async (doctorId) => {
    try {
      const token = localStorage.getItem("jwt");
      const cleanedToken = token.replace("Bearer ", "");
      if (cleanedToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${cleanedToken}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }

      const response = await axios.post("/patient/demandes-de-suivi", {
        headers: {
          Authorization: cleanedToken,
        },
        doctorId,
      });
      console.log(response.data);
      setFollowUpMessage(response.data.message);

      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === doctorId ? { ...doctor, suivie: true } : doctor
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`/recherche?NomPrenom=${searchQuery}`);
      if (response.data.medecin) {
        setDoctors([response.data.medecin]);
        setError(null);
      } else if (response.data.message) {
        setDoctors([]);
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Une erreur s'est produite lors de la recherche du médecin.");
    } finally {
      setIsLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <div className="container mt-4">
    <div>
    <form onSubmit={handleSearchSubmit} className="row align-items-center">
  <div className="col">
    <div className="input-group align-items-stretch">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Entrez le nom du médecin"
        className="form-control"
       
      />
      <div className="input-group-append">
        <button type="submit" className="btn btn-outline-primary" style={{ fontSize: "15px", marginBottom: "10px", height:"30px" , marginLeft:"4px"}}>
          <FaSearch />
        </button>
      </div>
    </div>
  </div>
</form>
      </div>

      {followUpMessage && <div className="alert alert-success mt-3">{followUpMessage}</div>}

      <div className="mt-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor._id} className="card mb-3">
                  <div className="card-body d-flex align-items-center">
                    <div className="mr-3">
                      {doctor.profilePicture ? (
                        <img
                          src={doctor.profilePicture}
                          alt="Profile"
                          className="profile-picture"
                          style={{ marginRight: "10px" }}
                        />
                      ) : (
                        <i
                          className="fas fa-user-circle profile-icon smaller-profile-picture"
                          style={{ marginRight: "40px",marginLeft: "30px", fontSize: "50px" }}
                        ></i>
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <div>
                          <p className="card-text">Nom: {doctor.Nom}</p>
                          <p className="card-text">Prénom: {doctor.Prenom}</p>
                          <p className="card-text">Spécialité: {doctor.Specialite}</p>
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => handleFollowUpRequest(doctor._id)}
                            className={`follow-up-button ${doctor.suivie ? "disabled" : ""}`}
                            disabled={doctor.suivie}
                          >
                            {doctor.suivie ? "Envoyée" : "Suivre"}
                          </button>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>{error ? error : "Aucun médecin trouvé"}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorSearch;
