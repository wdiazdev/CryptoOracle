import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import OracleContext from './OracleContext';
import 'react-alice-carousel/lib/alice-carousel.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <OracleContext>
      <App />
    </OracleContext>
  </>
);
