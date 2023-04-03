import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const error = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.username) {
      error.username = "UserName is must";
    }

    if (!values.email) {
      error.email = "email is required";
    } else if(!regex.test(values.email)){
      error.email = "Email is not valid"
    }

    if (!values.password) {
      error.password = "password is required";
    }else if(values.password.length < 4 ){
      error.password = "Password must be greater than 4 digit"
    }else if(values.password.length > 10 ){
      error.password = "Password must be lesser than 10 digit"
    }
    return error;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  return (
    <div className="App">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div>Login Success</div>
      ) : (
        <>
          <p>
            Name :{" "}
            <span>
              <input
                name="username"
                value={formValues.username}
                onChange={handleChange}
              />
            </span>
          </p>
          <p style={{ color:"red"}}>{formErrors.username}</p>
          <p>
            Email :{" "}
            <span>
              <input
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </span>
          </p>
          <p style={{ color:"red"}}>{formErrors.email}</p>

          <p>
            Password :{" "}
            <span>
              <input
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </span>
          </p>
          <p style={{ color:"red"}}>{formErrors.password}</p>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
}

export default App;
