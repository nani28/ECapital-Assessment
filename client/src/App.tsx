import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import AddUpdateEmployeeComponent from "./components/AddUpdateEmployeeComponent";

const App: React.FC<{}> = () => {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route
              path="/add-employee"
              element={<AddUpdateEmployeeComponent />}
            />
            <Route
              path="/edit-employee/:id"
              element={<AddUpdateEmployeeComponent />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
