import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

function PaginationNew(props) {
  const useStyles = makeStyles((theme) => ({
    input: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      "& .select": {
        color: "black",
        display: "flex",
        alignItems: "center",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.input}>
      <div className="select">
        <InputLabel id="demo-controlled-open-select-label">
          Rows per page:
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={props.pageLimit}
          // defaultValue={props.isUpdating ? props.courses : enteredCourse}
          onChange={props.rowsHandler}
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="15">15</MenuItem>
        </Select>
      </div>

      <Pagination
        count={props.pageCount}
        color="primary"
        page={props.page}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default PaginationNew;
