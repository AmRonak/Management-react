import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Form from "./Form";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
  main: {
    "& > td": {
      paddingTop: "0",
      paddingBottom: "0",
    },
  },
  table: {
    minWidth: 650,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
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

function SingleStudent(props) {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    props.singleUpdate();
  };

  const handleClose = () => {
    setOpen(false);
  };
  // alert("hey");
  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to Delete?")) {
      // Save it!
      props.removeStudent(props.id);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Form
        closeModal={handleClose}
        isUpdating={props.isUpdating}
        updateStudent={props.updateStudent}
        {...props}
        //   addNewStudent={props.addNewStudent}
      />
    </div>
  );

  return (
    <>
      <TableRow className={classes.main}>
        <TableCell component="th" scope="row">
          {props.name}
        </TableCell>
        <TableCell>{props.email}</TableCell>
        <TableCell>{props.gender}</TableCell>
        <TableCell>{props.phone}</TableCell>
        <TableCell>{props.city}</TableCell>
        <TableCell>{props.state}</TableCell>
        <TableCell>{props.country}</TableCell>
        <TableCell>
          {/* {props.courses} */}
          {props.courses.join(", ")}
        </TableCell>
        <TableCell>
          <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteHandler}
            >
              <DeleteForeverIcon />
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
        </TableCell>
      </TableRow>
    </>
  );
}

export default SingleStudent;
