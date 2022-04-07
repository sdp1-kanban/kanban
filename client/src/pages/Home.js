import React, { useEffect, useRef } from "react";
import Board from "../components/home/Board/Board";
import Modal from "../components/Modal/Modal";
import { useModal } from "../contexts/ModalContext";

function Home() {
  const windowOffset = useRef(0);
  const { modal } = useModal();

  // Prevents scrolling while modal is open
  const preventModalScroll = () => {
    if (modal.showModal) {
      windowOffset.current = window.scrollY;
      document.body.setAttribute('style', `position: fixed; top: -${windowOffset.current}px; left: 0; right: 0;`)
    } else {
      document.body.setAttribute('style', '');
      window.scrollTo(0, windowOffset.current);
    }
  }

  useEffect(() => {
    preventModalScroll();
  }, [modal])

  return (
    <div style={{ background: 'white' }}>
      {modal.showModal && <Modal />}
      <Board />
    </div>
  );
}

export default Home;
