import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import JobForm from "./components/JobForm/JobForm"
import NavBar from "./components/home/NavBar/NavBar";
import "./App.css";
import { ModalContextProvider } from "./contexts/ModalContext";
import { BoardContextProvider } from "./contexts/BoardContext";

function App() {
  return (
    <div className="App">
      <BoardContextProvider>
        <ModalContextProvider>
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/addjob" component={JobForm} />
              <Route path="/editJob" component={JobForm} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </ModalContextProvider>
      </BoardContextProvider>
    </div>
  );
}

export default App;
