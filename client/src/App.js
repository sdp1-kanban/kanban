import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import JobForm from "./components/JobForm/JobForm";
import JobHistory from "./components/JobHistory/JobHistory";
import NavBar from "./components/home/NavBar/NavBar";
import "./App.css";
import { ModalContextProvider } from "./contexts/ModalContext";
import { BoardContextProvider } from "./contexts/BoardContext";
import JobDetail from "./pages/JobDetail/JobDetail";

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
              <Route path="/jobHistory" component={JobHistory} />
              <Route path="/jobs/:id" component={JobDetail} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </ModalContextProvider>
      </BoardContextProvider>
    </div>
  );
}

export default App;
