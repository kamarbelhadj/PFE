import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../component/style/profileDoctor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faUserMd, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FiFolder, FiEdit } from 'react-icons/fi';
import DossierView from './dossierView';
import ProfileInfo from './monProfil';
import QuestionnaireView from './questionnaireViewMedecin';
import QuestionnaireForm from './Questionnaire';

const ProfileMed = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const nom = user.Nom;
  const prenom = user.Prenom;
  const Specialite = user.Specialite;
  const pay = user.Pay;
  const gouvernorat = user.Gouvernorat;
  const [selectedParam, setSelectedParam] = useState('monProfile');
  const [showDossier, setShowDossier] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [profileImage, setProfileImage] = useState('');


  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const cleanedToken = token.replace('Bearer ', '');

        if (cleanedToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
        } else {
          delete axios.defaults.headers.common['Authorization'];
        }
        const response = await axios.get('/medecin/profilPic', { responseType: 'arraybuffer' });

        if (response.status === 200) {
          const base64Image = btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          const imageUrl = `data:${response.headers['content-type']};base64, ${base64Image}`;
          setProfileImage(imageUrl);

          // Save the image as a file in the assets folder
          const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
          const imageFile = new File([imageBlob], 'profile.png', { type: response.headers['content-type'] });
          saveImageToAssets(imageFile); // Function to save the file to the assets folder
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, []);

  const saveImageToAssets = (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    axios.post('/assets/save', formData)
      .then((response) => {
        console.log('zssets', formData)
        console.log('Image saved to assets folder:', response.data);
      })
      .catch((error) => {
        console.error('Error saving image to assets folder:', error);
      });
  };
  const handleParamClick = (param) => {
    setSelectedParam(param);
    setShowDossier(false);
    setShowQuestionnaire(false);
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="profile-info">
          <div className="profile-image-container">
            {profileImage ? (
              // <img src={require(`../component/assets/${profileImage}`)} alt="Profile" />
              <img src={profileImage} alt="Profile" style={{height:'150px'}}></img>
            ) : (
              <img src={require('../component/assets/pic.webp')} alt="Profile" />
            )}
          </div>
          <div className="profile-details">
            <h2>Dr. {nom} {prenom}</h2>
            <h3>Spécialité: {Specialite}</h3>
            <p>
              {pay},{gouvernorat}
            </p>
          </div>
        </div>
        <ul>
          <li
            className={selectedParam === 'monProfile' ? 'active' : ''}
            onClick={() => handleParamClick('monProfile')}
          >
            <FontAwesomeIcon icon={faUser} /> Mon Profil
          </li>
          <li
            className={selectedParam === 'notifications' ? 'active' : ''}
            onClick={() => handleParamClick('notifications')}
          >
            <FontAwesomeIcon icon={faBell} /> Notifications
          </li>
          <li
            className={selectedParam === 'mesPatients' ? 'active' : ''}
            onClick={() => handleParamClick('mesPatients')}
          >
            <FontAwesomeIcon icon={faUserMd} /> Mes Patients
          </li>
          <li
            className={selectedParam === 'questionnaire' ? 'active' : ''}
            onClick={() => handleParamClick('questionnaire')}
          >
            <FontAwesomeIcon icon={faClipboardList} /> Questionnaire
          </li>
        </ul>
      </div>

      <div className="content">
        {selectedParam === 'monProfile' && <ProfileInfo />}
        {selectedParam === 'notifications' && <Notifications />}
        {selectedParam === 'mesPatients' && (
          <MesPatients
            showDossier={showDossier}
            setShowDossier={setShowDossier}
            setSelectedPatientId={setSelectedPatientId}
            selectedPatientId={selectedPatientId}
            showQuestionnaire={showQuestionnaire}
            setShowQuestionnaire={setShowQuestionnaire}
          />
        )}
        {selectedParam === 'questionnaire' && <QuestionnaireForm />}
      </div>
    </div>
  );
};

