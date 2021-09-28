import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import PasswordResetScreen from "./components/screens/PasswordResetScreen";
import PrivateScreen from "./components/screens/PrivateScreen";

import PrivateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={PasswordResetScreen}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
