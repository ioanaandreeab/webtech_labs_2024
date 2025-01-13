import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const MoviesTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://ghibliapi.vercel.app/films")
      .then((response) => response.data)
      .then((moviesData) => setMovies(moviesData));
  }, []);

  // configurarea coloanelor
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      align: "center",
      headerClassName: "table-header",
      headerAlign: "center",
    },
    {
      field: "director",
      headerName: "Director",
      flex: 1,
      align: "center",
      headerClassName: "table-header",
      headerAlign: "center",
    },
    {
      field: "release_date",
      headerName: "Year",
      type: "number",
      flex: 0.5,
      align: "center",
      headerClassName: "table-header",
      headerAlign: "center",
    },
    {
      field: "running_time",
      headerName: "Duration",
      type: "number",
      flex: 0.5,
      align: "center",
      headerClassName: "table-header",
      headerAlign: "center",
    },
  ];

  return (
    <div style={{ height: 400, width: 800 }}>
      {/* utilizarea DataGrid */}
      <DataGrid rows={movies} columns={columns} />
    </div>
  );
};

export { MoviesTable };
