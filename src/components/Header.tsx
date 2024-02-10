import { useAuth } from "../context/AuthContext";
import "./header.css";
import { Link } from "react-router-dom";
function Header() {
  const pathName = window.location.pathname
  const routeLogin = pathName === '/login' || pathName === '/register'? true : false
  const user = useAuth()
  console.log(
    user
  );
  
  const userIsConnect = user != null
  console.log(userIsConnect);
  return (
    <header>
      <div className="logo">
        <Link className="logo" to='/'>
        <p>WICE</p>
        </Link>
      </div>
      {userIsConnect ? <img />:            <div className="auth-links">
 <Link to="/login" className="outline">Connexion</Link>
 <Link to='/register' className='primary'>Inscription</Link>
</div>
      }

    </header>
  );
}

export default Header;
