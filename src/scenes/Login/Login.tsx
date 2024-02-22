import "./login.css";
import authIllustration from "../../../public/undraw_secure_login_pdn4.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"


function Login() {
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
        navigate("/user");
        Cookies.set('jwt_token', result.token, { expires: 48});
        location.reload()
        
      })
      .catch((error) => console.error(error));

    form.reset();
  };

  return (
    <section className="auth-container">
      <form onSubmit={handleSubmit}>
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
          Connectez-vous
        </button>
      </form>
      <img src={authIllustration} alt="secure login" />
    </section>
  );
}

export default Login;
