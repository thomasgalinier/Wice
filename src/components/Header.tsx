import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="logo">
        <p>WICE</p>
      </div>
      <div className="auth-links">
        <Link to='login'>Inscription</Link>
      </div>
    </header>
  );
}

export default Header;
