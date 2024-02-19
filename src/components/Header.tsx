import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AvatarIcon from "./AvatarIcon/AvatarIcon";
import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  const {user} = useAuth();

  
  const userIsConnect = user != null;

  return (
    <header>
      <div className="logo">
        <Link className="logo" to="/">
          <p>WICE</p>
        </Link>
      </div>
      {userIsConnect ? (
        <AvatarIcon url={user.iconurl}  />
      ) : (
        <div className="auth-links">
          <Link to="/login" className="outline">
            Connexion
          </Link>
          <Link to="/register" className="primary">
            Inscription
          </Link>
      </div>
      )}
    </header>
  );
}

export default Header;
