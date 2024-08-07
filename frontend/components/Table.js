import React, { useState } from 'react';

const Table = ({ data = [], columsMapping = [] }) => {
  const renderTableHeaders = () => columsMapping
    .map((col, idx) => (
      <th key={idx}>{col.name}</th>
    ));

  const renderRowCells = (item) => columsMapping
    .map(({ attr, fn }, idx) => (
      <td key={`${item.id}-${attr}`}>
        {fn ? fn(item[attr]) : item[attr]}
      </td>
    ));

  const renderTableRows = () => data
    .map((row, idx) => (
      <tr key={idx}>
        {renderRowCells(row)}
      </tr>
    ));

  return (
    <div className="container mt-4">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            {renderTableHeaders()}
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
