import React, { useEffect, useRef } from "react";
import { useModal } from "../../contexts/ModalContext";
import {
  ModalBackground,
  ModalContainer,
  TitleCloseButton,
  Title,
  Body,
  Footer,
} from "./Modal.styled";

function Modal(props) {
  const { modal, setModal } = useModal();
  const messageBodyRef = useRef();

  useEffect(()=>{
    messageBodyRef.current.innerHTML = modal.config.message;
  },[]);
  
  return (
    <ModalBackground>
      <ModalContainer>
        <TitleCloseButton>
          <button
            onClick={() => {
              setModal({ ...modal, showModal: false });
            }}
          >
            X
          </button>
        </TitleCloseButton>
        <Title>
          <h1>{modal.config.title}</h1>
        </Title>
        <Body>
          <p ref={messageBodyRef}></p>
        </Body>

        {/* Buttons */}
        <Footer>
          {modal.config.buttons.map((button) => (
            <button
              key={button.text}
              onClick={() => button.onClick()}
              className={button.className}
            >
              {button.text}
            </button>
          ))}
        </Footer>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;
