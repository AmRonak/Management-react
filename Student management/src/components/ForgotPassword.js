import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SimpleCard from "./SimpleCard";
import Button from "@material-ui/core/Button";
import useInput from "../hooks/useInput";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { updateData } from "../requests";

const useStyles = makeStyles((theme) => ({
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

function ForgotPassword(props) {
  const history = useHistory();
  const classes = useStyles();
  const [error, setError] = useState(null);

  // Email input
  const { enteredInput: enteredEmail, changeHandler: emailInputChangeHandler } =
    useInput("", (value) => value.includes("@"));

  // Password Input
  // Password Input
  const {
    enteredInput: enteredPassword,
    inputValid: passwordInputIsValid,
    inputInvalid: passwordInputIsInvalid,
    blurHandler: passwordInputBlurHandler,
    changeHandler: passwordInputChangeHandler,
  } = useInput("", (value) => value.trim().length >= 8);

  // Confirm Password Input
  const {
    enteredInput: enteredConfirmPassword,
    inputValid: confirmPasswordInputIsValid,
    inputInvalid: confirmPasswordInputIsInvalid,
    blurHandler: confirmPasswordInputBlurHandler,
    changeHandler: confirmPasswordInputChangeHandler,
  } = useInput("", (value) => value.trim() === enteredPassword);

  const submitHandler = async (e) => {
    e.preventDefault();

    passwordInputBlurHandler();
    confirmPasswordInputBlurHandler();

    if (!passwordInputIsValid || !confirmPasswordInputIsValid) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/studentDetails?email=${enteredEmail}`
      );
      const responseData = response.data[0];
      updateData(
        responseData.id,
        { ...responseData, password: enteredPassword },
        setError
      );
      history.push("/");
    } catch (e) {
      setError("Request Failed Please Try Again!");
    }
  };

  return (
    <SimpleCard>
      <div style={{ textAlign: "center" }}>
        <h1>Change Password</h1>
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
        {/* Password Input */}
        <div className={classes.inp}>
          <TextField
            id="password"
            label="Password"
            type="password"
            className="form-controls"
            value={enteredPassword}
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlurHandler}
          />
          {passwordInputIsInvalid && (
            <p className="error" style={{ color: "crimson" }}>
              Password must be 8 character long!
            </p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className={classes.inp}>
          <TextField
            id="confirm password"
            label="Confirm Password"
            type="password"
            className="form-controls"
            value={enteredConfirmPassword}
            onChange={confirmPasswordInputChangeHandler}
            onBlur={confirmPasswordInputBlurHandler}
          />
          {confirmPasswordInputIsInvalid && (
            <p className="error" style={{ color: "crimson" }}>
              Password does not match!
            </p>
          )}
        </div>
        {error && <p style={{ textAlign: "center" }}>{error}</p>}
        {/* <div className={classes.inp}>
          <Link className={classes.link} to="/forgot-password">
            Forot Password?
          </Link>
        </div> */}
        <div className={classes.inp}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="save"
          >
            Change Password
          </Button>
        </div>
      </form>
    </SimpleCard>
  );
}
export default ForgotPassword;
