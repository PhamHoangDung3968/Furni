import axios from 'axios';
import React, { Component } from 'react';
import '../interface/css/bootstrap.min.css'
// import { Link } from 'react-router-dom';
import '../interface/css/tiny-slider.css'
import '../interface/css/style.css'
import Anh15 from '../interface/images/sofa.png'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    return (
<div class="container">


<div class="row justify-content-center">

	<div class="col-xl-10 col-lg-12 col-md-9">

		<div class="card o-hidden border-0 shadow-lg my-5">
			<div class="card-body p-0">

				<div class="row">
					<div class="col-lg-6 d-none d-lg-block bg-login-image">
					<img src={Anh15} />
					</div>
					<div class="col-lg-6">
						<div class="p-3">
							<div class="text-center">
								<h1 class="h4 text-gray-900 mb-4">Đăng Ký</h1>
							</div>
							<form class="user">
								<div class="form-group" >
									
									<input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} 
									class="form-control form-control-user" placeholder="Tài khoản" style={{width:"350px"}}/>
								</div>
								<br/>
								<div class="form-group">
									<input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
									class="form-control form-control-user" placeholder="Mật khẩu" style={{width:"350px"}}/>
								</div>
								<br/>
								<div class="form-group">
									<input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} 
									class="form-control form-control-user" placeholder="Tên" style={{width:"350px"}}/>
								</div>
								<br/>
								<div class="form-group">
									<input type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} 
									class="form-control form-control-user" placeholder="Số điện thoại" style={{width:"350px"}}/>
								</div>
								<br/>
								<div class="form-group">
									<input type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} 
									class="form-control form-control-user" placeholder="Email" style={{width:"350px"}}/>
								</div>
								<br/>
								<a href="/login" class="btn btn-primary btn-user btn-block"  onClick={(e) => this.btnSignupClick(e)} >
									Đăng ký
								</a>
							</form>
							<hr/>
							<div class="text-center">
								<a class="small" href ='/login'>Tôi đã có tài khoản!</a>
								<div>
								<a class="small" href ='/active'>Kích hoạt tài khoản!!</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

</div>

</div>
    );
  }
  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}
export default Signup;