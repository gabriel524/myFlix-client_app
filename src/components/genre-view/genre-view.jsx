import React from 'react';
import { Container, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    const { genre, onBackClick } = this.props;
    console.log('genre', genre)
    return (
      <Container className="mt-5" style={{ width: '80%' }}>
        <h1 className="mb-1">{genre.name}</h1>
        <a href onClick={() => { onBackClick(null); }} className='btn btn-warning'>« Back</a>
        <h2 className="subtitle">DESCRIPTION: </h2>
        <p>{genre.description}</p>
        <h2 className="subtitle">MOVIES ON THIS GENRE: </h2>
        <Row className="justify-content-center mt-3">
          {/*genreMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}>
              {movie.title}
            </MovieCard>
          ))*/}
        </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  onBackClick: PropTypes.func.isRequired
};
