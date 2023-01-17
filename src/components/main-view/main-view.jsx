import React from 'react';
import { BrowserRouter as Router, Route, Redirect, } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap';
import  Navbar from '../navbar/navbar';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';


import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix--movies-application1.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}


  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    let {movies} = this.props;
    let {user} = this.state;

    return (
      <Router>
      <Navbar user = {user} />
      <Container>
        <Row className='main-view justify -content-md-center'>
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
              //Before the movies have loaded 
              if(movies.length === 0) return <div className='main-view' />;
              
              return <MoviesList movies={movies}/>;
          }} />
          
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({match, history}) => {
            if (!user) return <Col md={8}>
              <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({match, history}) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
            onBackClick={() => history.goBack()} />
            </Col>
          }} />
          
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} 
              onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

            <Route path={`/users/${user}`} render={({history}) => {
              if (!user) return <Redirect to="/" />
              return <Col>
              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />


          <Route path={`/user-update/${user} `} render={({match, history}) => {
            if (!user) return <Redirect to="/" />
            return <Col>
            <UserUpdate user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect (mapStateToProps,{setMovies}) (MainView);



