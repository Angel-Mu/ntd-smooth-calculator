import React, { useEffect, useState } from 'react';
import Input from '../components/form/Input'
import Header from '../components/Header'
import request from '../utils/request'

import { apiUrl } from '../config'

const CalculatorComponent = () => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [operation, setOperation] = useState('addition');
  const [result, setResult] = useState();
  const [disableSecondValue, setDisableSecondValue] = useState(false);

  const options = [{
    value: 'addition',
    label: '+',
  }, {
    value: 'subtraction',
    label: '-',
  }, {
    value: 'multiplication',
    label: 'x',
  }, {
    value: 'division',
    label: '÷',
  }, {
    value: 'square_root',
    label: '√',
  }, {
    value: 'random_string',
    label: 'Api Key',
  }];

  useEffect(() => {
    if (['square_root', 'random_string'].includes(operation)) {
      setSecondValue('');
      setDisableSecondValue(true);
      return;
    }
    setDisableSecondValue(false);
  }, [operation]);

  const getRequestParams = () => {
    if (operation === 'random_string') {
      return {
        url: `${apiUrl}/v1/calculate/random-string`,
        body: { operation, length: firstValue },
      }
    }
    return {
      url: `${apiUrl}/v1/calculate/math-operation`,
      body: { operation, firstValue, secondValue },
    }
  }

  const sendCalculation = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('_authHeader'),
      }
    };

    const { url, body } = getRequestParams();
    const data = await request(url, options, body).catch(alert);
    if (!data) {
      return;
    }

    setResult(data.result)
    setCurrentBalance(data.remainingBalance / 100);
  };

  const renderOptions = (opt) => (
    <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
  );

  const renderResult = () => (
    <div className='mt-3 mb-3 text-center'>
      <strong className='text-bold'>Result:</strong>
      <h1>{result}</h1>
    </div>
  );

  return (
    <>
      <Header currentBalance={currentBalance} />
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
        <form style={{ width: '300px' }} onSubmit={sendCalculation}>
          <div className="mb-3 text-center">
            <Input type="text" label="First Value" value={firstValue} onChange={(e) => setFirstValue(e.target.value)} />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="operation" className="form-label">Operation</label>
            <select className="form-select text-center" id="operation" value={operation} onChange={(e) => setOperation(e.target.value)}>
              {options.map(renderOptions)}
            </select>
          </div>
          <div className="mb-3 text-center">
            <Input type="text" label="Second Value" value={secondValue} onChange={(e) => setSecondValue(e.target.value)} disabled={disableSecondValue} />
          </div>
          <div className="float-right">
            <button type="submit" className="btn btn-primary">Calculate</button>
          </div>
        </form>
        {
          result || result === 0 ? (renderResult()) : (<></>)
        }
      </div>
    </>
  );
};

export default CalculatorComponent;
