import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function ProfileInfo() {
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [pay,setPay]=useState('');
  const [gouvernorat,setGouvernorat]=useState('');
  const [numTel,setNumTel]=useState('');


  const [specialite, setSpecialite] = useState('');
  const [specification, setspecification] = useState('');
  const [description , setDescription] = useState('');
  useEffect(() => {
    
    const token = localStorage.getItem('jwt');
    const cleanedToken = token.replace('Bearer ', '');
  
    if (cleanedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/medecin/userInfo');
        const userData = response.data;
        setNom(userData.Nom);
        setPrenom(userData.Prenom);
        setEmail(userData.email);
        setPay(userData.Pay);
        setGouvernorat(userData.Gouvernorat);
        setNumTel(userData.NumTel);
        setSpecialite(userData.Specialite);
        setspecification(userData.Specification);
        setDescription(userData.Description );

      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
  
    fetchUserInfo();
  }, []);

  const handleTogglePasswordSection = () => {
    setShowPasswordSection(!showPasswordSection);
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };
  const handlePayChange = (event) => {
    setPay(event.target.value);
  };
  const handleGouvernoratChange = (event) => {
    setGouvernorat(event.target.value);
  };
  const handleNumTelChange = (event) => {
    setNumTel(event.target.value);
  };


  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSpecialitenChange = (event) => {
    setSpecialite(event.target.value);
  };

  const handlespecificationChange = (event) => {
    setspecification(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription (event.target.value);
  };
  const [imageURL, setImageURL] = useState('');

/*Modifier photo de profile handeler*/

const handleProfilePictureSubmit = (event) => {
  event.preventDefault();
  try {
    const file = new FormData();
    file.append('Image', profilePicture);
    console.log(file)
    const response = axios.post('/medecin/upload/profil', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Profile picture saved:', response.data);
  } catch (error) {
    console.error('Error uploading profile picture:', error);
  }
};

/*Mot de passe handeler*/
const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.log('no match')
      return;
    }
    try {
      const response = await axios.patch('/medecin/updatePassword', {
        currentPassword,
        newPassword
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

/*modifier info personnel*/
  const handlePersonalInfoSubmit = (event) => {
    event.preventDefault();
    const data = {
      nom,
      prenom,
      email,
      pay,
      gouvernorat,
      numTel,
    };
    console.log(data)
    const token = localStorage.getItem('jwt');
    const cleanedToken = token.replace('Bearer ', '');
  
    if (cleanedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  
    axios
      .patch('/medecin/updatePersonnel',data)
      .then((response) => {
        console.log('Personal information saved:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
/*modifier info profetionnel*/
  const handleProfessionalInfoSubmit = (event) => {
    event.preventDefault();
 const data = {
  specification,
  specialite,
  description
  
    };
    console.log(data)
    const token = localStorage.getItem('jwt');
    const cleanedToken = token.replace('Bearer ', '');
  
    if (cleanedToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${cleanedToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  
    axios
      .patch('/medecin/updatePro',data)
      .then((response) => {
        console.log('Profetional information saved:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Mon Profile</h2>
      <div>
 {/* Profile Picture Section */}
 <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Profile Picture</h5>
          <form onSubmit={handleProfilePictureSubmit}>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                onChange={handleProfilePictureChange}
              />
            </div>
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  

      {/* Toggle Password Section Button */}
      <div className="card mt-4">
        <div className="card-body">
          <button
            type="button"
            className="save-button"
            onClick={handleTogglePasswordSection}
          >
             Modifier votre mot de passe 
          </button>
        </div>
      </div>

      {/* Password Section */}
      {showPasswordSection && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Changer le mot de passe</h5>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Mot de passe actuel</label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <button type="submit" className="save-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Personal Information Section */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Informations personnelles</h5>
          <form onSubmit={handlePersonalInfoSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Nom</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={nom}
                onChange={handleNomChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Prénom</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={prenom}
                onChange={handlePrenomChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="NumTel">Numéro de téléphone</label>
              <input
                type="int"
                className="form-control"
                id="NumTel"
                value={numTel}
                onChange={handleNumTelChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Pay">Pay</label>
              <input
                type="text"
                className="form-control"
                id="Pay"
                value={pay}
                onChange={handlePayChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Gouvernorat">Gouvernorat</label>
              <input
                type="text"
                className="form-control"
                id="Gouvernorat"
                value={gouvernorat}
                onChange={handleGouvernoratChange }
              />
            </div>
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      </div>

      {/* Professional Information Section */}
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Information professionnelle</h5>
          <form onSubmit={handleProfessionalInfoSubmit}>
            <div className="form-group">
              <label htmlFor="specialite">Spécialisation</label>
              <input
                type="text"
                className="form-control"
                id="specialite"
                value={specialite}
                onChange={handleSpecialitenChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="specification">Spécification de spécialité</label>
              <input
                type="text"
                className="form-control"
                id="hospital"
                value={specification}
                onChange={handlespecificationChange }
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description professionnel</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={handleDescriptionChange }
              />
            </div>
           
            <button type="submit" className="save-button">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
