import React from 'react'
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Ranking from "./pages/Ranking"
import Factor from "./pages/Factor"
import Search from "./pages/Search"
import Home from "./pages/Home"
import "./assets/css/App.css"
import "./assets/css/NavBar.css"
import PrivateRoute from "./components/PrivateRoute"
import PreventLoginRoute from "./components/PreventLoginRoute"

function App() {
  return (
    <div>
      <header className="app-nav">
        <NavBar />
      </header>
      <div>
        <Route exact path="/" component={ Home } />
        <Switch>  
          <Route path="/ranking" component={ Ranking }/>
          <PreventLoginRoute path="/login" component={ Login }/>
          <PreventLoginRoute path="/register" component={ Register }/>
          <PrivateRoute path="/factor" component={ Factor } />
          <Route path="/search" component={ Search }/>
        </Switch>
      </div>
      <footer className="app-footer">
        <p className="home-btn"><a href="/">home</a></p>
        <p>Copyright © 2021 Jasmine Hur</p>
        <p>n10622012</p>
      </footer>
    </div>
  );
}


export default App;


