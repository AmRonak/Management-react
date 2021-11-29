import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  pagination: {
    float: "right",
    marginRight: "35px",
    marginBottom: "25px",
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination(props) {
  const classes = useStyles();
  const pageCount = Math.ceil(props.lengthOfData / props.pageLimit);

  const handleChange = (e, value) => {
    props.changePage(value);
  };
  return (
    <div className={classes.pagination}>
      <Pagination
        count={pageCount}
        color="primary"
        page={props.page}
        onChange={handleChange}
      />
    </div>
  );
}
