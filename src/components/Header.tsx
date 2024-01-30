import Link from "./Link/Link";
import "./header.css";

function Header() {
  return (
    <header>
      <div className="logo">
        <p>WICE</p>
      </div>
      <div className="auth-links">
        <Link variant="outline" href="#">
          Connexion
        </Link>
        <Link variant="primary" href="#">
          Inscription
        </Link>
      </div>
    </header>
  );
}

export default Header;
