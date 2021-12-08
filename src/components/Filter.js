import React, { useContext, useEffect } from 'react';
import Context from '../services/context';
import './Filter.css';

const OPTIONS_SELECT_INITIAL = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

function Filter() {
  const { filterByName, setFilterByName, setPlanetsFiltered,
    filterByNumericValues, setFilterByNumericValues,
    optionsSelect, setOptionsSelect, data, setOrder, order,
    setHasFilter, actualFilterSelected, planetsFiltered,
    changeActualFilterSelected } = useContext(Context);

  useEffect(() => {}, [optionsSelect, planetsFiltered, filterByNumericValues]);

  useEffect(() => {
    const newPlanets = data.filter((planet) => planet.name.includes(filterByName));
    setPlanetsFiltered(newPlanets);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByName]);

  useEffect(() => {
    const verifyPlanet = (planet) => filterByNumericValues
      .every(({ column, comparison, value }) => {
        if (planet[column] === 'unknown') return false;
        if (comparison === 'igual a') {
          return Number(planet[column]) === Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        return false;
      });

    const newOptions = optionsSelect
      .filter((option) => filterByNumericValues.every(({ column }) => column !== option));
    setOptionsSelect(newOptions);

    const newPlanets = planetsFiltered.filter((planet) => verifyPlanet(planet));
    setPlanetsFiltered(newPlanets);
    if (filterByNumericValues.length === 0) setPlanetsFiltered(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumericValues]);

  const handleClick = (e) => {
    e.preventDefault();

    setFilterByNumericValues([...filterByNumericValues, actualFilterSelected]);

    setHasFilter(true);
  };

  const onButtonRemove = ({ target }) => {
    const { name } = target;
    const newFilters = filterByNumericValues.filter(({ column }) => column !== name);
    setFilterByNumericValues(newFilters);
  };

  const renderTableFilter = () => (
    filterByNumericValues.map((filterItem, index) => (
      <div data-testid="filter" key={ index }>
        <span>{filterItem.column}</span>
        <span>{filterItem.comparison}</span>
        <span>{filterItem.value}</span>
        <button
          type="button"
          onClick={ onButtonRemove }
          name={ filterItem.column }
        >
          X
        </button>
      </div>
    ))
  );

  return (
    <div>
      <input
        data-testid="name-filter"
        value={ filterByName }
        onChange={ (e) => {
          setFilterByName(e.target.value);
        } }
        type="text"
      />
      <div>
        <form onSubmit={ handleClick }>
          <select
            data-testid="column-filter"
            value={ actualFilterSelected.column }
            onChange={ ({ target }) => (
              changeActualFilterSelected(
                { ...actualFilterSelected, column: target.value },
              )) }
          >
            {optionsSelect.map((option, index) => (
              <option key={ index } value={ option }>{option}</option>
            ))}
          </select>
          <select
            data-testid="comparison-filter"
            value={ actualFilterSelected.comparison }
            onChange={ ({ target }) => (
              changeActualFilterSelected(
                { ...actualFilterSelected, comparison: target.value },
              )) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="number"
            data-testid="value-filter"
            value={ actualFilterSelected.value }
            onChange={ ({ target }) => (
              changeActualFilterSelected(
                { ...actualFilterSelected, value: target.value },
              )) }
          />
          <button
            type="submit"
            data-testid="button-filter"
          >
            Filtro
          </button>
        </form>
        <form
          onSubmit={ (e) => {
            e.preventDefault();
            setOrder({ ...order, hasOrder: true });
          } }
        >
          <label htmlFor="order-select">
            Ordenar
            <select
              data-testid="column-sort"
              id="order-select"
              value={ order.column }
              onChange={ (e) => { setOrder({ ...order, column: e.target.value }); } }
            >
              {OPTIONS_SELECT_INITIAL.map((option, index) => (
                <option key={ index } value={ option }>{option}</option>
              ))}
            </select>
          </label>
          <label htmlFor="sort-asc">
            Ascendente
            <input
              id="sort-asc"
              type="radio"
              data-testid="column-sort-input-asc"
              checked={ order.sort === 'ASC' }
              onClick={ () => { setOrder({ ...order, sort: 'ASC' }); } }
              value="ASC"
              name="sort"
            />
          </label>
          <label htmlFor="sort-dsc">
            Descendente
            <input
              id="sort-dsc"
              type="radio"
              data-testid="column-sort-input-desc"
              checked={ order.sort === 'DESC' }
              onClick={ () => { setOrder({ ...order, sort: 'DESC' }); } }
              value="DESC"
              name="sort"
            />
          </label>
          <button
            data-testid="column-sort-button"
            type="submit"
          >
            Ordenar
          </button>
        </form>
      </div>
      <div>
        {filterByNumericValues.length !== 0 && renderTableFilter()}
      </div>
    </div>
  );
}

export default Filter;
