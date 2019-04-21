import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Splash, Main } from './pages';

class App extends Component {
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Route exact path="/" component={Splash} />
        <Route path="/main" component={Main} />
      </div>
    );
  }
};

export default App;