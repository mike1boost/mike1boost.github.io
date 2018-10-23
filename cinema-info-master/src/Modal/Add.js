import $ from 'jquery';
import * as React from 'react';
const uuidv1 = require('uuid/v1');
 

class addModal extends React.Component {

    constructor(props){
    super(props);
    this.state = {
        newMovie: {
            Title:"", 
            Year:"",
            Runtime:"",
            Genre:"",
            Director:"",
            id:""
        },
        errMsg:""
    }
  }

updateField=(field, value)=>{
    this.setState((prevState)=>{
        return{
            errMsg:"",
            newMovie:{
                ...prevState.newMovie,
                [field] : value
            }
        }
    })
}

onUpdate = (e)=>{
    const field = e.target.id;
    const value = e.target.value;
    this.updateField(field, value);
}

initialzeState = ()=> {
   const newMovie = {
        Title:"", 
        Year:"",
        Runtime:"",
        Genre:"",
        Director:"",
        id:""
    }
    this.setState({newMovie, errMsg:""})
}

correctTitle  = (str)=>{
    let movieName = str.trim()
    movieName = movieName.replace('-',' ')
    movieName = movieName.replace('_',' ')
    movieName = movieName.replace(/[^0-9a-zA-Z ]/gi, '')
    return movieName
}

uppercaseFirstLetter = (str)=>{
    let arr = str.split(" ");
    arr = arr.map((word)=>{
        word = word.toLowerCase();
        word = word.charAt(0).toUpperCase() + word.slice(1);
        return word;
    })
    return arr.join(" ");
}

isMovieExist = (newMovie, movies)=>{
    let result = movies.filter((movie)=>movie.Title === newMovie.Title)
    return (result.length !== 0)
}

emptyFields = ()=>{
    if(this.state.newMovie.Title.length === 0 || this.state.newMovie.Year.length === 0 || this.state.newMovie.Runtime.length === 0 || this.state.newMovie.Genre.length === 0 || this.state.newMovie.Director.length === 0){
        return true;
    }
}

yearValidation = (year)=>{
    if (year.length !== 4) {
        return false;
    }
    const current_year = new Date().getFullYear();
    if((year < 1888) || (year > current_year)){
        return false;
    }
    return true;
}

onCancel = ()=>{
    this.initialzeState();
}

addMovie = ()=>{
    let newMovie = this.state.newMovie;
    let movies = this.props.movies;
    
    if(this.emptyFields()){
        this.setState((prevState)=>{
            return{
                errMsg:"All fields must filled",
                newMovie:prevState.newMovie
            }
        })
        return;
    }
    if(!this.yearValidation(newMovie.Year)){
        this.setState((prevState)=>{
            return{
                errMsg:"Year should be in range 1888 to current year",
                newMovie:prevState.newMovie
            }
        })
        return;
    }
    newMovie.Title = this.uppercaseFirstLetter(newMovie.Title);
    newMovie.Title = this.correctTitle(newMovie.Title);
    if(this.isMovieExist(newMovie, movies)){
        this.setState((prevState)=>{
            return{
                errMsg:"Title Exist",
                newMovie:prevState.newMovie
            }
        })
        return;
    }

    newMovie.id = uuidv1();
    $('.modal').modal('hide'); 
    this.props.addMovie(newMovie);
    this.initialzeState();
}
  
render() {
  
    return (
      <div >
          <div id="addModal" className="modal" role="dialog" >
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header" id="modal-header">
                             <h3>Add movie</h3>
                      </div>
                      <div className="modal-body" id="modal-body">
                             <p><label>Title:</label><input type="text" id="Title" value={this.state.newMovie.Title} onChange={this.onUpdate} /></p>
                             <p><label>year:</label><input type="text" id="Year" value={this.state.newMovie.Year} onChange={this.onUpdate} /></p>
                             <p><label>Runtime:</label><input type="text" id="Runtime" value={this.state.newMovie.Runtime} onChange={this.onUpdate} /></p>
                             <p><label>Genre:</label><input type="text" id="Genre" value={this.state.newMovie.Genre} onChange={this.onUpdate} /></p>
                             <p><label>Director:</label><input type="text" id="Director" value={this.state.newMovie.Director} onChange={this.onUpdate} /></p>
                      </div>
                      <div className="modal-footer" id="modal-footer">
                          <div className="errors">
                            {(this.state.errMsg.length!==0) && <p className="error">{this.state.errMsg}</p>}
                          </div>
                          <div className="modal-buttons">
                            <button type="button" id="btn-approve-modal" onClick={this.addMovie} >Add</button>
                            <button type="button" id="btn-cancel-modal" onClick={this.onCancel} data-dismiss="modal" >Cancel</button>
                         </div>
                      </div>
                  </div>
              </div>
          </div>     
      </div>
    );
  }

}

export default addModal;






