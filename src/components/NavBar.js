import React, { useEffect, useState } from 'react'
import "../assets/css/NavBar.css"

const NavBar = () => {
  const token = localStorage.getItem("token");
  const [openMenu, setOpenMenu] = useState(true);

  // Default navigation setting up
  useEffect(() => {
    if(token == null || token == undefined || token == 'undefined') {
      setOpenMenu(false)
    } else {
      setOpenMenu(true)
    }
  })

  // If loging out the web page will be re-freshed
  function logOut() {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  // Checking token for factor
  function factorTokenCheck() {
    if(token == null || token == undefined || token == 'undefined')
    {
      alert("This service needs to log in");
      window.location.href = "/login";
    } else {
      window.location.href = "/factor";
    }
  }

  // Prevent login or register twice
  function preventLoginTwice() {
    if(token == null || token == undefined || token == 'undefined') {
      window.location.href = "/login";
    } else {
      alert("Already you have logged in");
      window.location.href = "/";
    }
  }
  return(
    <nav>
      <div>
        <ul>
          <li className="home-btn"><a href="/">home</a></li>
          <li><a href="/ranking">Ranking</a></li>
          <li><a href="/search">Search</a></li>
          <li><a onClick={factorTokenCheck} className="li-text">Factor</a></li>
          <li className={openMenu? "hide-li" : ""}><a onClick={preventLoginTwice} href="/register">Register</a></li>
          <li className={openMenu? "hide-li" : ""}><a onClick={preventLoginTwice} href="/login">Log in</a></li>
          <li className={!openMenu? "hide-li" : ""}><a onClick={logOut} className="li-text">Log out</a></li>
        </ul>
      </div>
    </nav> 
  )
}

export default NavBar;