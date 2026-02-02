import React, { useState, useCallback, useEffect, useContext }  from "preact/hooks";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import "./loginPopup.scss";
import { assets } from "../../assets/frontend_assets/assets";
import ModalPolicy from "../../components/Modal/ModalPolicy/ModalPolicy";
import SecurityInput from "../../components/SecurityInput/SecurityInput";
import PassGenerator from "../../components/PassGenerator/PassGenerator";
import "intro.js/introjs.css";
import { loginPopupIntroSteps } from "../../types";
import IntroTourButton from "../../components/IntroBtn/IntroBtn";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "preact-router";
import { FunctionalComponent } from "preact";

const LOGIN_MUTATION = gql`
  mutation loginAccount(
    $email: String!
    $password: String!
    $isEmployee: Boolean!
  ) {
    loginAccount(email: $email, password: $password, isEmployee: $isEmployee) {
      token
      name
      email
      isEmployee
    }
  }
`;
interface LoginPopupProps {
  showLogin: boolean;
  setShowLogin: (show: boolean) => void; // Fixed prop name here
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

const LoginPopup: FunctionalComponent<LoginPopupProps> = ({ showLogin, setShowLogin }) => {
  const authContext = useContext(AuthContext);

  if (!showLogin) return null;
  const [currState, setCurrState] = useState<string>("Login");
  const [showModalPolicy, setShowModalPolicy] = useState<boolean>(false);
  const [showPasswordGenerator, setShowPasswordGenerator] = useState<boolean>(
    false
  );
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    login({
      variables: {
        email: values.email,
        password: values.password,
        isEmployee: false,
      }, // Can be dynamically set based on login state
    })
      .then((response) => {
        const { name, token } = response.data.loginAccount;
        console.log({ token, name });
        authContext?.login(name); // Assuming authContext has login method to set token
        setShowLogin(false); // Close login popup
      })
      .catch((err) => {
        console.error("Login error:", err);
        setLoginError("Incorrect email or password."); // Set the error message

        actions.setSubmitting(false);
      });
  };

  const navigate = useNavigate(); // Dùng để chuyển hướng sau khi login thành công

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [showPasswordCriteria, setShowPasswordCriteria] = useState<boolean>(
    false
  );

