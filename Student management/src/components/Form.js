import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import useStyles from "../helpers/makeStyles";
import StyledRadio from "../helpers/styledRadio";
import useInput from "../hooks/useInput";
import uuid from "uuid/dist/v4";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const names = ["React", "Node JS", "Express JS", "Javascript"];

// function getStyles(name, personName) {
//   return {
//     fontWeight: personName.indexOf(name) === -1 ? "400" : "500",
//   };
// }
export default function Form(props) {
  const classes = useStyles();

  // Name Input
  const {
    enteredInput: enteredName,
    inputValid: nameInputIsValid,
    inputInvalid: nameInputIsInvalid,
    blurHandler: nameInputBlurHandler,
    changeHandler: nameInputChangeHandler,
    reset: nameInputReset,
  } = useInput(
    props.isUpdating ? props.name : "",
    (value) => value.trim() !== ""
  );

  // Email input
  const {
    enteredInput: enteredEmail,
    inputValid: emailInputIsValid,
    inputInvalid: emailInputIsInvalid,
    blurHandler: emailInputBlurHandler,
    changeHandler: emailInputChangeHandler,
    reset: emailInputReset,
  } = useInput(props.isUpdating ? props.email : "", (value) =>
    value.includes("@")
  );

  // Password Input
  const {
    enteredInput: enteredPassword,
    inputValid: passwordInputIsValid,
    inputInvalid: passwordInputIsInvalid,
    blurHandler: passwordInputBlurHandler,
    changeHandler: passwordInputChangeHandler,
    reset: passwordInputReset,
  } = useInput("", (value) => value.trim().length >= 8);

  // Confirm Password Input
  const {
    enteredInput: enteredConfirmPassword,
    inputValid: confirmPasswordInputIsValid,
    inputInvalid: confirmPasswordInputIsInvalid,
    blurHandler: confirmPasswordInputBlurHandler,
    changeHandler: confirmPasswordInputChangeHandler,
    reset: confirmPasswordInputReset,
  } = useInput("", (value) => value.trim() === enteredPassword);

  // Gender Input
  const {
    enteredInput: enteredGender,
    inputValid: genderInputIsValid,
    inputInvalid: genderInputIsInvalid,
    blurHandler: genderInputBlurHandler,
    changeHandler: genderInputChangeHandler,
    reset: genderInputReset,
  } = useInput(props.isUpdating ? props.gender : "", (value) => value);

  // Course Input
  const [enteredCourse, setEnteredCourse] = React.useState(
    props.isUpdating ? props.courses : []
  );
  const handleChange = (event) => {
    setEnteredCourse(event.target.value);
  };
  // console.log(props.courses);

  // MobileNumver Input
  const {
    enteredInput: enteredMobNo,
    inputValid: mobNoInputIsValid,
    inputInvalid: mobNoInputIsInvalid,
    blurHandler: mobNoInputBlurHandler,
    changeHandler: mobNoInputChangeHandler,
    reset: mobNoInputReset,
  } = useInput(
    props.isUpdating ? props.phone : "",
    (value) => value.trim().length === 10
  );

  // City Input
  const {
    enteredInput: enteredCity,
    inputValid: cityInputIsValid,
    inputInvalid: cityInputIsInvalid,
    blurHandler: cityInputBlurHandler,
    changeHandler: cityInputChangeHandler,
    reset: cityInputReset,
  } = useInput(
    props.isUpdating ? props.city : "",
    (value) => value.trim() !== ""
  );

  // State Input
  const {
    enteredInput: enteredState,
    inputValid: stateInputIsValid,
    inputInvalid: stateInputIsInvalid,
    blurHandler: stateInputBlurHandler,
    changeHandler: stateInputChangeHandler,
    reset: stateInputReset,
  } = useInput(
    props.isUpdating ? props.state : "",
    (value) => value.trim() !== ""
  );

  // Country Input
  const {
    enteredInput: enteredCountry,
    inputValid: countryInputIsValid,
    inputInvalid: countryInputIsInvalid,
    blurHandler: countryInputBlurHandler,
    changeHandler: countryInputChangeHandler,
    reset: countryInputReset,
  } = useInput(
    props.isUpdating ? props.country : "",
    (value) => value.trim() !== ""
  );

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    nameInputBlurHandler();
    emailInputBlurHandler();
    passwordInputBlurHandler();
    confirmPasswordInputBlurHandler();
    genderInputBlurHandler();
    // courseInputBlurHandler();
    mobNoInputBlurHandler();
    cityInputBlurHandler();
    stateInputBlurHandler();
    countryInputBlurHandler();

    if (
      !nameInputIsValid ||
      !emailInputIsValid ||
      !genderInputIsValid ||
      // !courseInputIsValid ||
      !mobNoInputIsValid ||
      !cityInputIsValid ||
      !stateInputIsValid ||
      !countryInputIsValid
    ) {
      return;
    }
    if (
      !props.isUpdating &&
      (!passwordInputIsValid || !confirmPasswordInputIsValid)
    ) {
      return;
    }

    const newInfo = {
      id: props.isUpdating ? props.id : uuid(),
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      gender: enteredGender,
      phone: enteredMobNo,
      city: enteredCity,
      state: enteredState,
      country: enteredCountry,
      courses: enteredCourse,
    };

    if (props.isUpdating) {
      props.updateStudent(props.id, newInfo);
    } else {
      props.addNewStudent(newInfo);
    }

    nameInputReset();
    emailInputReset();
    passwordInputReset();
    confirmPasswordInputReset();
    genderInputReset();
    // courseInputReset();
    mobNoInputReset();
    cityInputReset();
    stateInputReset();
    countryInputReset();

    props.closeModal();
  };

  return (
    <>
      {props.isUpdating && <h2>Update Your Details</h2>}
      {!props.isUpdating && <h2>Add New Details</h2>}

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <div className="form-container">
          {/* Name Input */}
          <div className="inp">
            <TextField
              id="name"
              label="Name"
              value={enteredName}
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              className="form-controls"
            />
            {nameInputIsInvalid && <p className="error"> Please enter text!</p>}
          </div>

          {/* Email Input */}
          <div className="inp">
            <TextField
              id="email"
              label="Email"
              className="form-controls"
              value={enteredEmail}
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
            />
            {emailInputIsInvalid && (
              <p className="error"> Please enter a valid email address!</p>
            )}
          </div>

          {!props.isUpdating && (
            <>
              {/* Password Input */}
              <div className="inp">
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
                  <p className="error"> Password must be 8 character long!</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="inp">
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
                  <p className="error"> Password does not match!</p>
                )}
              </div>
            </>
          )}

          {/* Gender Input */}
          <div className="inp" style={{ display: "inline" }}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              defaultValue="male"
              aria-label="gender"
              name="customized-radios"
              value={enteredGender}
              onChange={genderInputChangeHandler}
              onBlur={confirmPasswordInputBlurHandler}
            >
              <FormControlLabel
                value="female"
                control={<StyledRadio />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<StyledRadio />}
                label="Male"
              />
            </RadioGroup>
            {genderInputIsInvalid && (
              <p className="error">Select your gender.</p>
            )}
          </div>

          {/* Course Input */}
          <div className="inp">
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-checkbox-label">Courses</InputLabel>
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={enteredCourse}
                onChange={handleChange}
                input={<Input />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={enteredCourse.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <InputLabel id="demo-controlled-open-select-label">
              Courses
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={enteredCourse}
              onChange={courseInputChangeHandler}
              onBlur={courseInputBlurHandler}
            >
              <MenuItem value="Javascript">Javascript</MenuItem>
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Node JS">Node JS</MenuItem>
              <MenuItem value="Express JS">Express JS</MenuItem>
            </Select> */}
            {/* {courseInputIsInvalid && (
              <p className="error">Select your Course.</p>
            )} */}
          </div>

          {/* Mob No. Input */}
          <div className="inp">
            <TextField
              id="mobile no"
              label="Mobile No."
              type="number"
              className="form-controls"
              value={enteredMobNo}
              onChange={mobNoInputChangeHandler}
              onBlur={mobNoInputBlurHandler}
            />
            {mobNoInputIsInvalid && (
              <p className="error">Enter valid mobile number!</p>
            )}
          </div>

          {/* City Input */}
          <div className="inp">
            <TextField
              id="city"
              label="City"
              className="form-controls"
              value={enteredCity}
              onChange={cityInputChangeHandler}
              onBlur={cityInputBlurHandler}
            />
            {cityInputIsInvalid && <p className="error">Enter your City.</p>}
          </div>

          {/* State Input */}
          <div className="inp">
            <TextField
              id="state"
              label="State"
              className="form-controls"
              value={enteredState}
              onChange={stateInputChangeHandler}
              onBlur={stateInputBlurHandler}
            />
            {stateInputIsInvalid && <p className="error">Enter your state.</p>}
          </div>

          {/* Country Input */}
          <div className="inp">
            <TextField
              id="country"
              label="Country"
              className="form-controls"
              value={enteredCountry}
              onChange={countryInputChangeHandler}
              onBlur={countryInputBlurHandler}
            />
            {countryInputIsInvalid && (
              <p className="error">Enter your Country Name!</p>
            )}
          </div>
        </div>

        <div className="save">
          <Button
            variant="contained"
            color="secondary"
            type="button"
            className="save"
            style={{ marginRight: "10px" }}
            onClick={() => props.closeModal()}
          >
            Cancle
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="save"
          >
            {props.isUpdating ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
}
