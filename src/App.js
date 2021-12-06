import React, { useState, useEffect } from 'react';
import './App.css';
import Context from './services/context';
import Table from './components/Table';
import Filter from './components/Filter';
import requisitionAPI from './services/requisitionAPI';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const store = {
    data: planets,
    filterByName,
    setFilterByName,
  };

  const callingApi = async () => {
    const data = await requisitionAPI();
    setPlanets(data);
  };

  useEffect(() => { callingApi(); }, []);

  return (
    <Context.Provider value={ store }>
      <Filter />
      <Table />
    </Context.Provider>
  );
}

export default App;
