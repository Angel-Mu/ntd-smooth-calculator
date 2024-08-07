import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Table from '../components/Table'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import request from '../utils/request'
import { apiUrl } from '../config'

const Transactions = () => {
  const authHeader = useAuthHeader();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [tableData, setTableData] = useState([]);

  const getTransactions = async () => {
    const url = `${apiUrl}/v1/transactions?limit=${itemsPerPage}&page=${currentPage}`;
    const options = {
      body: null,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
    }
    const data = await request(url, options).catch(alert);
    setTotalPages(data.totalPages);
    setTotalResults(data.totalResults);
    setTableData(data.results);
  };

  useEffect(() => {
    getTransactions();
  }, [currentPage, itemsPerPage]);

  const columsMapping = [{
    name: 'Id',
    attr: 'id',
  }, {
    name: 'Operation',
    attr: 'operation_id',
  }, {
    name: 'Result',
    attr: 'operation_response',
  }, {
    name: 'Cost',
    attr: 'amount_cents',
  }, {
    name: 'Balance After',
    attr: 'user_balance_cents_after',
    fn: (val) => (`$${(val / 100).toFixed(2)}`),
  }, {
    name: 'Date',
    attr: 'createdAt',
    fn: (val) => (new Date(val).toLocaleString()),
  }];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header currentBalance={10.0}></Header>
      <Table data={tableData} columsMapping={columsMapping}></Table>
      <div className="container">
        <div className="row">

          <div className="col-sm-4">
            <select className="form-select form-control-sm" value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <small className="text-muted">Items per page</small>
          </div>
          <div className="col-sm-4 text-center">
            {
              totalPages ? (
                <nav>
                  <ul className="pagination justify-content-center">
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`page- item ${index + 1 === currentPage ? 'active' : ''}`}
                      >
                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : (<></>)
            }
          </div>
          <div className='col-sm-4 float-right'>
            <strong className="h3">Total records: {totalResults}</strong>
          </div>
        </div>

      </div>
    </>
  )
};

export default Transactions;
