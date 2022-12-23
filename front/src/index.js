import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Navigation } from './navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Chart as ChartJS, Doughnul, Tooltip, Legend } from "chart.js";


import './index.css';


// ChartJS.register(ArcElement, Tooltip, Legend);


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Navigation />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
