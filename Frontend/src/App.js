import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage.js";
import Header from "./component/widgets/header.jsx";
import store from "./redux/store.js";
import jwt_decode from "jwt-decode";
import { setUser } from "./redux/actions/authActions.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Profil from "./pages/profil.js";
import ProfilMed from "./pages/profilMedecin.js";
import PrivateRouter from "./component/privateRoute/privateRouter.js";
import DoctorSearch from "./pages/serachMed.js";
import "./component/style/app.css"
import { useSelector } from "react-redux";
import RegisterMedecin from "./pages/registerMed.js";
// import { Container, Row } from "react-bootstrap";

if (localStorage.jwt) {
  const decode = jwt_decode(localStorage.jwt);
  store.dispatch(setUser(decode));
}
const App = () => {
  const auth = useSelector((state) => state.auth);
  const user = {
    isConnected: auth.isConnected,
  };

  return (
<BrowserRouter>
  <div className="App">
    <Header user={user} />

    <div className="content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recherche" element={<DoctorSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="patient/register" element={<Register />} />
        <Route
          path="patient/profile"
          element={<PrivateRouter user={user}><Profil /></PrivateRouter>}
        />
        <Route
          path="medecin/profileMed"
          element={<PrivateRouter user={user}><ProfilMed /></PrivateRouter>}
        />
        <Route path="medecin/register" element={<RegisterMedecin />} />
      </Routes>
    </div>
  </div>
</BrowserRouter>

  );
};

export default App;
