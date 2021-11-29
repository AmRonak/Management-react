import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SimpleCard from "./SimpleCard";
import Button from "@material-ui/core/Button";
import useInput from "../hooks/useInput";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const useStyles = makeStyles(() => ({
  inp: {
    margin: "0 auto",
    fontSize: "50px",
    width: "70%",
    marginBottom: "15px",
    "& > *": {
      width: "100%",
    },
  },
  link: {
    fontSize: "16px",
    display: "block",
    marginLeft: "65%",
  },
}));

function Login(props) {
  const authCtx = useContext(AuthContext);

  const classes = useStyles();
  const [error, setError] = useState(null);

  // Email input
  const { enteredInput: enteredEmail, changeHandler: emailInputChangeHandler } =
    useInput("", (value) => value.includes("@"));

  // Password Input
  const {
    enteredInput: enteredPassword,
    changeHandler: passwordInputChangeHandler,
  } = useInput("", (value) => value);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8000/studentDetails?email=${enteredEmail}&password=${enteredPassword}`
      );
      if (response.data.length === 0) {
        setError("Please enter valid email & password");
        return;
      }
      const userId = response.data[0].id;
      authCtx.loginHandler(userId);
      // localStorage.setItem("isLoggedIn", JSON.stringify(userId));
    } catch (e) {
      setError("Request Failed Please Try Again!");
    }
  };

  return (
    <SimpleCard>
      <div style={{ textAlign: "center" }}>
        <h1>Login</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className={classes.inp}>
          <TextField
            id="email"
            label="Email"
            type="email"
            className="form-controls"
            value={enteredEmail}
            onChange={emailInputChangeHandler}
          />
        </div>
        <div className={classes.inp}>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={enteredPassword}
            onChange={passwordInputChangeHandler}
            className="form-controls"
          />
        </div>
        {error && <p style={{ textAlign: "center" }}>{error}</p>}
        <div className={classes.inp}>
          <Link className={classes.link} to="/forgot-password">
            Forot Password?
          </Link>
        </div>
        <div className={classes.inp}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="save"
          >
            Login
          </Button>
        </div>
      </form>
    </SimpleCard>
  );
}
export default Login;
