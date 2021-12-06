import React, { useState, useEffect } from 'react';
import './App.css';
import Context from './services/context';
import Table from './components/Table';
import Filter from './components/Filter';
import requisitionAPI from './services/requisitionAPI';

function App() {
  const [planets, setPlanets] = useState([]);
  const [planetsFilter, setPlanetsFilter] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: 'population',
    comparison: 'maior que',
    value: 0,
  }]);
  const [hasFilter, setHasFilter] = useState(false);

  const store = {
    data: planets,
    hasFilter,
    setHasFilter,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    planetsFilter,
  };

  const callingApi = async () => {
    const data = await requisitionAPI();
    setPlanets(data);
    setPlanetsFilter(data);
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
