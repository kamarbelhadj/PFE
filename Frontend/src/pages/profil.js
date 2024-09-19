import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../component/style/profilePatient.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faBell,faFile , faUserMd} from '@fortawesome/free-solid-svg-icons';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import ProfileInfoPatient from './monProfilPatient';
import QuestionnaireViewPatient from './questionnaireView';


const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const nom = user.Nom;
  const prenom = user.Prenom;
  const [selectedParam, setSelectedParam] = useState('notifications');
  const [selectedMedecinId, setSelectedMedecinId] = useState(null);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const handleParamClick = (param) => {
    setSelectedParam(param);
    setShowQuestionnaire(false);
  };
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
        const response = await axios.get('/patient/profilPic', { responseType: 'arraybuffer' });

        if (response.status === 200) {
          const base64Image = btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          const imageUrl = `data:${response.headers['content-type']};base64, ${base64Image}`;
          setProfileImage(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, []);

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
            <h2>{nom} {prenom}</h2>

          </div>
        </div>
      <ul>
      <li
      className={selectedParam === 'Profile' ? 'active' : ''}
      onClick={() => handleParamClick('profile')}
    >
      <FontAwesomeIcon icon={faUser} /> Mon Profile
    </li>
    <li
      className={selectedParam === 'notifications' ? 'active' : ''}
      onClick={() => handleParamClick('notifications')}
    >
      <FontAwesomeIcon icon={faBell} /> Notifications
    </li>
   
    <li
      className={selectedParam === 'doctors' ? 'active' : ''}
      onClick={() => handleParamClick('doctors')}
    >
      <FontAwesomeIcon icon={faUserMd} /> Mes médecins
    </li>
 
    <li
      className={selectedParam === 'Dossier' ? 'active' : ''}
      onClick={() => handleParamClick('dossier')}
    >                                                  
      <FontAwesomeIcon icon={faFile} />  Mon dossier médical
    </li>
  </ul>
      </div>

      <div className="content">
      {selectedParam === 'profile' && <Profil />}
      {selectedParam === 'notifications' && <Notifications/>}
      {selectedParam === 'doctors' && <Doctors
        setSelectedMedecinId={setSelectedMedecinId}
        selectedMedecinId={selectedMedecinId}
        showQuestionnaire={showQuestionnaire}
        setShowQuestionnaire={setShowQuestionnaire} />}
      {selectedParam === 'questionnaire' && <QuestionnaireViewPatient />}
      {selectedParam === 'dossier' && <Dossier/>}
      </div>
    </div>
  );
};

const Profil = () => {
  return <ProfileInfoPatient/>
};

const Notifications = () => {
  return (
    <>
     <div className="notifications">
    <h2>Notifications</h2>
    <div  className="notification-container">
            <div className="notification-content">
              <span className="notification-name">
                 Monira Marzouk 
              </span>{' '}
              <div className='mesg'>a accepté votre  demande de suivi.</div>
            </div>
          </div>
          </div>
          <div  className="notification-container">
            <div className="notification-content">
              <span className="notification-name">
                 Monira Marzouk 
              </span>{' '}
              <div className='mesg'>Vous a envoyé une analyse </div>
            </div>
          </div>
    </>
   
          
  );
}

/*Liste doctors*/
const Doctors = ({setSelectedMedecinId, selectedMedecinId, showQuestionnaire, setShowQuestionnaire }) => {
  const [medecins, setMedecins] = useState([]);
  useEffect(() => {
    fetchDoctorsList();
  }, []);
  const fetchDoctorsList = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const cleanedToken = token.replace('Bearer ', '');
      if (cleanedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
      const response = await axios.get('/patient/medecins-list');

      if (response.status === 200) {
        const data = response.data;
        setMedecins(data);
      } else {
        console.error('Failed to fetch patient list');
      }
    } catch (error) {
      console.error('Error while fetching patient list:', error);
    }
  };
  const handleQuestionnaireClick = (medecinId) => {
    if (showQuestionnaire && selectedMedecinId === medecinId) {
      setShowQuestionnaire(false);
      setSelectedMedecinId(null);
    } else {
      setSelectedMedecinId(medecinId);
      setShowQuestionnaire(true);
    }
  };
  return (
    <div>
      {showQuestionnaire ?(
        <QuestionnaireViewPatient MedecinId={selectedMedecinId} />
      ):(
        <>
            <h2 className="title">Liste des patients</h2>
    {medecins.length > 0 ? (
      <table className="patient-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Spécialite</th>
            <th>Questionnaire</th>
          </tr>
        </thead>
        <tbody>
          {medecins.map((medecin) => (
            <tr key={medecin.id}>
              <td>{medecin.Nom}</td>
              <td>{medecin.Prenom}</td>
              <td>{medecin.Specialite}</td>
              <td>
                <button
                  onClick={() => handleQuestionnaireClick(medecin.id)}
                  className="questionnaire-btn"
                >
                  <FiEdit className="questionnaire-icon" />
                  Questionnaire
                </button>
              </td>
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

  )

};



const Dossier = () => {
  const [analyses, setAnalyses] = useState([]);
  const [contentType, setcontentType] = useState('');

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async (contentType) => {
    try {
      console.log(contentType)
      const response = await axios.get(`/patient/afficherDossier/${contentType}`);
      setAnalyses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (fileName) => {
    axios
      .get(`/medecin/AfficheDoc/${fileName}`)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileUpload = async (c) => {
   setcontentType(c)
   console.log(contentType)
   fetchAnalyses(contentType)
  };

  return (
    <>
      <div className="info-section">
        <div className="line-divider"></div>
        <div className="container" style={{margin:"0px"}}>
          <div className="row" style={{marginBottom:"0px"}}>
            <div className="col-md-12">
              <div className="upload-section">
                <div className="upload-buttons" style={{ margin: '0px' }}>
                  <button className="btn btn-primary upload-button reference-button" onClick={() => handleFileUpload('lettreDeReference')}>
                    Lettre de Référence
                  </button>
                  <button className="btn btn-primary upload-button medical-button" onClick={() => handleFileUpload('rapport')}>
                    Rapport Médical
                  </button>
                  <button className="btn btn-primary upload-button ordonnance-button" onClick={() => handleFileUpload('ordonnance')}>
                    Ordonnance
                  </button>
                  <button className="btn btn-primary upload-button analyse-button" onClick={() => handleFileUpload('analyse')}>
                    Analyse
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row" style={{marginTop:"0px"}}>
          {analyses.map((analysis) => (
            <div key={analysis.fileName} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{analysis.fileName}</h5>
                  <p className="card-text">Description: {analysis.description}</p>
                  <p className="card-text">Medecin: {analysis.Medecin}</p>
                  <p className="card-text">Date: {analysis.Date}</p>
                  <button
                    className="btn btn-primary"
                    style={{ width: '10rem' }}
                    onClick={() => handleDownload(analysis.path)}
                  >
                    View File
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
