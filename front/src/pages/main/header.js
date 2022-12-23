import React from 'react';
import { Link } from "react-router-dom";




export const Header = () => {
  return (<div>
        <menu>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: '#e3f2fd' }}>
            <Link className="navbar-brand" to="/">BK Base</Link>

            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#about">О компании</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#services">Услуги</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#contacts">Контакты</a>
                    </li>
                </ul>
            </div>
        </nav>
    </menu>
  </div>);
}