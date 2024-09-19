import "../style/home.css";
import { FaPhone, FaEnvelope, FaAlignCenter } from "react-icons/fa";

const Home = () => {
  return (
    <div className="container">
      <div className="slogan">
        <div className="titre1">
          <h2>Votre bien-être, notre engagement : suivi médical à portée de clic.</h2>
        </div>
        <div className="titre2">
          <p>Des fonctionnalités pour simplifier votre quotidien et vous permettre de développer votre activité</p>
        </div>
      </div>
      <div className="services">
        <div className="titre1">
          <h3>Notre Services</h3>
        </div>
        <div className="t2">
          <p>Tout ce dont vous avez besoin pour gérer votre pratique</p>
          <p>
            Quel que soit votre rôle, notre plateforme vous accompagne pour améliorer la qualité des soins et faciliter
            la communication entre les patients et les professionnels de santé.
          </p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <img className="card-img-top" src={require("../assets/patient.png")} alt="image1" style={{width:'50%' , height:"50%" , marginLeft:'10rem', marginTop:'5rem'}} />
              <div className="card-body">
                <h5 className="card-title">Connectez-vous en tant que patient</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolores voluptatum illum alias fuga
                  voluptate nesciunt a corrupti velit veniam. Cupiditate ad ex consequuntur eum quam? Illo, eum
                  perferendis. Odit?
                </p>
                <a href="/patient/register" className="btn btn-primary">Connecter en tant que patient</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <img className="card-img-top" src={require("../assets/medecins.png")} alt="image2" style={{width:'50%' , height:"50%" , marginLeft:'10rem', marginTop:'5rem'}} />
              <div className="card-body">
                <h5 className="card-title">Connectez-vous en tant que médecin</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dolores voluptatum illum alias fuga
                  voluptate nesciunt a corrupti velit veniam. Cupiditate ad ex consequuntur eum quam? Illo, eum
                  perferendis. Odit?
                </p>
                <a href="/medecin/register" className="btn btn-primary">Connecter en tant que médecin</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p className="contact-info">
                <FaPhone className="icon" /> Téléphone : +XX XXX XXX XXX
              </p>
            </div>
            <div className="col-md-6">
              <p className="contact-info">
                <FaEnvelope className="icon" /> Email : info@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
