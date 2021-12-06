import React, { useContext } from 'react';
import Context from '../services/context';

const verifyFilter = (planet, filterByNumericValues, filterByName) => {
  const { column, comparison, value } = filterByNumericValues;
  if (filterByName.length !== 0) return planet.name.includes(filterByName);

  if (comparison === 'igual a') {
    return Number(planet[column]) === Number(value);
  }
  if (comparison === 'menor que') {
    return Number(planet[column]) < Number(value);
  }
  if (comparison === 'maior que') {
    return Number(planet[column]) > Number(value);
  }
  if (planet[column] === 'unknown') return false;
  return true;
};

function Table() {
  const { data, filterByName, filterByNumericValues, hasFilter } = useContext(Context);

  const renderFilterTable = () => (
    data.filter((planet) => (verifyFilter(planet,
      filterByNumericValues[0], filterByName)))
      .map((planet) => (
        <tr key={ planet.name }>
          <td>{ planet.name }</td>
          <td>{ planet.rotation_period }</td>
          <td>{ planet.orbital_period }</td>
          <td>{ planet.diameter }</td>
          <td>{ planet.climate }</td>
          <td>{ planet.gravity }</td>
          <td>{ planet.terrain }</td>
          <td>{ planet.surface_water }</td>
          <td>{ planet.population }</td>
          <td>{ planet.films }</td>
          <td>{ planet.created }</td>
          <td>{ planet.edited }</td>
          <td>{ planet.url }</td>
        </tr>
      ))
  );

  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Rotation Period</th>
        <th>Orbital Period</th>
        <th>Diameter</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Terrain</th>
        <th>Surface Water</th>
        <th>Population</th>
        <th>Films</th>
        <th>Created</th>
        <th>Edited</th>
        <th>URL</th>
      </tr>
      {(data && !hasFilter && filterByName.length === 0) ? (
        data.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))
      )
        : renderFilterTable()}
    </table>
  );
}

export default Table;
