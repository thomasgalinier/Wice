import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  const pathName = window.location.pathname
  const routeLogin = pathName === '/login' || pathName === '/register'? true : false
  return (
    <header>
      <div className="logo">
        <Link className="logo" to='/'>
        <p>WICE</p>
        </Link>
      </div>
      {!routeLogin? 
            <div className="auth-links">
            <Link to='/login'>Inscription</Link>
          </div> : null
      }

    </header>
  );
}

export default Header;