/*Liste Patient*/
const MesPatients = ({ showDossier, setShowDossier, setSelectedPatientId, selectedPatientId, showQuestionnaire, setShowQuestionnaire }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatientList();
  }, []);

  const handleDossierClick = (patientId) => {
    if (showDossier && selectedPatientId === patientId) {
      setShowDossier(false);
      setSelectedPatientId(null);
    } else {
      setSelectedPatientId(patientId);
      setShowDossier(true);
    }
  };

  const handleQuestionnaireClick = (patientId) => {
    if (showQuestionnaire && selectedPatientId === patientId) {
      setShowQuestionnaire(false);
      setSelectedPatientId(null);
    } else {
      setSelectedPatientId(patientId);
      setShowQuestionnaire(true);
    }
  };

  const fetchPatientList = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const cleanedToken = token.replace('Bearer ', '');
      if (cleanedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
      const response = await axios.get('/medecin/patient-list');

      if (response.status === 200) {
        const data = response.data;
        setPatients(data.patients);
        
      } else {
        console.error('Failed to fetch patient list');
      }
    } catch (error) {
      console.error('Error while fetching patient list:', error);
    }
  };

  return (
    <div>
      {showDossier && !showQuestionnaire ? (
        <DossierView patientId={selectedPatientId} />
      ) : showQuestionnaire && !showDossier ? (
        <QuestionnaireView patientId={selectedPatientId} />
      ) : (
        <>
          <h2 className="title">Liste des patients</h2>
          {patients.length > 0 ? (
            <table className="patient-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Dossier Médical</th>
                  <th>Questionnaire</th>
                  <th>Description générale</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.nom}</td>
                    <td>{patient.prenom}</td>
                    <td>
                      <button
                        onClick={() => handleDossierClick(patient.id)}
                        className="add-dossier-btn"
                      >
                        <FiFolder className="add-dossier-icon" />
                        Dossier
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleQuestionnaireClick(patient.id)}
                        className="questionnaire-btn"
                      >
                        <FiEdit className="questionnaire-icon" />
                        Questionnaire
                      </button>
                    </td>
                    <td>Pas mentionnée</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>loading...</p>
          )}
        </>
      )}
    </div>
  );
  }

/*Profile*/
const MonProfile = () => {
 return(
  <ProfileInfo/>
 )
};

/*Notification*/
const Notifications = () => {
  const [pendingPatients, setPendingPatients] = useState([]);
  const [showNotification, setShowNotification] = useState(true);
  useEffect(() => {
    const fetchPendingPatients = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const cleanedToken = token.replace('Bearer ', '');
        if (cleanedToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
        } else {
          delete axios.defaults.headers.common['Authorization'];
        }
        const response = await axios.get('/medecin/notification');
        setPendingPatients(response.data.pendingPatients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPendingPatients();
  }, []);
  const handleAccept = (patientId) => {
    const data = { patientId };
    console.log(patientId);
    try {
      const token = localStorage.getItem('jwt');
      const cleanedToken = token.replace('Bearer ', '');
      if (cleanedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
      axios
        .post(`/medecin/notification/accept-patient`, data)
        .then((response) => {
          console.log(response.data.message);
          setPendingPatients((prevPatients) =>
            prevPatients.filter((patient) => patient._id !== patientId)
          );
          setShowNotification(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleRefuse = (patientId) => {
    const data = { patientId };
    console.log(patientId);
    try {
      const token = localStorage.getItem('jwt');
      const cleanedToken = token.replace('Bearer ', '');
      if (cleanedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
      axios
        .post(`/medecin/notification/refuse-patient?patientId=${patientId}`, data)
        .then((response) => {
          console.log(response.data.message);
  
          setPendingPatients((prevPatients) =>
            prevPatients.filter((patient) => patient._id !== patientId)
          );
          setShowNotification(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {pendingPatients.length > 0 ? (
        pendingPatients.map((patient) => (
          showNotification && (
            <div key={patient._id} className="notification-container">
              <div className="notification-content">
                <span className="notification-name">
                  {patient.nom} {patient.prenom}
                </span>{' '}
                <div className='mesg'>vous a envoyé une demande de suivi.</div>
              </div>
              <div className="notification-buttons">
                <button className="accept-button" onClick={() => handleAccept(patient.id)}>
                  Accepter
                </button>
                <button className="refuse-button" onClick={() => handleRefuse(patient.id)}>
                  Refuser
                </button>
              </div>
            </div>
          )
        ))
      ) : (
        <p>No pending patients</p>
      )}
    </div>
  );
      }


const Questionnaire = () => {
  return (
    <QuestionnaireForm/>
  );
};

export default ProfileMed;
