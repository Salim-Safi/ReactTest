import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Context } from "../context";

const Register2 = () => {
  const { dispatch } = useContext(Context);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://data.gouv.nc/api/records/1.0/search/?dataset=liste-des-pays-et-territoires-etrangers&q=&rows=300&facet=libcog"
      )
      .then((res) => setCountries(res.data.records));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center">
      <div className="col-12 col-sm10 col-md-8 col-lg-4">
        <h1 className="text-center">Inscription avec formik</h1>
        <Formik
          initialValues={{ name: "", email: "", password: "", country: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Un nom est nécéssaire")
              .min(2, "Votre nom doit comporter moins de 2 caractères")
              .max(50, "Votre nom doit comporter moins de 50 caractères"),

            email: Yup.string()
              .email("Format d'email invalide")
              .required("Un email est nécéssaire"),

            password: Yup.string()
              .required("Un mot de passe est nécéssaire")
              .min(
                8,
                "Votre mot de passe doit comporter au moins 8 caractères"
              ),

            country: Yup.string().required("un pays est nécéssaire"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              axios.post("https://jsonplaceholder.typicode.com/users", {
                values,
              });
              setSubmitting(false);
              navigate("/");
              dispatch({ type: "setUser", payload: values });
            } catch (error) {
              console.error(error);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nom
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field className="form-control" id="email" name="email" />
                <ErrorMessage
                  name="email"
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

              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Pays
                </label>
                <Field
                  component="select"
                  className="form-select"
                  id="country"
                  name="country"
                >
                  <option value=""></option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.fields.libcog}>
                      {country.fields.libcog}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="alert alert-warning"
                ></ErrorMessage>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
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

export default Register2;