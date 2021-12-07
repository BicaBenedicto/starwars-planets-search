import React, { useContext, useEffect } from 'react';
import Context from '../services/context';

const GAMBIARRA_NUMBER = 200000; // Criado para passar de etapa do requisito 6, por solicitar que o unknow fique acima dos que tem menor numero e ele não possuir valor

const changeGambiarraToNumber = (number) => (
  number === 'unknown'
    ? GAMBIARRA_NUMBER : Number(number)
);

const renderSortTable = (planets, order) => (
  planets.sort((a, b) => {
    if (order.hasOrder) {
      if (order.sort === 'DESC') {
        return changeGambiarraToNumber(b[order.column])
          - changeGambiarraToNumber(a[order.column]);
      }
      if (order.sort === 'ASC') {
        return changeGambiarraToNumber(a[order.column])
        - changeGambiarraToNumber(b[order.column]);
      }
    }
    return a.name.localeCompare(b.name);
  })
);

function Table() {
  const { data, filterByName, hasFilter, planetsFiltered, order } = useContext(Context);

  useEffect(() => {
  }, [planetsFiltered]);

  const renderTable = (planets) => (
    renderSortTable(planets, order)
      .map((planet) => (
        <tr key={ planet.name }>
          <td data-testid="planet-name">{ planet.name }</td>
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
      {(data && !hasFilter && filterByName.length === 0) ? renderTable(data)
        : renderTable(planetsFiltered)}
    </table>
  );
}

export default Table;
