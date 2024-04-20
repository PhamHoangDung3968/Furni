import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class CategoryDetail extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div class="align-center w-50">
        <h2 className="text-center">Chi tiết danh mục</h2>
        <form >
        <div class="form-group row mb-3">
          <label for="inputId" class="col-form-label col-md-3">ID</label>
          <div class="col-md-9">
          <input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true}  class="form-control h-100" id="inputId"/>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="inputCat" class="col-form-label col-md-3">Tên danh mục</label>
          <div class="col-md-9">
          <input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }}  class="form-control h-100" id="inputCat"/>
          </div>
        </div>
        <div class="align-center">
          <input class="btn btn-primary mx-1" type="submit" value="Thêm mới" onClick={(e) => this.btnAddClick(e)} />
          <input class="btn btn-primary mx-1" type="submit" value="Sửa" onClick={(e) => this.btnUpdateClick(e)} />
          <input class="btn btn-primary mx-1" type="submit" value="Xóa" onClick={(e) => this.btnDeleteClick(e)} />
        </div>
        </form>
      </div>
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Vui lòng nhập tên danh mục');
    }
  }
  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thao tác thành công!!');
        this.apiGetCategories();
      } else {
        alert('Có lỗi xảy ra');
      }
    });
  }
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  }
  // apis
  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thao tác thành công!!');
        this.apiGetCategories();
      } else {
        alert('Có lỗi xảy ra');
      }
    });
  }

  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Xác nhận xóa?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Vui lòng nhập ID!');
      }
    }
  }
  // apis
  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thao tác thành công!!');
        this.apiGetCategories();
      } else {
        alert('Có lỗi xảy ra');
      }
    });
  }
  
}
export default CategoryDetail;