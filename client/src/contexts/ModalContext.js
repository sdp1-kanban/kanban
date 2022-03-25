import {createContext, useContext, useState, useMemo} from 'react';
const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalContextProvider({children}) {
    const [modal, setModal] = useState({showModal: false, config: {title: '', message: '', buttons: []}});
  
    const value = useMemo(
      () => ({ 
        modal,
        setModal,
      }), 
      [modal]
    );
    
    return (
        <ModalContext.Provider value={value} >
          {children}
        </ModalContext.Provider>
    )
}
