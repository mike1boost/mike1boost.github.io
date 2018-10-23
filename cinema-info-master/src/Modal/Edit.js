import $ from 'jquery';
import * as React from 'react';
 
class editModal extends React.Component {

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
        },
        errMsg:""
    }
  }

  componentDidUpdate(prevProps) {
   
    if (this.props.selectedMovie.id !== prevProps.selectedMovie.id) {
      this.setState(()=>{
        return{
        errMsg:"",
        selectedMovie:this.props.selectedMovie
        }
      });
    }
  }

updateField=(field, value)=>{
    this.setState((prevState)=>{
        return{
            errMsg:"",
            selectedMovie:{
                ...prevState.selectedMovie,
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

isMovieExist = (editMovie, movies)=>{
    let result = movies.filter((movie)=>movie.Title === editMovie.Title && movie.id !== editMovie.id)
    return (result.length !== 0)
}

emptyFields = ()=>{
    if(this.state.selectedMovie.Title.length === 0 || this.state.selectedMovie.Year.length === 0 || this.state.selectedMovie.Runtime.length === 0 || this.state.selectedMovie.Genre.length === 0 || this.state.selectedMovie.Director.length === 0){
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
    this.setState(()=>{
        return{
        errMsg:"",
        selectedMovie:this.props.selectedMovie
        }
      });
}

save = ()=>{
    let movies = this.props.movies;
    let selectedMovie = this.state.selectedMovie;
    
    if(this.emptyFields()){
        this.setState((prevState)=>{
            return{
                errMsg:"All fields must filled",
                selectedMovie:prevState.selectedMovie
            }
        })
        return;
    }
    if(!this.yearValidation(selectedMovie.Year)){
        this.setState((prevState)=>{
            return{
                errMsg:"Year should be in range 1888 to current year",
                selectedMovie:prevState.selectedMovie
            }
        })
        return;
    }
    selectedMovie.Title = this.uppercaseFirstLetter(selectedMovie.Title);
    selectedMovie.Title = this.correctTitle(selectedMovie.Title);
    if(this.isMovieExist(selectedMovie, movies)){
        this.setState((prevState)=>{
            return{
                errMsg:"Title Exist",
                selectedMovie:prevState.selectedMovie
            }
        })
        return;
    }
    $('.modal').modal('hide');
    this.props.onEdit(selectedMovie.id, selectedMovie);
}
  
  render() {
  
  return (
    <div >
        <div id="editModal" className="modal" role="dialog" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" id="modal-header">
                           <h3>Edit movie</h3>
                    </div>
                    <div className="modal-body" id="modal-body">
                           <p><label>title:</label><input type="text" id="Title" value={this.state.selectedMovie.Title} onChange={this.onUpdate} /></p>
                           <p><label>year:</label><input type="text" id="Year" value={this.state.selectedMovie.Year} onChange={this.onUpdate} /></p>
                           <p><label>Runtime:</label><input type="text" id="Runtime" value={this.state.selectedMovie.Runtime} onChange={this.onUpdate} /></p>
                           <p><label>Genre:</label><input type="text" id="Genre" value={this.state.selectedMovie.Genre} onChange={this.onUpdate} /></p>
                           <p><label>Director:</label><input type="text" id="Director" value={this.state.selectedMovie.Director} onChange={this.onUpdate} /></p>
                    </div>
                    <div className="modal-footer" id="modal-footer">
                        <div className="errors">
                            {(this.state.errMsg.length!==0) && <p className="error">{this.state.errMsg}</p>}
                        </div>
                        <div className="modal-buttons">
                            <button type="button" className="save" id="btn-approve-modal" onClick={this.save} >Save</button>
                            <button type="button" className="cancel" data-dismiss="modal" onClick={this.onCancel} id="btn-cancel-modal" >Cancel</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>     
    </div>
  );
}

}

export default editModal;






