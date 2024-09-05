import React from "react";
import { Link } from "react-router-dom";

export default function() {
  return (
    <div>
      <h2>La pagina solicitada no se ha encontrado</h2>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}