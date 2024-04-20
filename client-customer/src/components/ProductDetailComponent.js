import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/Mycontext';
import Anh15 from '../interface/images/sofa.png'
import Anh16 from '../interface/images/envelope-outline.svg'

class ProductDetail extends Component {
  static contextType = MyContext; // using this.context to access global stat
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div>
          <h2 className="text-center">Chi Tiết Sản Phẩm</h2>
          <div class="container1">
		 <div class="product1">
     <img src={"data:image/jpg;base64," + prod.image}  alt="" class="product-image" />
			
			<h1 class="product-title">{prod.name}</h1>
			<p class="product-price">{prod.price}đ</p>
      <div style={{display:"flex"}}>
			<p class="product-description">Số lượng: <input class="form-control form-control-user" type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></p>
			<div style={{marginLeft:"auto"}}>
				<input class="btn btn-primary mx-1 " type="submit" value="Thêm vào giỏ hàng" onClick={(e) => this.btnAdd2CartClick(e)} />
        </div>
        </div>
		</div>
    <br/><br/><br/><br/>
        {/* <div className="align-center">
          <h2 className="text-center">Chi Tiết Sản Phẩm</h2>
          <figure className="caption-right">
            <img src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
            <figcaption style={{fontSize:"18px"}}>
              <form >
                <table >
                  <tbody>
                    <tr >
                      <td align="center">ID:</td>
                      <td>{prod._id}</td>
                    </tr>
                    <tr>
                      <td align="center"></td>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <td align="center"></td>
                      <td>{prod.price}</td>
                    </tr>
                    <tr>
                      <td align="center"></td>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td align="center"></td>
                      <td><input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td ><input class="btn btn-primary mx-1" type="submit" value="Thêm vào giỏ hàng" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure> */}
          
        </div>
        <footer class="footer-section">
	<div class="container relative">

		<div class="sofa-img">
		<img src={Anh15}/>
		</div>

		<div class="row">
			<div class="col-lg-8">
				<div class="subscription-form">
					<h3 class="d-flex align-items-center"><span class="me-1"><img src={Anh16}/></span><span>Đăng ký tin</span></h3>

					<form action="#" class="row g-3">
						<div class="col-auto">
						<input type="text" placeholder="Nhập tên của bạn" class="form-control"/>
						</div>
						<div class="col-auto">
						<input type="text" placeholder="Nhập email của bạn" class="form-control"/>
						</div>
						<div class="col-auto">
							<button class="btn btn-primary">
								<span>Gửi</span>
							</button>
						</div>
					</form>

				</div>
			</div>
		</div>

		<div class="row g-5 mb-5">
			<div class="col-lg-4">
				<div class="mb-4 footer-logo-wrap"><a href="#" class="footer-logo">Furni<span>.</span></a></div>
				<p class="mb-4">Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant</p>

				<ul class="list-unstyled custom-social">
					<li><a href="#"><span class="fa fa-brands fa-facebook-f"></span></a></li>
					<li><a href="#"><span class="fa fa-brands fa-twitter"></span></a></li>
					<li><a href="#"><span class="fa fa-brands fa-instagram"></span></a></li>
					<li><a href="#"><span class="fa fa-brands fa-linkedin"></span></a></li>
				</ul>
			</div>

			<div class="col-lg-8">
				<div class="row links-wrap">
					<div class="col-6 col-sm-6 col-md-3">
						<ul class="list-unstyled">
							<li><a href="#">Về chúng tôi</a></li>
							<li><a href="#">Dịch vụ</a></li>
							<li><a href="#">Blog</a></li>
							<li><a href="#">Liên hệ</a></li>
						</ul>
					</div>

					<div class="col-6 col-sm-6 col-md-3">
						<ul class="list-unstyled">
							<li><a href="#">Hỗ trợ</a></li>
							<li><a href="#">Kiến thức cơ bản</a></li>
							<li><a href="#">Tin nhắn trực tiếp</a></li>
						</ul>
					</div>

					<div class="col-6 col-sm-6 col-md-3">
						<ul class="list-unstyled">
							<li><a href="#">Nghề nghiệp</a></li>
							<li><a href="#">Nhóm của chúng tôi</a></li>
							<li><a href="#">Khả năng lãnh đạo</a></li>
							<li><a href="#">Chính sách bảo mật</a></li>
						</ul>
					</div>

					
				</div>
			</div>

		</div>

		<div class="border-top copyright">
			<div class="row pt-4">
				<div class="col-lg-6">
					<p class="mb-2 text-center text-lg-start">Copyright &copy;. All Rights Reserved. &mdash; Designed with love by <a href="https://untree.co">Untree.co</a> Distributed By <a hreff="https://themewagon.com">ThemeWagon</a>  
    </p>
				</div>

				<div class="col-lg-6 text-center text-lg-end">
					<ul class="list-unstyled d-inline-flex ms-auto">
						<li class="me-4"><a href="#">Terms &amp; Conditions</a></li>
						<li><a href="#">Privacy Policy</a></li>
					</ul>
				</div>

			</div>
		</div>

	</div>
</footer>
        </div>
      );
    }
    return (<div />);
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Thao tác thành công!');
    } else {
      alert('Vui lòng nhập số lượng!');
    }
  }
}
export default withRouter(ProductDetail);