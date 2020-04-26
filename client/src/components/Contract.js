import React, { useEffect, useState } from "react";
import Axios from "axios";

const Contract = (ownProps) => {
  const [contract, setContract] = useState(null);
  const [defaultContr, setDefaultContr] = useState(null);
  const [areChanges, setChanges] = useState(false);
  const [workers, setWorkers] = useState(null);
  const [clients, setClients] = useState(null);

  useEffect(() => {
    Axios.post("http://localhost:5000/api/sql", {
      query: `SELECT * FROM contract 
            WHERE contract.id=${ownProps.match.params.id}`,
    }).then((res) => {
      Axios.post("http://localhost:5000/api/sql", {
        query: `SELECT worker.id, worker.name, worker.surname
            FROM worker`,
      }).then((res2) => {
        Axios.post("http://localhost:5000/api/sql", {
          query: `SELECT client.personal_code AS 'id', client.name, client.surname
            FROM client`,
        }).then((res3) => {
          setWorkers(res2.data);
          setClients(res3.data);
          setDefaultContr(res.data[0]);
          setContract(res.data[0]);
        });
      });
    });
  }, [ownProps.match.params.id]);

  useEffect(() => {
    console.log(contract);
    if (JSON.stringify(contract) != JSON.stringify(defaultContr))
      setChanges(true);
    else setChanges(false);
  }, [contract]);

  const mapElements = (elements) => {
    return elements.map((el) => {
      return (
        <option key={el.id} value={el.id}>{`${el.name} ${el.surname}`}</option>
      );
    });
  };

  return contract === null ? (
    <div></div>
  ) : (
    <div className="container border p-3 m-3">
      <h4 className="text-center">Contract information</h4>
      <table className="table table-borderless table-sm">
        <tbody>
          <tr>
            <td className="text-right">ID:</td>
            <td>{contract.id}</td>
          </tr>
          <tr>
            <td className="text-right">Order date:</td>
            <td>
              <input
                type="date"
                onChange={(e) => {
                  setContract({ ...contract, order_date: e.target.value });
                }}
                value={contract.order_date.substring(0, 10)}
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Repair start date:</td>
            <td>
              <input
                type="date"
                onChange={(e) => {
                  setContract({
                    ...contract,
                    repair_start_date: e.target.value,
                  });
                }}
                value={contract.repair_start_date.substring(0, 10)}
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Expected end date:</td>
            <td>
              <input
                type="date"
                onChange={(e) => {
                  setContract({
                    ...contract,
                    expected_end_date: e.target.value,
                  });
                }}
                value={contract.expected_end_date.substring(0, 10)}
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Real end date:</td>
            <td>
              <input
                type="date"
                onChange={(e) => {
                  setContract({
                    ...contract,
                    real_end_date: e.target.value,
                  });
                }}
                value={contract.real_end_date.substring(0, 10)}
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Worker:</td>
            <td>
              <select
                onChange={(e) => {
                  setContract({
                    ...contract,
                    fk_WORKER: Number(e.target.value),
                  });
                }}
                value={contract.fk_WORKER}
              >
                {mapElements(workers)}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Client:</td>
            <td>
              <select
                onChange={(e) => {
                  setContract({
                    ...contract,
                    fk_CLIENT: Number(e.target.value),
                  });
                }}
                value={contract.fk_CLIENT}
              >
                {mapElements(clients)}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="row justify-content-center">
        <button className="btn btn-primary" disabled={!areChanges}>
          save
        </button>
      </div>
    </div>
  );
};

export default Contract;
