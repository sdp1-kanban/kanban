import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { AddJob } from "./pages/AddJob";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/addJob" exact component={AddJob} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
