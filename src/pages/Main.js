/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import WorkIcon from '@material-ui/icons/Work';
import Clock from 'react-live-clock';
import Logo from '../assets/images/logo.png';
import Home from './Home';
import News from './News';
import Teachers from './Teachers';
import Status from './Status';
import { configTeachers, configStatus } from './Config';

const Main = ({match}) => {
  const [value, setValue] = useState(0);

  return (
    <div className="mainContainer">
      <div className="header">
        <AppBar position="static" className="appbar">
          <div className="logo">
            <img src={Logo} alt="한양공업고등학교" />
          </div>
          <div className="clockContainer"> 
            <div className="clock">
              <div className="clockDate">
                <div className="dateDay">
                  <Clock format="M/DD" />
                </div>
                <div className="dateYear">
                  <Clock format="YYYY" />
                </div>
              </div>
              <div className="clockTime">
                <Clock className="innerClock" format="HH:mm" ticking />
              </div>
            </div>
          </div>
        </AppBar>
      </div>
      <div className="content">
        <Route exact path={match.url} render={() => (<Home />)} />
        <Route path={`${match.url}/teachers`} render={() => (<Teachers />)} />
        <Route path={`${match.url}/status`} render={() => (<Status />)} />
        <Route path={`${match.url}/news/:idx`} component={News} />
        <Route path={`${match.url}/config/teachers`} component={configTeachers} />
        <Route path={`${match.url}/config/status`} component={configStatus} />
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, data) => setValue(data)}
        showLabels
        className="bottom"
      >
        <BottomNavigationAction label="홈" icon={<HomeIcon />} className="bottomAction" component={Link} to="/main" />
        <BottomNavigationAction label="선생님" icon={<PeopleIcon />} className="bottomAction" component={Link} to="/main/teachers" />
        <BottomNavigationAction label="진학현황" icon={<WorkIcon />} className="bottomAction" component={Link} to="/main/status" />
      </BottomNavigation>
    </div>
  );
};

export default Main;