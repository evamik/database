import React, { useEffect, useState } from "react";
import Axios from "axios";

const TableComponent = (props) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:5000/api/sql", {
      query: props.query,
    })
      .then((res) => {
        setElements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.query]);

  function mapTableHeader() {
    return props.headers.map((header, index) => {
      return <th key={index}>{header}</th>;
    });
  }

  return (
    <div>
      <table className="table table-light table-sm table-striped">
        <thead className="thead-dark bg-dark">
          <tr>
            {mapTableHeader()}
            <th></th>
          </tr>
        </thead>
        <tbody>{props.mapElements(elements)}</tbody>
      </table>
    </div>
  );
};

export default TableComponent;
