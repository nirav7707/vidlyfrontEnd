import React, { Component } from "react";

class MovieDetail extends Component {
  handleSubmit = () => {
    this.props.history.replace("/movies");
  };
  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>movie {match.params.id}</h1>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          submit
        </button>
      </div>
    );
  }
}

export default MovieDetail;
