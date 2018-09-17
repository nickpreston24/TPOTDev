import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class YeahToast extends Component {
  //   notify = message => toast(message);
  notify = () => toast("Wow so easy !");
  render() {
    return (
      <div>
        <button onClick={this.notify}>Ok!</button>
        <ToastContainer autoClose={false} />
      </div>
    );
  }
}
