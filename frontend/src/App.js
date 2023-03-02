import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import ExplorePage from "./components/ExplorePage"
import TrailPage from "./components/TrailShow";

function App() {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginFormPage />
      </Route>
      <Route exact path="/signup">
        <SignupFormPage />
      </Route>
      <Route exact path="/explore">
        <ExplorePage />
      </Route>
      <Route exact path="/trails/:trailId">
        <TrailPage />
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default App;
