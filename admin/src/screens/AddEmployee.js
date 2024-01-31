import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddEmployeeMain from "./../components/users/AddEmployeeMain";

const AddEmployee = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddEmployeeMain />
      </main>
    </>
  );
};

export default AddEmployee;
