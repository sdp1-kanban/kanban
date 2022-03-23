import React, { useState } from "react";
import Board from "../components/home/Board/Board";
import NavBar from "../components/home/NavBar/NavBar";

function Home() {
  return (
    <div style={{background: 'white'}}>
      <NavBar />
      <Board />
    </div>
  );
}

export default Home;
