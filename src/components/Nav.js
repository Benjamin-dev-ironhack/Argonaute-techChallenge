import React, { Component } from 'react'
import "../styles/Nav.css";
import {Link} from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
              <div className="header">
                <Link to="/">
                <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
                </Link>
                <h1>Les Agronautes</h1>
              </div>
        )
    }
}

export default Nav
