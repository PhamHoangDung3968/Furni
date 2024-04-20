import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/Mycontext';
import '../interface/css/bootstrap.min.css'
import '../interface/css/tiny-slider.css'
import '../interface/css/style.css'

class Menu extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="nav-link"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
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
        <Link class="nav-link" to='/'>Trang chủ</Link>
      </li>
      {cates}
      <li class="nav-link">
      {this.context.token === '' ?
            <div><Link to='/login'>Đăng nhập</Link></div>
            :
            <div>Xin chào <b>{this.context.customer.name}</b> | <Link to='/home' onClick={() => this.lnkLogoutClick()}>Đăng xuất</Link> | <Link to='/myprofile'>Thông tin</Link> | <Link to='/myorders'>Đơn đặt</Link></div>
          }
      </li>
      <li class="nav-link">
      <Link to='/mycart'>Giỏ hàng</Link><b>{this.context.mycart.length}</b>
      </li>
    </ul>
  </div>
</div>
  
</nav>
</div>

      // <div className="border-bottom">
      //   <div className="float-left">
      //     <ul className="menu">
      //       <li className="menu"><Link to='/'>Home</Link></li>
      //       {cates}
      //       <li className="menu">
      //       {this.context.token === '' ?
      //       <div><Link to='/login'>Login</Link> | <Link to='/signup'>Sign-up</Link> | <Link to='/active'>Active</Link></div>
      //       :
      //       <div>Hello <b>{this.context.customer.name}</b> | <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link> | <Link to='/myprofile'>My profile</Link> | <Link to='/myorders'>My orders</Link></div>
      //     }
      //       </li>
      //       <li className="menu">
      //       <Link to='/mycart'>My cart</Link> have <b>{this.context.mycart.length}</b> items
      //       </li>
      //     </ul>
      //   </div>
      //   <div className="float-right">
      //     <form className="search">
      //       <input type="search" placeholder="Enter keyword" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
      //       <input type="submit" value="SEARCH" onClick={(e) => this.btnSearchClick(e)} />
      //     </form>
      //   </div>
      //   <div className="float-clear" />
      // </div>
      
    );
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);