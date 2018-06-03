import React, { Component } from 'react';
import Scores from './Scores'
import './App.css';
import placeholder from './square-image.png'

const max_width = 600;
const max_height = 600;

/**
 * Resize the image into a reasonable size
 * @param {Image} img
 * @param {string} imgType
 * @return {string}
 */
function resizeMe(img, imgType) {

  let canvas = document.createElement('canvas');

  var width = img.width;
  var height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > max_width) {
      //height *= max_width / width;
      height = Math.round(height *= max_width / width);
      width = max_width;
    }
  } else {
    if (height > max_height) {
      //width *= max_height / height;
      width = Math.round(width *= max_height / height);
      height = max_height;
    }
  }

  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL(imgType); // get the data from canvas as 70% JPG (can be also PNG, etc.)

}

class FileUploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      loading: false
    };
    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleFileChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onload = () => {
      let image = new Image();
      image.src = reader.result;
      image.onload = () => {
        let resized = resizeMe(image);
        this.setState({
          image: resized
        });
      };
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  _handleSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true
    });
    let endpoint = "https://aws.sharedcare.io/nsfw-classify";
    let requestBody = {
      image: this.state.image.split(',')[1]
    };

    let self = this;

    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(requestBody)
    }).then( function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then( function(resJson) {
      self.setState({
        loading: false,
        sfw: resJson.sfw,
        nsfw: resJson.nsfw
      })
    }).catch( function(err) {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="uploader">
        <div className="preview">
          <img src={this.state.image || placeholder} alt="Upload preview" />
        </div>
        <input type="file" accept="image/*" onChange={this._handleFileChange} />
        <button onClick={this._handleSubmit} disabled={this.state.loading}>Predict</button>
        <Scores sfw={this.state.sfw} nsfw={this.state.nsfw}/>
      </div>
    );
  }
}

export default FileUploader;
