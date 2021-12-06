import React, { useState, useEffect } from 'react';
import './App.css';
import Context from './services/context';
import Table from './components/Table';
import requisitionAPI from './services/requisitionAPI';

function App() {
  const [planets, setPlanets] = useState([]);

  const store = async () => {
    const data = await requisitionAPI();
    setPlanets(data);
  };

  useEffect(() => { store(); }, []);

  return (
    <Context.Provider value={ { data: planets } }>
      <Table />
    </Context.Provider>
  );
}

export default App;
