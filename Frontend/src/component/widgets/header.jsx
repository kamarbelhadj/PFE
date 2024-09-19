import {React, useState , useEffect} from "react";
import "../style/header.css";
import axios from "axios"
import { Logout } from "../../redux/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";



const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/");
  };

  /*Affichage de l'image*/


  return handleLogout;
};

const Header = ({ user }) => {
  const [profileImage, setProfileImage] = useState('');
  const handleLogout = useLogout();
  const users = useSelector((state) => state.auth.user);
  const profileLink =
    users && users.role === "patient"
      ? "patient/profile"
      : "medecin/profileMed";
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
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand className="header-logo" href="/">
              Santé
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {user && user.isConnected ? (
                <Nav className="mx-auto nav-center">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/recherche">Recherche</Nav.Link>
                  <Nav.Link href="/">Services</Nav.Link>
                  <Nav.Link href="/">Contact</Nav.Link>
                </Nav>
              ) : (
                <></>
              )}
              <Nav className="ms-auto " style={{ marginRight: "7rem" }}>
                {user && user.isConnected ? (
                  //   <NavDropdown title={<FaUser />}  id="basic-nav-dropdown" >
                  //   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  //   <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  //   <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  //   <NavDropdown.Divider />
                  //   <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  // </NavDropdown>
                  <NavDropdown
                    eventKey={1}
                    title={
                      <div className="pull-left">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="thumbnail-image rounded-circle imageProfil"
                            style={{ height: "70px" }}
                          ></img>
                        ) : (
                          <img
                            src={require("../assets/pic.webp")}
                            alt="Profile"
                            style={{ height: "70px" }}
                            className="thumbnail-image rounded-circle imageProfil"
                          />
                        )}
                        <h4 className="profile-User">Profile</h4>
                      </div>
                    }
                    renderMenuOnMount={true}
                    id="basic-nav-dropdown"
                  >
                    <style>
                      {`
                                  .dropdown-toggle::after {
                                    display: none !important;
                                  }
                                `}
                    </style>
                    <NavDropdown.Item eventKey={1.1} href={profileLink}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item divider />
                    <NavDropdown.Item eventKey={1.3} onClick={handleLogout}>
                      <i className="fa fa-sign-out "></i> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Button
                    as={Link}
                    to="/login"
                    className="connect-button mt-0 mx-3"
                  >
                    SE CONNECTER
                  </Button>
                  /* <Button as={Link} to="/patient/register" className="connect-button mt-0">Register</Button> */
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