  const validatePassword = useCallback((password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]/.test(password);

    setPasswordValidation({
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    });
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((e.target as HTMLElement).classList.contains("login-popup")) {
        setShowLogin(false);
      }
    },
    [setShowLogin]
  );

  useEffect(() => {
    console.log("Login-render");
  }, []);

  const validationSchema = Yup.object({
    name:
      currState === "Sign Up"
        ? Yup.string().required("*")
        : Yup.string().notRequired(),
    email: Yup.string()
      .email("Invalid email format")
      .required("*"),
    password: Yup.string().required("*"),
    terms:
      currState === "Sign Up"
        ? Yup.boolean().oneOf([true], "*")
        : Yup.boolean().notRequired(),
  });
  if (!showLogin) return <div>...Login not render</div>;

  return (
    <div class='login-popup' onClick={handleOverlayClick}>
      <Formik
        initialValues={{ name: "", email: "", password: "", terms: false }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form class='login-popup-container'>
            <div class='login-popup-title'>
              <h2 class='login-popup-title-text'>{currState}</h2>
              <img
                onClick={() => setShowLogin(false)}
                src={assets.cross_icon}
                alt='Close'
                class='close-icon'
              />
            </div>
            <div
              class='login-popup-inputs'
              data-step='1'
              data-intro='Fill in your login details here.'
            >
              {currState === "Login" ? null : (
                <div>
                  <label htmlFor='name-input' class='name-label label'>
                    Name
                  </label>
                  <Field
                    class='input-login'
                    type='text'
                    name='name'
                    placeholder='Your name'
                    as={SecurityInput}
                  />
                  <ErrorMessage name='name' component='div' class='error' />
                </div>
              )}
              <div>
                <label htmlFor='email-input' class='email-label label'>
                  Email
                </label>
                <Field
                  class='input-login'
                  type='email'
                  name='email'
                  placeholder='Your email'
                  as={SecurityInput}
                />
                <ErrorMessage name='email' component='div' class='error' />
              </div>
              <div>
                <label
                  htmlFor='password-input'
                  class='password-label label'
                >
                  Password
                </label>
                <Field
                  class='input-login'
                  type='password'
                  name='password'
                  id='password-input'
                  placeholder='Your password'
                  as={SecurityInput}
                  onChange={(e:any) => {
                    const value = e.target.value;
                    setFieldValue("password", value);
                    validatePassword(value);
                    setShowPasswordCriteria(value.length > 0);
                  }}
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  class='error'
                />
                {loginError && (
                  <div class='error-message'>{loginError}</div>
                )}

                {showPasswordCriteria && currState === "Sign Up" && (
                  <div class='password-criteria'>
                    <div class='criteria-row'>
                      <div
                        class={`criteria-item ${
                          passwordValidation.minLength ? "valid" : "invalid"
                        }`}
                      >
                        {passwordValidation.minLength ? "✔️" : "❌"} At least 8
                        characters
                      </div>
                      <div
                        class={`criteria-item ${
                          passwordValidation.hasUpperCase ? "valid" : "invalid"
                        }`}
                      >
                        {passwordValidation.hasUpperCase ? "✔️" : "❌"} At least
                        one uppercase letter
                      </div>
                    </div>
                    <div class='criteria-row'>
                      <div
                        class={`criteria-item ${
                          passwordValidation.hasLowerCase ? "valid" : "invalid"
                        }`}
                      >
                        {passwordValidation.hasLowerCase ? "✔️" : "❌"} At least
                        one lowercase letter
                      </div>
                      <div
                        class={`criteria-item ${
                          passwordValidation.hasNumber ? "valid" : "invalid"
                        }`}
                      >
                        {passwordValidation.hasNumber ? "✔️" : "❌"} At least
                        one number
                      </div>
                    </div>
                    <div class='criteria-row'>
                      <div
                        class={`criteria-item ${
                          passwordValidation.hasSpecialChar
                            ? "valid"
                            : "invalid"
                        }`}
                      >
                        {passwordValidation.hasSpecialChar ? "✔️" : "❌"} At
                        least one special character
                      </div>
                    </div>
                  </div>
                )}
                {currState === "Sign Up" && (
                  <span
                    class='btn-pass-generator'
                    onClick={() => setShowPasswordGenerator(true)}
                  >
                    Generate Password
                  </span>
                )}
              </div>
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              class='btn-login'
              data-step='2'
              data-intro='Click here to submit your login details.'
            >
              {currState === "Sign Up" ? "Create account" : "Login"}
            </button>
            <div
              data-step='3'
              data-intro='Accept the terms and conditions to proceed.'
            >
              {currState === "Sign Up" && (
                <div class='container-terms'>
                  <Field type='checkbox' name='terms' id='terms' />
                  <label class='label-terms' htmlFor='terms'>
                    By continuing, I agree to{" "}
                    <span
                      class='span-terms'
                      onClick={() => setShowModalPolicy(true)}
                    >
                      the terms of use & privacy policy.
                    </span>
                  </label>

                  <ErrorMessage
                    name='terms'
                    component='div'
                    class='error'
                  />
                </div>
              )}
            </div>
            {currState === "Login" ? (
              <div class='form-login-bottom'>
                <p>
                  Create a new account?
                  <span
                    data-step='4'
                    class='text-sign-up'
                    data-intro="Don't have an account? Create one here."
                    onClick={() => setCurrState("Sign Up")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            ) : (
              <div class='form-login-bottom'>
                <p>
                  Already have an account?
                  <span
                    class='text-sign-up'
                    onClick={() => setCurrState("Login")}
                  >
                    Sign in
                  </span>
                </p>
                <IntroTourButton
                  class='btn-intro-login'
                  steps={loginPopupIntroSteps}
                />
              </div>
            )}
          </Form>
        )}
      </Formik>
      {showModalPolicy && (
        <ModalPolicy onClose={() => setShowModalPolicy(false)} />
      )}
      {showPasswordGenerator && (
        <PassGenerator
          onPasswordGenerated={(password: string) => {

            setShowPasswordGenerator(false);
          }}
          onClose={() => setShowPasswordGenerator(false)}
        />
      )}
    </div>
  );
};

export default LoginPopup;
