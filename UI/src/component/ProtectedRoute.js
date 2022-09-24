import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component }) {
  const isAdmin = localStorage.getItem("isAdmin");

  return (
    <Route
      render={() =>
        isAdmin ? <Component/> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;