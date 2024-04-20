import React, { Component } from 'react';
import anh1 from '../interface/images/chair.gif'
class Home extends Component {
  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">Trang chủ admin</h2>
        <img src={anh1} width="800px" height="600px" alt="" />
      </div>
    );
  }
}
export default Home;
