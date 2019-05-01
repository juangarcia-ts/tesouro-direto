import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Landing, BlogIndex, BlogPost, AdminPost, NotFound } from "./pages";
import { Navbar } from "./components";
import "./App.scss";

const App = () => (
  <Router>
    <div className="app">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/blog" component={BlogIndex} />
        <Route exact path="/blog/:id" component={BlogPost} />
        <Route exact path="/admin/posts" component={AdminPost} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;
