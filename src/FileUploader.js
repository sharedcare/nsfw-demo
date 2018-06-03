import React, { Component } from 'react';
import './App.css';
import placeholder from './square-image.png'

class FileUploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagePreview: placeholder
    };
    this._handleFileChange = this._handleFileChange.bind(this);
  }

  _handleFileChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log(reader.result);
      this.setState({
        imagePreview: reader.result
      });
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    let endpoint = "";
    let requestBody = {
      Image: this.state.imagePreview
    };

    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(requestBody)
    }).then( function(response) {

    }).then( function(resJson) {

    }).catch( function(err) {

    });
  }

  render() {
    return (
      <div className="uploader">
        <div className="preview">
          <img src={this.state.imagePreview} alt="Upload preview" />
        </div>
        <input type="file" accept="image/*" onChange={this._handleFileChange} />
        <button onClick={this._handleSubmit}>Predict</button>
      </div>
    );
  }
}

export default FileUploader;
