import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class AddPinForm extends Component {
  constructor() {
    super();
    this.state = {
      file: {},
    };
    this.handleDrop = this.handleDrop.bind(this);
  }
  handleDrop(droppedFile) {
    this.setState({ file: droppedFile[0] });
    const file = new FormData();
    file.append('photo', droppedFile[0]);
    axios.post('/api/upload', file)
      .then(res => console.log(res.data));
  }
  render() {
    const { file } = this.state;
    const boards = this.props.user;
    return (
      <div className="form-pin">
        <div className="form-pin-title center">
          <p>Create Pin</p>
        </div>
        <hr />
        <div className="flex-container">
          <Dropzone className="dropzone" onDrop={this.handleDrop}>
            {file.type ?
              <div className="title">
                Photo Ready for Upload!
                <div className="tick center">
                  <img src="/assets/tick.svg" alt="check" />
                </div>
              </div> :
              <div className="title">Drop in Photo or Click to Upload</div>}
          </Dropzone>
          <div className="form-pin-input">
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea className="textarea" placeholder="Description of your pin" />
              </div>
              <div className="control">
                <label className="label">Choose Board:  </label>
                <div className="select">
                  <select onChange={e => (this.setState({ board: boards.boards[e.target.value].title, boardIdForRedirect: boards.boards[e.target.value]._id }))}>
                    <option disabled selected="true">Your Boards</option>
                    {boards.name && boards.boards.map((board, idx) => (
                      <option key={board.title} value={idx}>{board.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-pin-input-button">
              <div>
                <button className="button">Submit</button>
              </div>
              <div>
                <button className="button">Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ user }) => ({ user });
const mapDispatch = {};
export default connect(mapState, mapDispatch)(AddPinForm);