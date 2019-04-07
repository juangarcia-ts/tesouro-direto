import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Redirect
} from "react-router-dom";
import { Landing } from "./screens";
import { Navbar } from "./components";
// import { getToken } from "./utils/token";
import "./App.scss";

const App = () => (
  <Router>
    <div className="app">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        {/* <Route path="/map" component={PhotoMap} />
        <Route path="/auth" component={Auth} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/admin" component={AdminPanel} />
        <PrivateRoute path="/newpost" component={NewPost} />
        <Route component={Page404} /> */}
      </Switch>
    </div>
  </Router>
);

// const PrivateRoute = ({ component: Comp, ...rest }) => {
//   const token = getToken();

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         token ? (
//           <Comp {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/auth",
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   );
// };

export default App;
