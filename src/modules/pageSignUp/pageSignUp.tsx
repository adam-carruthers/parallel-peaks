import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { registerApi } from "../../data/userApi";
import { toast } from "react-toastify";
import { APIFormError } from "../../data/apiUtils";
import LoginPagesWrapper from "../../misc/loginPagesWrapper";

const SignupSchema = Yup.object({
  username: Yup.string()
    .required("Required")
    .max(30, "No longer than 30 characters")
    .matches(/^[\w.@+-]+$/, "Must only contain letters/numbers/./@/+/-"),
  email: Yup.string().required("Required").email("Invalid email"),
  password1: Yup.string()
    .required("Required")
    .min(8, "Min length 8")
    .test(
      "not-all-numeric",
      "Cannot be all numeric",
      (password: string | undefined) => !password?.match(/^\d*$/)
    ),
  password2: Yup.string().oneOf(
    [Yup.ref("password1")],
    "Passwords must match."
  ),
});

const PageSignUp = () => {
  const history = useHistory();
  return (
    <LoginPagesWrapper
      pageName="Sign Up"
      topOfPageInfo={
        <>
          <span className="text-muted">Already got an account? </span>
          <Link to="/login">Login here.</Link>
        </>
      }
    >
      <Formik
        initialValues={{
          username: "",
          email: "",
          password1: "",
          password2: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (
          { username, email, password1, password2 },
          { setSubmitting, setErrors, setStatus }
        ) => {
          setStatus(null);
          try {
            await registerApi(username, email, password1, password2);
            history.push("/");
            toast.success(
              "Created a user, you now need to verify your email to login.",
              { autoClose: 10000 }
            );
          } catch (err) {
            setSubmitting(false);
            if (err instanceof APIFormError) {
              const errsAsString: Record<string, string> =
                err.getErrorObjNoListsJustStrings();
              setErrors(errsAsString);
              if (errsAsString.non_field_errors) {
                setStatus(errsAsString.non_field_errors);
              }
            } else {
              setStatus(
                "There was a problem. Check your internet connection and try again."
              );
            }
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && (
              <div className="pp-form-error text-danger mb-2">
                <i className="fas fa-exclamation-triangle mr-1" /> {status}
              </div>
            )}
            <fieldset disabled={isSubmitting}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  className="form-control"
                  id="username"
                  name="username"
                  type="text"
                />
                <ErrorMessage
                  className="text-danger"
                  name="username"
                  component="div"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                />
                <ErrorMessage
                  className="text-danger"
                  name="email"
                  component="div"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password1">Password</label>
                <Field
                  className="form-control"
                  id="password1"
                  name="password1"
                  type="password"
                />
                <ErrorMessage
                  className="text-danger"
                  name="password1"
                  component="div"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Password Confirm</label>
                <Field
                  className="form-control"
                  id="password2"
                  name="password2"
                  type="password"
                />
                <ErrorMessage
                  className="text-danger"
                  name="password2"
                  component="div"
                />
              </div>
              <div className="form-group">
                <input
                  className="btn btn-primary btn-block"
                  type="submit"
                  value={isSubmitting ? "Loading..." : "Sign Up"}
                />
              </div>
            </fieldset>
          </Form>
        )}
      </Formik>
    </LoginPagesWrapper>
  );
};

export default PageSignUp;
