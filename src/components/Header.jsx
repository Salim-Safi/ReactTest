import { Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { useCallback, useContext } from "react";
import { Context } from "../context";
import classNames from "classnames";
import axios from "axios";

const fakeaxios = {
  post: (url, data) => {
    if (url === "/api/logout") {
      return Promise.resolve({
        status: 200,
      });
    } else {
      return axios.post(url, data);
    }
  },
};

function Header() {
  const { context, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const switchTheme = useCallback(() => {
    dispatch({ type: "switchTheme" });
  }, [dispatch]);

  const login = context.user.name ? (
    <div className="row">
      <div className="d-flex align-items-center justify-content-around">
        <span>Bienvenue {context.user.name} !</span>
        <div>
          <button
            type="submit"
            className={classNames("btn btn-outline-" + context.theme)}
            onClick={async () => {
              try {
                await fakeaxios.post("/api/logout");
                axios.defaults.headers.common["Authorization"] = null;
                dispatch({ type: "logout", payload: "" });
                navigate("/login");
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <Link to="/login" className="nav-link">
        Connectez-vous !
      </Link>
      <p className="pe-2 ps-2 m-0">ou</p>
      <Link to="/register" className="nav-link">
        Inscrivez-vous !
      </Link>
    </div>
  );

  return (
    <div>
      <nav
        className={classNames(
          "navbar navbar-expand-md",
          context.theme === "light"
            ? "navbar-dark bg-dark"
            : "navbar-light bg-secondary"
        )}
      >
        <div className="container-fluid">
          <div className="navbar-brand" href="#">
            <img
              src={logo}
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            MOOC React
          </div>
          <ul className="flex-row navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link ">
                Utilisateurs
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/counter" className="nav-link">
                Compteur
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/roles" className="nav-link">
                Rôles
              </Link>
            </li>
          </ul>
          <div className="navbar-text col-lg-1">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={switchTheme}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              >
                {context.theme}
              </label>
            </div>
          </div>
          <div className="navbar-text col-lg-4 col-md-4">{login}</div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
