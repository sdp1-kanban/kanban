import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddJob from "./pages/AddJob";
import JobDetail from "./pages/JobDetail/JobDetail";
import "./App.css";
import {ModalContextProvider} from "./contexts/ModalContext";

function App() {
  return (
    <div className="App">
      <ModalContextProvider>
          <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/addjob" component={AddJob} />
                <Route path="/jobs/:id" component={JobDetail} />
                <Route component={NotFound} />
            </Switch>
          </Router>
      </ModalContextProvider>
    </div>
  );
}

export default App;
