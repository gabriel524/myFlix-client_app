import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
//import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    
    console.log('director', director)
    return (
      <Container className="mt-5">
        <h1>{director.Name} </h1>
        <p className='textcolor'>―Born in {director.BirthYear}―</p>
        <a href onClick={() => { onBackClick(null); }} className='btn btn-warning'>« Back</a>
        <h2 className="subtitle">BIO: </h2>
        <p>{director.Bio}</p>
        <h2 className="subtitle">DIRECTED MOVIES: </h2>
        <Row className="justify-content-center mt-3">
        {/*  {director && director.movies.map((movie) => (*/}
        {/*    <MovieCard key={movie._id} movie={movie}>*/}
        {/*      {movie.title}*/}
        {/*    </MovieCard>*/}
        {/*  ))}*/}
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  onBackClick: PropTypes.func.isRequired
};

