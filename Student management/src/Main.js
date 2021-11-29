import React, { useState, useEffect } from "react";
import AppBar from "./components/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AllStudents from "./components/AllStudents";
import { fetchData, addData, updateData, removeData } from "./requests";

import "./App.css";
import PaginationNew from "./components/PaginationNew";
import { useContext } from "react";
import AuthContext from "./contexts/AuthContext";
// import LoadingSpinner from "./components/LoadingSpinner";

function Main(props) {
  const authCtx = useContext(AuthContext);

  const [counter, setCounter] = useState(0);
  const [pageLimit, setPageLimit] = useState(5);
  const [query, setQuery] = useState("name");
  const [order, setOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [lengthOfData, setLengthOfData] = useState(0);
  const [studentDetails, setStudentDetails] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const setingCounter = (num) => {
    setCounter(num + 1);
  };

  const pageCount = Math.ceil((lengthOfData - 1) / pageLimit);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const singleUpdate = () => {
    setIsUpdating(true);
  };

  useEffect(() => {
    fetchData(
      setLengthOfData,
      setStudentDetails,
      setError,
      page,
      pageLimit,
      query,
      order,
      searchQuery,
      authCtx.loggedIn
      // setIsLoading
    );
  }, [page, query, order, pageLimit, searchQuery, authCtx.loggedIn]);

  // ADDING NEW STUDENT
  const addNewStudent = (studentInfo) => {
    setStudentDetails((prev) => [...prev, studentInfo]);
    addData(studentInfo, setError);
  };

  // REMOVING STUDENT
  const removeStudent = (id) => {
    setStudentDetails((prev) => {
      return prev.filter((data) => data.id !== id);
    });
    removeData(id, setError);
  };

  // UPDATING STUDENT
  const updateStudent = (id, updatedData) => {
    setStudentDetails((prev) => {
      return prev.map((data) => {
        return data.id === id ? { ...data, ...updatedData } : data;
      });
    });
    updateData(id, updatedData, setError);
  };

  // SORT BY QUERY & ORDER
  const sortFunc = async (query) => {
    try {
      setQuery(query);
      if (order === "asc") {
        setOrder("desc");
      } else {
        setOrder("asc");
      }
    } catch (e) {
      setError("Something went wrong!");
    }
  };

  // SEARCH ON EVERY KEY STROKE
  const searchFunc = (keyword) => {
    setPage(1);
    setSearchQuery(keyword);
  };

  // UPDATE PAGE
  const rowsHandler = (e) => {
    setPageLimit(e.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <AppBar
          addNewStudent={addNewStudent}
          searchFunc={searchFunc}
          logoutHandler={props.logoutHandler}
        />
        {/* {!error && studentDetails.length === 0 && <LoadingSpinner />} */}
        {error && <p className="centered h1">{error}</p>}

        {!error && studentDetails.length === 0 && (
          <p className="centered h1">No matching records found</p>
        )}
        {!error && studentDetails.length > 0 && (
          <>
            <AllStudents
              // studentDetails={!isFiltering ? studentDetails : filteredArray}
              studentDetails={studentDetails}
              removeStudent={removeStudent}
              updateStudent={updateStudent}
              isUpdating={isUpdating}
              singleUpdate={singleUpdate}
              sortFunc={sortFunc}
              order={order}
              changeCounter={setingCounter}
              counter={counter}
            />
            <PaginationNew
              pageLimit={pageLimit}
              rowsHandler={rowsHandler}
              pageCount={pageCount}
              page={page}
              handleChange={handleChange}
            />
          </>
        )}
      </Container>
    </React.Fragment>
  );
}

export default Main;
