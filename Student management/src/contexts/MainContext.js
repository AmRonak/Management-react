import React, { createContext, useState } from "react";
import { addData, updateData, removeData } from "../requests";

const MainContext = createContext({
  studentDetails: [],
  addNewStudent: (studentInfo) => {},
  removeStudent: (id) => {},
  updateStudent: (id, updatedData) => {},
});

export const MainContextProvider = (props) => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [pageLimit, setPageLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [lengthOfData, setLengthOfData] = useState(0);
  const [query, setQuery] = useState("name");
  const [order, setOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

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

  const mainObj = {
    studentDetails,
    addNewStudent,
    removeStudent,
    updateStudent,
    setStudentDetails,
    setError,
  };

  return (
    <MainContext.Provider value={mainObj}>
      {props.children}
    </MainContext.Provider>
  );
};

export default MainContext;
