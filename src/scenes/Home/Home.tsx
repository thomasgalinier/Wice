import "./Home.css";
import meet from '../../assets/undraw_meet_the_team_re_4h08.svg'
import Button from "../../components/Button/Button";
import Link from "../../components/Link/Link";
function Home() {
  return (
    <main>
      <section>
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

            <Button variant='third'>Voir nos événements</Button>
          </div>
          <div className="button-container">
          <div className="auth">
            <Link variant='primary' href="#">Connexion</Link>
            <Link variant='outline' href="#">Inscription</Link>
          </div>
            <Button variant='third'>Voir nos événements</Button>
          </div>
          <div className="presentation-img-container">
            <img
              src={meet}
              alt="illustration meet the team"
            />
          </div>
        </div>

      </section>
    </main>
  );
}

export default Home;
