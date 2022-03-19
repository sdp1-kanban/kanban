import React, { useState } from "react";
import Board from "../components/home/Board";
import NavBar from "../components/home/NavBar";

function Home() {
  return (
    <div style={{background: 'white'}}>
      <NavBar />
      <Board />
    </div>
  );
}

export default Home;
