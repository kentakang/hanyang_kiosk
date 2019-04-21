import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import Logo from '../assets/images/logo.png';
import Banner from '../assets/images/banner_1.jpg';

class Splash extends Component {
  render() {
    return (
      <Link to="/main" style={{ textDecoration: 'none' }} className="splash">
        <div className="container">
          <div className="logo">
            <img src={Logo} alt="한양공업고등학교" />
          </div>
          <div className="banner">
            <img src={Banner} alt="배너" width="100%" height="100%" />
          </div>
          <div className="bottom">
            <h1>
              한양공업고등학교<br />
              방문을 환영합니다
            </h1>
            <h2>
              제작 : 컴퓨터네트워크과 강찬
            </h2>
          </div>
        </div>
      </Link>
    );
  }
}

export default Splash;