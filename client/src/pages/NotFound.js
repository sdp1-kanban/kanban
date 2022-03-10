import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      Page not found!
      <br />
      <Link to="/">Back to Home.</Link>
    </div>
  );
}

export default NotFound;
