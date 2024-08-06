import React, { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import Input from '../components/form/Input'
import Header from '../components/Header'

const CalculatorComponent = () => {
  const authHeader = useAuthHeader();
  const [currentUser, setCurrentUser] = useState({})
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

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
  }];

  const sendCalculation = () => {
    console.log("Not implemented yet");
  };

  const renderOptions = (opt) => (
    <option key={opt.value} value={opt.value}>{opt.label}</option>
  );

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
        <form style={{ width: '300px' }} onSubmit={sendCalculation}>
          <div className="mb-3 text-center">
            <Input type="text" label="First Value" value={firstValue} onChange={(e) => setFirstValue(e.target.value)} />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="operation" className="form-label">Operation</label>
            <select className="form-select text-center" id="operation">
              {options.map(renderOptions)}
            </select>
          </div>
          <div className="mb-3 text-center">
            <Input type="text" label="Second Value" value={secondValue} onChange={(e) => setSecondValue(e.target.value)} />
          </div>
          <div className="float-right">
            <button type="submit" className="btn btn-primary">Calculate</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CalculatorComponent;
