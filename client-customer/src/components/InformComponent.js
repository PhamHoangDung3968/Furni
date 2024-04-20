import React, { Component } from 'react';
import MyContext from '../contexts/Mycontext';
import '../interface/css/bootstrap.min.css'
import '../interface/css/tiny-slider.css'
import '../interface/css/style.css'
import Anh from '../interface/images/couch.png'
class Inform extends Component {
  static contextType = MyContext; 
  render() {
    return (
        <div class="hero">
	<div class="container">
		<div class="row justify-content-between">
			<div class="col-lg-5">
				<div class="intro-excerpt">
					<h1>Nội Thất Hiện Đại <span clsas="d-block">Xưởng Thiết Kế</span></h1>
					<p class="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>
					<p><a href="" class="btn btn-secondary me-2">Mua ngay</a><a href="#" class="btn btn-white-outline">Khám phá</a></p>
				</div>
			</div>
			<div class="col-lg-7">
				<div class="hero-img-wrap">
					<img src={Anh}/>
				</div>
			</div>
		</div>
	</div>
</div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;