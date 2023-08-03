import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

const fakeaxios = {
  post: (url, data) => {
    if (url === "/api/login") {
      if (data.login === "test" && data.password === "12345678") {
        return Promise.resolve({
          status: 200,
          data: { token: "xxx.yyy.zzz", user: { name: data.login } },
        });
      } else {
        return Promise.reject({ status: 401 });
      }
    } else {
      return axios.post(url, data);
    }
  },
};

const SimLogin = () => {
  const { dispatch } = useContext(Context);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center">
      <div className="col-12 col-sm10 col-md-8 col-lg-4">
        {authError && <div className="alert alert-danger">{authError}</div>}
        <h1 className="text-center">Connexion</h1>
        <Formik
          initialValues={{ login: "", password: "" }}
          validationSchema={Yup.object({
            login: Yup.string()
              .required("Un identifiant est nécéssaire")
              .min(4, "Votre identifiant doit comporter au moins 4 caractères"),

            password: Yup.string()
              .required("Un mot de passe est nécéssaire")
              .min(
                8,
                "Votre mot de passe doit comporter au moins 8 caractères"
              ),
          })}
          onSubmit={async ({ login, password }) => {
            try {
              const response = await fakeaxios.post("/api/login", {
                login,
                password,
              });
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer: ${response.data.token}`;
              dispatch({ type: "setUser", payload: response.data.user });
              navigate("/");
            } catch (error) {
              if (error.status === 401) {
                setAuthError("Login ou mot de passe incorrect");
              } else {
                console.error(error);
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="login" className="form-label">
                  Identifiant
                </label>
                <Field className="form-control" id="login" name="login" />
                <ErrorMessage
                  name="login"
                  id="login"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <Field
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  id="logout"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Valider
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SimLogin;
