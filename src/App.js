
import './App.css';
import {BrowserRouter, Route, Switch, Router} from 'react-router-dom';
import Header from "./components/Header";
import React,{Fragment} from "react";
import UserDetail from "./Pages/UserDetail";
import NotFound from "./Pages/NotFound";
import UserDetails from "./Pages/AllUsersDetails";
function App() {

  return (
      <BrowserRouter>
        <Fragment>
          <Header/>
          <div>
            <Switch>
                <Route  key="/user"  path="/user"  render={() => <UserDetail/>}/>
                <Route exact path="/" render={() => <UserDetails/>}/>
                <Route  path="*" render={() => <NotFound/>}/>
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>

  );


}

export default App;
