import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import footerImg from "../assets/footer.svg";
import { FormikErrors, useFormik } from "formik";

import custom from "../css/Login.module.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

type LoginForm = {
  name: String;
  password: String;
};

export default function Login() {
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);

  const authentication = (data: any) => {
    setFormError(false);
  };

  const formik = useFormik<any>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors: FormikErrors<any> = {};

      if (!data.email) {
        errors.email = "Email";
        setFormError(true);
      }

      if (!data.password) {
        errors.password = "Password";
        setFormError(true);
      }
      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
      setLoading(true);
      setTimeout(() => {
        authentication(data);
      }, 500);
    },
  });

  const getFromErrorMessage = () => {
    let errorMsg: String = "";
    let status: Boolean = false;
    if (formik.touched.email || formik.errors.email) {
      errorMsg = `${formik.errors.email} is required .`;
      status = true;
    } else if (formik.touched.password || formik.errors.password) {
      errorMsg = `${formik.errors.password} is required .`;
      status = true;
    } else {
      status = false;
    }
    console.log(errorMsg);
    return formError && <small className="p-error">{errorMsg}</small>;
  };

  return (
    <div className="flex flex-col w-full bg-orange">
      <img src={logo} className="mx-auto w-1/4 my-8" />
      {/* z-index: 2  */}
      <div className="flex justify-center mx-auto w-3/6 bg-white rounded-3xl z-10">
        <div className="card w-5/6 mb-60">
          <h5 className="text-center text-3xl my-9">Login</h5>

          <form onSubmit={formik.handleSubmit} className="p-fluid ">
            <div className="field mb-6">
              <InputText
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                //onBlur={formik.handleBlur}
                className={`${custom.loginInput}`}
              />
            </div>

            <div className="field">
              <Password
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={formik.values.password}
                className={`${custom.loginInput}`}
                //onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {getFromErrorMessage()}
            </div>

            <Button
              label={"Submit"}
              type="submit"
              className={`mt-12 rounded-3xl bg-orange border-none`}
            />
          </form>
        </div>
      </div>
      {/* z-idex:1 */}
      <img src={footerImg} className="fixed bottom-0 z-0" />
    </div>
  );
}
