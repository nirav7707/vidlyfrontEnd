import React, { Component } from "react";
import Like from "./like";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Link } from "react-router-dom";
import {getCurrentUser} from "../services/authService";

class MovieTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => <Link to={`/movie/${movie._id}`}>{movie.title}</Link>,
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like onhandleLike={this.props.handleLike} movie={movie} />
      ),
    },

  ];

  DeleteColumn={
    key: "delete",
    content: (movie) => (
        <button
            onClick={() => this.props.handleDelete(movie._id)}
            className="btn btn-danger btn-sm"
        >
          Delete
        </button>
    ),
  }

  constructor() {
    super();
    const user= getCurrentUser();
    if(user && user.isAdmin) {
      this.columns.push(this.DeleteColumn)
    }
  }

  render() {
    const { movies, sortColumn, handleSort } = this.props;

    return (
      <React.Fragment>
        <table className="table">
          <TableHeader
            sortColumn={sortColumn}
            handleSort={handleSort}
            columns={this.columns}
          />
          <TableBody data={movies} columns={this.columns} />
        </table>
      </React.Fragment>
    );
  }
}

export default MovieTable;
