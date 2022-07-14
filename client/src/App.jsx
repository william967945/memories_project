import React from "react";
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./Components/PostDetails/PostDetails";
import Navbar from "./Components/Navbar/Navbar";
import Home from './Components/Home/Home';
import Auth from "./Components/Auth/Auth";

const App = () => {
  const user = () => JSON.parse(localStorage.getItem('profile'));
  
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts"/>} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} /> {/* ':' means dynamic */}
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App;

