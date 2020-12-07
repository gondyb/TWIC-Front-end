import { useEffect, useMemo, useState } from "react";
import "./index.css";
import Select from "react-select";
import { useTable, usePagination } from "react-table";
import EditModal from "./EditModal";

function App() {
  const [cities, setCities] = useState([]);

  const [city1, setCity1] = useState(null);
  const [city2, setCity2] = useState(null);

  const [distance, setDistance] = useState(null);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalCity, setModalCity] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: "Code commune",
        accessor: "codeCommune", // accessor is the "key" in the data
      },
      {
        Header: "Nom",
        accessor: "nomCommune",
      },
    ],
    []
  );

  if (cities.length === 0) {
    fetch("http://127.0.0.1:8080/villes")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setCities(json);
      });
  }

  useEffect(() => {
    if (!city1 || !city2) {
      return;
    }

    fetch(`http://127.0.0.1:8080/distanceBetween/${city1.value}/${city2.value}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setDistance(json);
      });
  }, [city1, city2]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: cities,
      initialState: {
        pageSize: 50,
      },
    },
    usePagination
  );

  const openModal = (ville) => {
    setModalCity(ville);
    setModalOpened(true);
  };

  const options = useMemo(() => {
    return cities.flatMap((obj) => {
      return {
        label: obj.nomCommune,
        value: obj.codeCommune,
      };
    });
  }, [cities]);

  if (!cities) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="w-1/2 mx-auto mt-7">
      <div>
        <p className="text-2xl">Calculateur de distances</p>
      </div>
      <div className="mt-2">
        <label>Ville 1</label>
        <Select
          options={options}
          onChange={(object) => {
            setCity1(object);
          }}
        />
      </div>
      <div className="mt-2">
        <label>Ville 2</label>
        <Select
          options={options}
          onChange={(object) => {
            setCity2(object);
          }}
        />
      </div>
      {distance && (
        <div className="mt-3">
          Distance entre {city1.label} et {city2.label} :{" "}
          <span className="font-bold">{Math.round(distance / 1000)} km</span>.
        </div>
      )}
      <p className="text-2xl my-3">Liste des villes</p>
      <table
        className="border-gray-500 border-2 w-full my-4"
        {...getTableProps()}
      >
        <thead className="border-gray-500 border-2">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => {
                  openModal(row);
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="bg-indigo-700 text-white px-4 py-2 rounded-lg"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"Page précédente"}
        </button>{" "}
        <button
          className="bg-indigo-700 text-white px-4 py-2 rounded-lg"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {"Page suivante"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} sur {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
      {modalCity && (
        <EditModal
          ville={modalCity.original}
          isOpened={modalOpened}
          closeModal={() => {
            setModalOpened(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
