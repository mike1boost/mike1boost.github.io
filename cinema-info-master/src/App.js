import * as React from 'react';
import './App.css';
import {getMovies} from './server-api'
import MoviesList from './view/moviesList'
import AddModal from './Modal/Add'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      moviesList:[]
    };
  }
  
  componentDidMount(){    
    getMovies() 
      .then((moviesList)=>{
        this.setState({moviesList})
      });       
  }

  onEdit = (movieId, movie) => {
    const moviesListUpdated = this.state.moviesList.map((movie_, index) => {
      if (movieId === movie_.id) {
        return movie;
      } else {
        return movie_;
      }
    });
  
    this.setState(state => {
      return {
        moviesList:moviesListUpdated
      };
    });
  }

  onDelete = (movie) => {
    let movieIndex = -1; 
    const moviesList = this.state.moviesList;
    for(let index in moviesList){
      if(moviesList[index].id === movie.id){
        movieIndex = index;
      }
    }
    
    if (movieIndex > -1) {
      moviesList.splice(movieIndex, 1);
    }
    
    this.setState(state => {
      return {
        moviesList:moviesList
      };
    });
  }

  addMovie = (movie) => {
    this.setState(state => {
      return {
        moviesList:[...state.moviesList, movie]
      };
    });
  }

render() {
  return (
    <div className="app-container">
      <header className="App-header">
        <h1 className="App-title">Herolo Cinema</h1>
      </header> 
      <button data-toggle="modal" data-target="#addModal" id="btn-add"  >	
        Add
      </button>
       <MoviesList movies={this.state.moviesList} onEdit={this.onEdit} onDelete={this.onDelete}/>
       <AddModal movies={this.state.moviesList} addMovie={this.addMovie}/>
    </div>
  );
}
}

export default App;



