import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  Landing,
  BlogIndex,
  BlogPost,
  AdminPost,
  NotFound,
  Auth,
  Home,
  InvestorProfile,
  Settings
} from "./pages";
import { Navbar } from "./components";
import { getToken } from "./utils/token";
import { firebaseConfig } from "./config";
import "./App.scss";

const App = () => {
  firebase.initializeApp(firebaseConfig);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          {/* Público */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/blog" component={BlogIndex} />
          <Route exact path="/blog/:id" component={BlogPost} />
          <Route exact path="/entrar" component={Auth} />
          {/* Logado */}
          <PrivateRoute exact path="/pagina-inicial" component={Home} />
          <PrivateRoute exact path="/minha-conta" component={Settings} />
          <PrivateRoute
            exact
            path="/simular-perfil"
            component={InvestorProfile}
          />
          {/* Administrador */}
          <PrivateRoute exact path="/admin/blog" component={AdminPost} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ component: Comp, ...rest }) => {
  const token = getToken();

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/entrar",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default App;
