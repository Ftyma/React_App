import React from "react";
import logo from "../assets/logo.svg";
import footerImg from "../assets/footer.svg";
import { FormikErrors, useFormik } from "formik";

import "../css/LoginStyle.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

type LoginForm = {
  name: String;
  password: String;
};

export default function Login() {
  const authentication = (data: any) => {};

  const formik = useFormik<any>({
    initialValues: {
      name: "",
      password: "",
    },
    validate: (data) => {
      let errors: FormikErrors<any> = {};

      if (!data.name) {
        errors.name = "Name";
      }

      if (!data.password) {
        errors.password = "Password";
      }
      return errors;
    },
    onSubmit: (data) => {
      setTimeout(() => {
        authentication(data);
      }, 500);
    },
  });
  const getFromErrorMessage = () => {
    let errorMsg: String = "";
    let status: Boolean = false;
    if (formik.touched.name || formik.errors.name) {
      errorMsg = `${formik.errors.name} is required .`;
      status = true;
    } else if (formik.touched.password || formik.errors.password) {
      errorMsg = `${formik.errors.password} is required .`;
      status = true;
    }
    return !status && <small className="p-error">{errorMsg}</small>;
  };

  return (
    <div className="flex flex-col w-full bg-orange">
      <img src={logo} className="mx-auto w-1/4 my-8" />

      <div className="flex justify-center mx-auto w-3/6 bg-white rounded-3xl">
        <div className="card w-5/6 mb-60">
          <h5 className="text-center text-3xl my-9">Register</h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field mb-6">
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                placeholder="username"
                onChange={formik.handleChange}
                className="rounded-3xl"
              />
            </div>
            <div className="field">
              <InputText
                id="password"
                name="password"
                value={formik.values.password}
                className="rounded-3xl"
                placeholder="password"
                onChange={formik.handleChange}
              />
            </div>
            {getFromErrorMessage()}

            <Button
              label="Submit"
              onClick={() => alert(1)}
              type="submit"
              className="mt-12 rounded-3xl bg-orange border-none"
            />
          </form>
        </div>
      </div>

      <img src={footerImg} className="fixed bottom-0" />
    </div>
  );
}
