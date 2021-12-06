import React, { useContext } from 'react';
import Context from '../services/context';

function Filter() {
  const { filterByName, setFilterByName } = useContext(Context);
  return (
    <div>
      <input
        data-testid="name-filter"
        value={ filterByName }
        onChange={ (e) => setFilterByName(e.target.value) }
        type="text"
      />
    </div>
  );
}

export default Filter;
