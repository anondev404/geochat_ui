import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import MainUI from './routes/MainUI/MainUI.js';

import SignIn from './routes/SignIn/SignIn.js';

import MainUIRouter from './routes/MainUIRouter/MainUIRouter.js';

//<MainUI></MainUI>
ReactDOM.render(
  <React.StrictMode>
    <MainUIRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
