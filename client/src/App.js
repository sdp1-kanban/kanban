import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import JobError from "./pages/JobError";
import "./App.css";
import {ModalContextProvider} from "./contexts/ModalContext";

function App() {
  return (
    <div className="App">
      <ModalContextProvider>
          <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route component={NotFound} />
            </Switch>
          </Router>
      </ModalContextProvider>
    </div>
  );
}

export default App;
