import "./Home.css";
import meet from "../../assets/undraw_meet_the_team_re_4h08.svg";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ArrowRightIcon from "../../components/Icon/ArrowRightIcont";
import '../../index.css'

function Home() {

  const { user } = useAuth();
  console.log(user);

  const userIsConnect = user != null;
  
  const handleClick = () => {
    console.log("test");
    
  }
  return (
    <main>
      <section className="presentation-section">
        <h1>Créez des événements plus performants.</h1>
        <div className="presentation-container">
          <div className="presentation-text">
            <p>
              WICE est la plateforme de gestion événementielle qui vous aide à
              planifier des événements en ligne, en présentiel ou hybrides.
            </p>
            <p>
              Automatisez votre communication, analysez les données de vos
              participants et construisez des événements toujours plus
              performants.
            </p>

            <button onClick={handleClick} className="third home-event-btn">
              <span>Voir nos événements</span>
              <ArrowRightIcon />
            </button>
          </div>
          <div className="button-container">
            {userIsConnect ?
              <div className="auth">
                <Link to="login" className="outline">Connexion</Link>
                <Link to="register" className="primary">Inscription</Link>
              </div>
              : null
            }
            <button className="third">
              <span>Voir nos événements</span>
              <ArrowRightIcon />
            </button>
          </div>
          <div className="presentation-img-container">

            <img src={meet} alt="illustration meet the team" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
