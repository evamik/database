import React from "react";
import TableComponent from "./TableComponent";
import RowButtons from "./RowButtons";

const Clients = () => {
  const query =
    "SELECT contract.id, contract.order_date, " +
    "worker.name AS 'workername', " +
    "worker.surname AS 'workersurname', " +
    "client.name AS 'clientname', " +
    "client.surname AS 'clientsurname' " +
    "FROM contract " +
    "LEFT JOIN worker ON contract.fk_WORKER=worker.id " +
    "LEFT JOIN client ON contract.fk_CLIENT=client.personal_code";

  const headers = ["ID", "Data", "Darbuotojas", "Klientas"];

  const mapElements = (elements) => {
    return elements.map((el) => {
      return (
        <tr key={el.id}>
          <td>{el.id}</td>
          <td>{el.order_date.substring(0, 10)}</td>
          <td>
            {el.workername} {el.workersurname}
          </td>
          <td>
            {el.clientname} {el.clientsurname}
          </td>
          <RowButtons />
        </tr>
      );
    });
  };

  return (
    <TableComponent query={query} headers={headers} mapElements={mapElements} />
  );
};

export default Clients;
