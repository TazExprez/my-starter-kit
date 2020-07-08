// import React from "react";
// If I say what I said on top, that means in here, in this file, I am inporting the library of React.  So what it does is it finds all of those files, all of those functions from that file, and basically imports it into a huge bundle.  It has my code.

// It will take my files, like the one underneath, along with all the files from React, and it will bundle it up together, but it will all just be one file.  I think that what does this is the webpack plugin in the webpack.config.js file.
// console.log("testing");

// The name of the folder this is in, /firstComp, stands for first component.

// This file, index.js, could have been named anything you wanted.

import React, { Component } from "react";
import ReactDOM from "react-dom";

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      name: "Joe"
    };
  }

  render() {
    return (
      <div className="home">
        {/* <h3>THIS IS MY HOME PAGE</h3> */}
        {/* <h3>THIS IS MY WORK PAGE</h3> */}
        <h3>THIS IS MY Home PAGE</h3>
      </div>
    );
  }
}

const app = document.getElementById("app");

ReactDOM.render(<Layout />, app);
