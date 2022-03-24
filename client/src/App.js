import {useState, useMemo, useEffect, useRef} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";
import {ModalContext} from "./Context";
import Modal from "./components/Modal/Modal";


function App() {
  const [modal, setModal] = useState({showModal: false, config: {title: '', message: '', buttons: []}});
  let windowOffset = useRef(0);

  const value = useMemo(
    () => ({ modal, setModal }), 
    [modal, setModal]
  );
  
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

  useEffect(() => {
    preventModalScroll();
  }, [modal]);

  return (
    <div className="App">
      <ModalContext.Provider value={value} >
        {modal.showModal && <Modal/>}
        <Router>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route component={NotFound} />
          </Switch>
        </Router>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
