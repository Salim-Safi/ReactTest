import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=300&facet=libcog"
      )
      .then((res) => setCountries(res.data.records));
  }, []);

  const [name, setName] = useState("");
  const handleName = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const [email, setEmail] = useState("");
  const handleEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const [password, setPassword] = useState("");
  const handlePassword = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const [country, setCountry] = useState("");
  const handleCountry = useCallback((event) => {
    setCountry(event.target.value);
  }, []);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      try {
        axios.post("https://jsonplaceholder.typicode.com/users", {
          name,
          email,
          password,
          country,
        });
        props.setUser(name);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    [name, email, password, country, navigate, props]
  );

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleName}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Pays
          </label>
          <select
            className="form-select"
            id="country"
            value={country}
            onChange={handleCountry}
          >
            <option value=""></option>
            {countries.map((country, index) => (
              <option key={index} value={country.fields.libcog}>
                {country.fields.libcog}
              </option>
            ))}
          </select>
        </div>
        <div className="d-grid">
          <button className="btn btn-primary">Valider</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
