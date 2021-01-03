import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./pagination";
import FilterByGenre from "./filterByGenre";
import MovieTable from "./movietable";
import { paginate } from "../utility/paginate";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      selectedGnere: "",
      pageSize: 4,
      currentPage: 1,
      sortColumn: { path: "title", order: "asc" },
      searchQue: "",
    };
  }

  async componentDidMount() {
    const genres = await getGenres();
    const movies = await getMovies();
    this.setState({ movies: movies.data, genres: genres.data });
  }
  handleDelete = async (id) => {
    const ogMovies = this.state.movies;
    let movies = ogMovies.filter((m) => m._id !== id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this movie already deleted");
      }
      this.setState({ movies: ogMovies });
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  handlePrevious = () => {
    this.setState({ currentPage: this.state.currentPage - 1 });
  };
  handleNext = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  selectGenre = (genre) => {
    this.setState({ selectedGnere: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (e) => {
    this.setState({
      searchQue: e.target.value,
      selectedGnere: "",
      currentPage: 1,
    });
  };

  render() {
    let count = this.state.movies.length;
    let { pageSize, movies: allmovies, currentPage } = this.state;
    let { genres, selectedGnere, sortColumn } = this.state;
    const allGenre = [{ _id: "", name: "All genre" }, ...genres];

    if (count === 0) {
      return <p>no movie is available</p>;
    }

    let filtergenre = allmovies;
    if (this.state.searchQue) {
      filtergenre = allmovies.filter((m) =>
        m.title.toLowerCase().startsWith(this.state.searchQue.toLowerCase())
      );
    } else if (selectedGnere && selectedGnere._id)
      filtergenre = allmovies.filter(
        (movie) => movie.genre._id === selectedGnere._id
      );

    const sorted = _.orderBy(
      filtergenre,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-md-3 my-5">
          <FilterByGenre
            genres={allGenre}
            selectedGnere={selectedGnere}
            onSelectGenre={this.selectGenre}
          />
        </div>

        <div className="col">
          {this.props.user && (
            <NavLink to="/movie/new" className="btn btn-primary">
              Add movie
            </NavLink>
          )}
          <div>
            <input
              className="form-control"
              autoFocus
              type="text"
              placeholder="search..."
              onChange={this.handleSearch}
              value={this.state.searchQue}
            />
          </div>
          <p>showing {filtergenre.length} movies </p>
          <MovieTable
            movies={movies}
            handleLike={this.handleLike}
            handleDelete={this.handleDelete}
            handleSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />

          <Pagination
            handleNext={this.handleNext}
            handlePrevious={this.handlePrevious}
            pageSize={pageSize}
            totalItem={filtergenre.length}
            onClick={this.handleCurrentPage}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
