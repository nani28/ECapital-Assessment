import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent: React.FC<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark d-flex justify-content-center">
        <div>
          <Link to="/" className="navbar-brand">
            ECapital Employee Management
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default HeaderComponent;
