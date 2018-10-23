import * as React from 'react';
import DeleteModal from '../Modal/Delete'
import EditModal from '../Modal/Edit'

class moviesList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        selectedMovie: {
          Title:"", 
          Year:"",
          Runtime:"",
          Genre:"",
          Director:"",
          id:""
      }
    }
  }
  
  onSelectMovie = (e) => {
    const index = e.target.value;
    const selectedMovie = this.props.movies[index];    
    this.setState({selectedMovie})
  }

  List = () => (
  <div className="container">
	<EditModal  onEdit={this.props.onEdit} selectedMovie={this.state.selectedMovie} movies={this.props.movies} />
  <DeleteModal onDelete={this.props.onDelete} selectedMovie={this.state.selectedMovie} />
  <ul className="row cards">
  {
    this.props.movies.map((movie, index) => <li className="card col-sm-6 col-lg-4" key={index}>
      <div className="card-in">
        <img  src= {require('../images/cinema.jpeg')}  alt="cinema"></img>
        <h2 className="card-title">{movie.Title}</h2>
        <div className="card-details">
          <div className="card-data">
            <div className="card-meta">Year:{movie.Year}</div>
            <div className="card-meta">Runtime:{movie.Runtime}</div>
            <div className="card-meta">Genre:{movie.Genre}</div>
            <div className="card-meta">Director:{movie.Director}</div>
            <div className="buttons">
                <button data-toggle="modal" data-target="#deleteModal" id="btn-delete" title="Delete the movie" value={index} onClick={this.onSelectMovie} >	
                  Delete
                </button>
                <button data-toggle="modal" data-target="#editModal" id="btn-edit" title="Edit the movie" value={index} onClick={this.onSelectMovie} >	
                  Edit
                </button> 
            </div>
          </div>  
        </div>
      </div>
    </li>
    )}
	</ul>
</div>
);

    render() {
        return(
         <div>
             {this.List()}
         </div>
        ); 
    }
}

export default moviesList;




