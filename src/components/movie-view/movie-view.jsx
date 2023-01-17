import React from 'react';
import PropTypes from 'prop-types';
import { Card }from 'react-bootstrap';


import "./movie-view.scss";

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
}

componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
}
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img crossOrigin="anonymous" src={movie.Imagepath} />
        
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

      <Card.Text className="text-style">Director: {movie.Director.Name}
      <a href={`/directors/${movie.Director.Name}`} className='btn btn-warning'>More info</a>
      </Card.Text>
        <div className='movie-description'>
          <span className='label'>Description:</span>
          <span className='value'>{movie.Description}</span>
        </div>
        <div className='movie-director'>
          <span className='label'>Director:</span>
          <span className='value'>{movie.Director.Name + '~ ' + movie.Director.Bio}</span>
        </div>
        <div className="director-bio">
          <span className="director">Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
          </div>
        <div className="director-birthyear">
          <span className="director">BirthYear: </span>
          <span className="value">{movie.Director.BirthYear}</span>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre:</span>
          <span className='value'>{movie.Genre.Name + ' ' + movie.Genre.Description}</span>
          <Card.Text className="text-style">Genre: {movie.Genre.Name}
          <a href={`/genres/${movie.Genre.Name}`} className='btn btn-warning'>More info</a>
      </Card.Text>
        </div>
        <div className="movie-actors">
          <span className="actors">Actors: </span>
          <span className="value">{movie.Actors}</span>
        </div>
        <div className="movie-button-div">
        <a href onClick={() => { onBackClick(null); }} className='btn btn-warning'>Back
        </a>
        </div>
      </div>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Imagepath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

