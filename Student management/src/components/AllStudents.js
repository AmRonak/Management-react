import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SingleStudent from "./SingleStudent";
import SingleCell from "./SingleCell";

function AllStudents(props) {
  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    head: {
      borderBottom: "1px solid black",
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.head}>
            <SingleCell
              label="Name"
              query="name"
              sortFunc={props.sortFunc}
              order={props.order}
            />
            <SingleCell
              label="Email"
              query="email"
              sortFunc={props.sortFunc}
              order={props.order}
            />
            <SingleCell
              label="Gender"
              query="gender"
              sortFunc={props.sortFunc}
              order={props.order}
            />
            <TableCell style={{ fontWeight: "bold" }}>Mob No.</TableCell>
            <SingleCell
              label="City"
              query="city"
              sortFunc={props.sortFunc}
              order={props.order}
            />
            <SingleCell
              label="State"
              query="state"
              sortFunc={props.sortFunc}
              order={props.order}
            />
            <SingleCell
              label="Country"
              query="country"
              sortFunc={props.sortFunc}
              order={props.order}
            />
            <SingleCell
              label="Courses"
              query="courses"
              sortFunc={props.sortFunc}
              order={props.order}
            />

            <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.studentDetails.map((data) => {
            return (
              <SingleStudent
                key={data.id}
                id={data.id}
                name={data.name}
                email={data.email}
                gender={data.gender}
                phone={data.phone}
                city={data.city}
                state={data.state}
                country={data.country}
                courses={data.courses}
                removeStudent={props.removeStudent}
                updateStudent={props.updateStudent}
                isUpdating={props.isUpdating}
                singleUpdate={props.singleUpdate}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllStudents;
