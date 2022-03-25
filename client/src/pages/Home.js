import React, {useEffect, useRef}  from "react";
import Board from "../components/home/Board/Board";
import NavBar from "../components/home/NavBar/NavBar";
import Modal from "../components/Modal/Modal";
import { useModal } from "../contexts/ModalContext";
import { BoardContextProvider } from "../contexts/BoardContext";

function Home() {
  const windowOffset = useRef(0);
  const {modal} = useModal();

  // Prevents scrolling while modal is open
  const preventModalScroll = ()=>{
    if (modal.showModal) {
      windowOffset.current = window.scrollY;
      document.body.setAttribute('style', `position: fixed; top: -${windowOffset.current}px; left: 0; right: 0;`)
    } else {
      document.body.setAttribute('style', '');
      window.scrollTo(0, windowOffset.current);
    }
  }

  useEffect(()=>{
    preventModalScroll();
  }, [modal])
  
  return (
    <div style={{background: 'white'}}>
      <NavBar />
      {modal.showModal && <Modal/>}
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </div>
  );
}

export default Home;
