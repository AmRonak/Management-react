import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Form from "./Form";
import "./AppBar.css";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `50%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  searchBar: {
    "&  input": {
      padding: "10px",
    },
    "& label": {
      lineHeight: "0px",
    },
  },
  paper: {
    position: "absolute",
    width: 800,
    height: "85%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid lightblue",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
  },
}));

function AppBar(props) {
  const authCtx = useContext(AuthContext);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Form closeModal={handleClose} addNewStudent={props.addNewStudent} />
    </div>
  );

  const changeHandler = (e) => {
    props.searchFunc(e.target.value);
  };

  const handleLogout = () => {
    authCtx.logoutHandler();
  };

  return (
    <div className="AppBar">
      <div className="logo-search">
        <h1 className="logo">Management</h1>
        <TextField
          className={classes.searchBar}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          fullWidth
          onChange={changeHandler}
        />
      </div>
      <div>
        <Button
          style={{ marginRight: "10px" }}
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Add New
        </Button>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default AppBar;
