import React, { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Splash, Main } from './pages';

const { ipcRenderer } = window.require('electron');

const App = withRouter(({history}) => {
  useEffect(() => {
    ipcRenderer.on('goSplash', () => {
      if (history.location.pathname !== '/') {
        history.push('/');
      }
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Route exact path="/" component={Splash} />
      <Route path="/main" component={Main} />
    </div>
  );
});

export default App;