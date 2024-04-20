import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Anh15 from '../interface/images/sofa.png'


class Login extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
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
						<div class="p-3 align-center">
							<div class="text-center">
								<h1 class="h4 text-gray-900 mb-4">Đăng nhập</h1>
							</div>
							<form class="user">
								<div class="form-group" >
									<input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} 
									class="form-control form-control-user" placeholder="Nhập tài khoản" style={{width:"350px"}}/>
								</div>
								<br/>
								<div class="form-group">
									<input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} 
									class="form-control form-control-user" placeholder="Nhập mật khẩu" style={{width:"350px"}}/>
								</div>
								<br/>
								<div class="form-group">
									<div class="custom-control custom-checkbox small">
										<input type="checkbox" class="custom-control-input" id="customCheck"/>
										<label class="custom-control-label" for="customCheck">Lưu đăng nhập</label>
									</div>
								</div>
								<br/>
								<a href="index.html" class="btn btn-primary btn-user btn-block"  onClick={(e) => this.btnLoginClick(e)} >
									Đăng nhập
								</a>
							</form>
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
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}
export default Login;