import React, { useState, useEffect } from 'react';
import './App.css';
import NavbarComponent from "./Components/Navbar";
import FavouriteComponent from "./Components/FavouriteComponent";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import MainComponent from "./Components/MainComponent";
import DetailComponent from "./Components/DetailComponent"
import { connect } from "react-redux";
import { fetchMovies, fetchFavorites, AddFavorites, RemoveFavorites, fetchDetails } from "./Redux/actionCreater"


const mapStatetoProps = (state) => {
  return { ...state };
}
const mapDispatchtoProps = (dispatch) => ({
  fetchMovies: (search, type) => dispatch(fetchMovies(search, type)),
  fetchFavorites: () => (dispatch(fetchFavorites())),
  AddFavorites: (movie) => (dispatch(AddFavorites(movie))),
  RemoveFavorites: (movie) => (dispatch(RemoveFavorites(movie))),
  fetchDetails: (title) => (dispatch(fetchDetails(title)))
})





function App(props) {
  let [movie, setMovie] = useState("Title");





  const handleFav = (e, movie, isFav) => {
    console.log("calling handlefav")
    if (isFav) {

      props.RemoveFavorites(movie);

    }
    else {
      setMovie(movie.Title);
      props.AddFavorites(movie);


    }


  }


  useEffect(() => {


    props.fetchMovies();
    props.fetchFavorites();


  }, []);



  const handleClick = (search, type) => {

    props.fetchMovies(search, type);


  }
  const RenderMain = () => {
    return (
      <MainComponent errMess={props.movies.errMess} isLoading={props.movies.isLoading} data={props.movies.movies} handleClick={handleClick} favId={props.favorites.favId} handleFav={handleFav} />
    );

  }



  return (


    <div className="App">

      <NavbarComponent />

      <Switch>
        <Route path="/favorites" component={() => (<FavouriteComponent Favorites={props.favorites.favorites} handleFav={handleFav} />)} />
        <Route exact path="/Home" component={RenderMain} />
        <Route path="/Home/:title" component={({ match }) => (<DetailComponent isLoading={props.detail.isLoading} title={match.params.title} movie={props.detail.movie} fetchDetails={props.fetchDetails} />)} />
        <Redirect to="/Home" />
      </Switch>
    </div>


  );
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(App));
