import { useNavigate } from "react-router-dom";
import authIllustration from "../../../public/undraw_secure_login_pdn4.svg";

function Register() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch("http://localhost:3000/auth/signin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        navigate("/");
        // 'expires' définit la durée de vie du cookie en jours
        console.log(result);
      })
      .catch((error) => console.error(error));

    form.reset();
  };
  return (
      <section className="auth-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="firstName">Prénom</label>
            <input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Prénom"
            />
          </div>
          <div className="input-container">
            <label htmlFor="lastName">Nom</label>
            <input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Nom"
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" id="email" placeholder="email" />
          </div>
          <div className="input-container">
            <label htmlFor="password">Mot de passe</label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="mot de passe"
            />
          </div>
          <button type="submit" className="primary">
            Inscrivez-vous
          </button>
        </form>
        <img src={authIllustration} alt="secure login" />
      </section>
  );
}

export default Register;
