import React, {useState} from 'react';

import mockData from './data/mockData';
import COLUMNS from './data/columns';

import useTable from './hooks/useTable';


const App = () => {
  const [data, setData] = useState(mockData);
  const [pageSize, setPageSize] = useState(2);

  const {
    headers,
    rows,
    pagination: {nextPage, previousPage, pageNumber, totalPages}
  } = useTable({data, columns: COLUMNS, pagination: {pageSize}});


  return (
    <div className="main">
      <table>
        <thead>
        <tr>
          {headers.map(({label}, index) => (
            <th key={index}>{label}</th>
          ))}
          <th/>
        </tr>
        </thead>
        <tbody>
        {rows.map((row, index) => (
          <tr key={index}>{row.cells.map((cell, index) => (
            <td key={index}>{cell.renderedValue}</td>
          ))}
            <td>
              <button onClick={() => setData(data.filter((unused, innerIndex) => index !== innerIndex))}>x</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="numbers">
        <div className='numbers_left'>
          <button onClick={previousPage}>&lt;</button>
          <div className="numbers_name">page {pageNumber} of {totalPages}</div>
          <button onClick={nextPage}>&gt;</button>
        </div>
        <div>
          <button className='numbers_right' onClick={() => setPageSize(pageSize + 1)}>add +1 item</button>
        </div>
      </div>
    </div>
  );
};

export default App;
