import React from 'react';
import './App.css';
import Context from './services/Context';

function App() {
  return (
    <Context.Provider value={ {} }>
      <span>Hello, App!</span>
    </Context.Provider>
  );
}

export default App;
