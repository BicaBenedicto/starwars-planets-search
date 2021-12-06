import React, { useContext } from 'react';
import Context from '../services/context';

function Filter() {
  const { filterByName, setFilterByName,
    filterByNumericValues, setFilterByNumericValues,
    setHasFilter } = useContext(Context);

  const handleClick = (e) => {
    e.preventDefault();
    setHasFilter(true);
  };

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
      <form onSubmit={ handleClick }>
        <select
          data-testid="column-filter"
          value={ filterByNumericValues[0].column }
          onChange={ ({ target }) => (
            setFilterByNumericValues(
              [{ ...filterByNumericValues[0], column: target.value }],
            )) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          value={ filterByNumericValues[0].comparison }
          onChange={ ({ target }) => (
            setFilterByNumericValues(
              [{ ...filterByNumericValues[0], comparison: target.value }],
            )) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ filterByNumericValues[0].value }
          onChange={ ({ target }) => (
            setFilterByNumericValues(
              [{ ...filterByNumericValues[0], value: target.value }],
            )) }
        />
        <button
          type="submit"
          data-testid="button-filter"
        >
          Filtro
        </button>
      </form>
    </div>
  );
}

export default Filter;
