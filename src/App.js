import React, { useState, useEffect } from 'react';
import './App.css';
import Context from './services/context';
import Table from './components/Table';
import Filter from './components/Filter';
import requisitionAPI from './services/requisitionAPI';

const OPTIONS_SELECT_INITIAL = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function App() {
  const [planets, setPlanets] = useState([]);
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [hasFilter, setHasFilter] = useState(false);
  const [optionsSelect, setOptionsSelect] = useState(OPTIONS_SELECT_INITIAL);
  const [actualFilterSelected, changeActualFilterSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const store = {
    data: planets,
    hasFilter,
    setHasFilter,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    planetsFiltered,
    setPlanetsFiltered,
    optionsSelect,
    setOptionsSelect,
    actualFilterSelected,
    changeActualFilterSelected,
  };

  const callingApi = async () => {
    const data = await requisitionAPI();
    setPlanets(data);
    setPlanetsFiltered(data);
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
