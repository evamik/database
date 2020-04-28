import React, { useEffect, useState } from "react";
import Axios from "axios";
import { history } from "../redux/history";
import moment from "moment";

const Contract = (ownProps) => {
  const [contract, setContract] = useState(null);
  const [defaultContr, setDefaultContr] = useState(null);
  const [areChanges, setChanges] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [clients, setClients] = useState([]);
  const [bills, setBills] = useState([]);
  const [newBills, setNewBills] = useState([]);
  const [defaultBills, setDefaultBills] = useState([]);
  const [deletedBills, setDeletedBills] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:5000/api/sql", {
      query: `SELECT * FROM contract 
            WHERE contract.id=${ownProps.match.params.id}`,
    }).then((res) => {
      Axios.post("http://localhost:5000/api/sql", {
        query: `SELECT worker.id, worker.name, worker.surname
            FROM worker`,
      }).then((res2) => {
        setWorkers(res2.data);

        Axios.post("http://localhost:5000/api/sql", {
          query: `SELECT client.personal_code AS 'id', client.name, client.surname
            FROM client`,
        }).then((res3) => {
          setClients(res3.data);

          Axios.post("http://localhost:5000/api/sql", {
            query: `SELECT * FROM bill
            WHERE bill.fk_CONTRACT=${ownProps.match.params.id}`,
          }).then((res4) => {
            setBills([...res4.data]);
            setDefaultBills(JSON.parse(JSON.stringify(res4.data)));

            setDefaultContr(res.data[0]);
            setContract(res.data[0]);
            console.log(res4.data);
          });
        });
      });
    });
  }, [ownProps.match.params.id]);

  useEffect(() => {
    if (
      JSON.stringify(contract) !== JSON.stringify(defaultContr) ||
      JSON.stringify(bills) !== JSON.stringify(defaultBills)
    )
      setChanges(true);
    else setChanges(false);
  }, [contract, bills, defaultContr, defaultBills]);

  const mapPeople = (people) => {
    return people.map((person) => {
      return (
        <option
          key={person.id}
          value={person.id}
        >{`${person.name} ${person.surname}`}</option>
      );
    });
  };

  const mapBills = (bills) => {
    return bills.map((bill, index) => {
      return (
        <tr key={index}>
          <td>
            <input
              type="date"
              value={bill.date.substring(0, 10)}
              onChange={(e) => {
                const arr = [...bills];
                arr[index].date = e.target.value;
                console.log(`INSERT INTO bill(number, date, sum, fk_CONTRACT) 
                      (VALUES ${bills
                        .map(
                          (d) =>
                            `(${d.number}, ${d.date}, ${d.sum}, ${d.fk_CONTRACT}) `
                        )
                        .join(", ")}) `);
                setBills(arr);
              }}
            />
          </td>
          <td>
            <input
              type="number"
              value={bill.sum}
              onChange={(e) => {
                const arr = [...bills];
                arr[index].sum = Number(e.target.value);
                setBills(arr);
              }}
            />
          </td>
          <td>
            <button
              className="btn btn-sm btn-danger py-0 px-2 m-0 mr-3"
              onClick={() => {
                if (bill.number !== 0)
                  setDeletedBills([...deletedBills, bills[index]]);
                setBills(
                  bills.filter((b, id) => {
                    return id !== index;
                  })
                );
              }}
            >
              X
            </button>
          </td>
        </tr>
      );
    });
  };

  return contract === null ? (
    <div></div>
  ) : (
    <div className="container border p-3 mt-2">
      <div className="container border">
        <div
          style={{
            width: "fit-content",
            position: "relative",
            top: -14,
            backgroundColor: "#FFF",
          }}
          className="m-0 px-2"
        >
          Contract information
        </div>
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
                    console.log(e.target.value);
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
                  {mapPeople(workers)}
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
                  {mapPeople(clients)}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container border mt-3">
        <div
          style={{
            width: "fit-content",
            position: "relative",
            top: -14,
            backgroundColor: "#FFF",
          }}
          className="m-0 px-2"
        >
          Bills
        </div>
        <div className="row justify-content-center">
          <table className="table table-sm table-borderless w-auto mb-0">
            <tbody>
              <tr>
                <td style={{ minWidth: 184 }}>date</td>
                <td style={{ minWidth: 188 }}>sum</td>
                <td style={{ minWidth: 52 }}></td>
              </tr>
              {mapBills(bills)}
              <tr>
                <td>
                  <button
                    className="btn btn-primary btn-sm py-0"
                    onClick={() => {
                      const newBill = {
                        number: 0,
                        date: moment().format("YYYY-MM-DD"),
                        sum: "",
                        fk_CONTRACT: contract.id,
                      };
                      setBills([...bills, newBill]);
                    }}
                  >
                    add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row justify-content-center mt-3">
        <button
          className="btn btn-primary"
          disabled={!areChanges}
          onClick={() => {
            Axios.post("http://localhost:5000/api/sql", {
              query: `UPDATE contract SET 
                      order_date='${contract.order_date}', 
                      repair_start_date='${contract.repair_start_date}', 
                      expected_end_date='${contract.expected_end_date}', 
                      real_end_date='${contract.real_end_date}', 
                      fk_WORKER='${contract.fk_WORKER}', 
                      fk_CLIENT='${contract.fk_CLIENT}' 
                      WHERE contract.id=${ownProps.match.params.id}`,
            }).then((res) => {
              let axios = [];
              if (deletedBills.length > 0)
                axios = [
                  ...axios,
                  Axios.post("http://localhost:5000/api/sql", {
                    query: `DELETE FROM bill 
                      WHERE bill.number IN (${deletedBills
                        .map((d) => {
                          return d.number;
                        })
                        .join(", ")})`,
                  }),
                ];
              if (bills.length > 0)
                axios = [
                  ...axios,
                  Axios.post("http://localhost:5000/api/sql", {
                    query: `INSERT INTO bill(number, date, sum, fk_CONTRACT) 
                      (VALUES ${bills
                        .map(
                          (d) =>
                            `(${d.number}, '${d.date}', '${d.sum}', ${d.fk_CONTRACT}) `
                        )
                        .join(", ")}) 
                        ON DUPLICATE KEY UPDATE 
                        date=VALUES(date), 
                        sum=VALUES(sum), 
                        fk_CONTRACT=VALUES(fk_CONTRACT) `,
                  }),
                ];
              Axios.all(axios)
                .then(() => {
                  history.push("/contracts");
                })
                .catch((e) => {});
            });
          }}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Contract;
