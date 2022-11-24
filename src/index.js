import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
        // StrictMode is a tool for highlighting potential problems in an application
        // StrictMode currently helps with:
        // 1.Identifying components with unsafe lifecycles
        // 2.Warning about legacy string ref API usage
        // 3.Warning about deprecated findDOMNode usage
        // 4.Detecting unexpected side effects
        // 5.Detecting legacy context API
        // 6.Ensuring reusable state 
  <React.StrictMode>  
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
