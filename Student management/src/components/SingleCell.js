import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function SingleCell(props) {
  const useStyles = makeStyles((theme) => ({
    flex: {
      // display: "flex",
      position: "relative",
      cursor: "pointer",
      fontWeight: "bold",
      "& .arrow": {
        position: "absolute",
        right: 0,
        color: "grey",
        "&.up": {
          top: "10px",
        },
        "&.down": {
          bottom: "10px",
        },
        "&.up.active": {
          color: props.order === "asc" ? "blue" : "grey",
        },
        "&.down.active": {
          color: props.order === "desc" ? "blue" : "grey",
        },
      },
    },

    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();

  const sortHandler = (e) => {
    e.stopPropagation();
    const allChilds = e.target.parentElement.children;
    for (let child of allChilds) {
      if (child.children[0] && child.children[0].children[0].classList) {
        child.children[0].children[0].classList.remove("active");
        child.children[0].children[1].classList.remove("active");
      }
    }
    if (
      e.target.children[0] &&
      e.target.children[0].children[0] &&
      e.target.children[0].children[0].classList &&
      e.target.children[0].children[1].classList
    ) {
      e.target.children[0].children[0].classList.add("active");
      e.target.children[0].children[1].classList.add("active");
    }
    props.sortFunc(props.query);
  };

  return (
    <TableCell className={classes.flex} onClick={sortHandler}>
      {props.label}
      <div onClick={(e) => e.stopPropagation()}>
        <ArrowDropUpIcon className="arrow up" />
        <ArrowDropDownIcon className="arrow down" />
      </div>
    </TableCell>
  );
}

export default SingleCell;
