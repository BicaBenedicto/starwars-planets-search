import React, { useContext } from 'react';
import Context from '../services/context';

function Table() {
  const { data, filterByName, filterByNumericValues, hasFilter } = useContext(Context);

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
        : (
          data.filter((planet) => {
            const { column, comparison, value } = filterByNumericValues[0];
            if (comparison === 'igual a') return Number(planet[column]) === Number(value);
            if (comparison === 'menor que') return Number(planet[column]) < Number(value);
            if (comparison === 'maior que') return Number(planet[column]) > Number(value);
            return true;
          })
            .filter(({ name }) => {
              if (filterByName.length !== 0) return name.includes(filterByName);
              return true;
            }).map((planet) => (
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
        )}
    </table>
  );
}

export default Table;
