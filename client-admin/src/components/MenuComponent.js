import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import '../interface/css/bootstrap.min.css'
import '../interface/css/tiny-slider.css'
import '../interface/css/style.css'

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div>
      <nav class="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">
      
      <div class="container">
        <a class="navbar-brand" href="#">Furni<span>.</span></a>
      
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarsFurni">
          <ul class="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
            <li class="nav-item active">
            <Link class="nav-link" to='/admin/home'>Trang chủ</Link>
            </li>
            <li class="nav-item active">
            <Link class="nav-link" to='/admin/category'>Danh mục</Link>
            </li> 
            <li class="nav-item active">
            <Link class="nav-link" to='/admin/product'>Sản phẩm</Link>
            </li>
            <li class="nav-item active">
            <Link class="nav-link" to='/admin/order'>Đặt hàng</Link>
            </li>
            <li class="nav-item active">
            <Link class="nav-link" to='/admin/customer'>Khách hàng</Link>
            </li>
            <li class="nav-link">
                  <div>Xin chào <b>{this.context.username}</b> | <Link to='/admin/home' onClick={() => this.lnkLogoutClick()}>Đăng xuất</Link></div>
            </li>
          </ul>
        </div>
      </div>
      </nav>   
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}
export default Menu;