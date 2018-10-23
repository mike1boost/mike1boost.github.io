import * as React from 'react';

class deleteModal extends React.Component {
 
delete = () => {
    this.props.onDelete(this.props.selectedMovie);
}
  
render() {
    
    return (
        <div >
            <div id="deleteModal" className="modal-send modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-send-header" id="modal-send-header">
                            <h3>Delete movie</h3>
                        </div>
                        <footer>
                            <button type="button" id="btn-approve-modal" data-dismiss="modal" onClick={this.delete} >Ok</button>
                            <button type="button" id="btn-cancel-modal" data-dismiss="modal" >Cancel</button>
                        </footer>    
                    </div>
                </div>
            </div>      
        </div>
    );
}

}

export default deleteModal;






