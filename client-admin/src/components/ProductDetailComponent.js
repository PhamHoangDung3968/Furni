import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
  static contextType = MyContext; 
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }
  render() {
    const cates = this.state.categories.map((cate) => {
      if (this.props.item != null) {
        return (<option key={cate._id} value={cate._id} selected={cate._id === this.props.item.category._id}>{cate.name}</option>);
      } else {
        return (<option key={cate._id} value={cate._id}>{cate.name}</option>);
      }
    });
    return (
      <div class="align-center w-50">
        <h2 className="text-center">Chi tiết sản phẩm</h2>
        <form>
        <div class="form-group row mb-3">
          <label for="inputId" class="col-form-label col-md-3">ID</label>
          <div class="col-md-9">
          <input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true}  class="form-control h-100" id="inputId"/>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="inputName" class="col-form-label col-md-3">Tên sản phẩm</label>
          <div class="col-md-9">
          <input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} class="form-control h-100" id="inputName"/>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="inputPrice" class="col-form-label col-md-3">Giá tiền</label>
          <div class="col-md-9">
          <input type="text" value={this.state.txtPrice} onChange={(e) => { this.setState({ txtPrice: e.target.value })}} class="form-control h-100" id="inputPrice"/>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="inputImg" class="col-form-label col-md-3">Hình ảnh</label>
          <div class="col-md-9">
          <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} class="form-control h-100" id="inputImg"/>
          </div>
        </div>
        <div class="form-group row mb-3">
          <label for="inputCat" class="col-form-label col-md-3">Danh mục</label>
          <div class="col-md-9">
          <select onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }} class="form-control h-100" id="inputCat">{cates}</select>
          </div>
        </div>
        <div class="align-center">
          <input class="btn btn-primary mx-1" type="submit" value="Thêm mới" onClick={(e) => this.btnAddClick(e)} />
          <input class="btn btn-primary mx-1" type="submit" value="Sửa" onClick={(e) => this.btnUpdateClick(e)} />
          <input class="btn btn-primary mx-1" type="submit" value="Xóa" onClick={(e) => this.btnDeleteClick(e)} />
        </div>
        <div class="align-center">
          <img src={this.state.imgProduct} width="300px" height="300px" alt="" />
        </div>
        </form>
      </div>
    );
  }
  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); 
    if (name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPostProduct(prod);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
  // apis
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thao tác thành công!!');
        this.apiGetProducts();
      } else {
        alert('Có lỗi xảy ra');
      }
    });
  }
  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages);
      } else {
        axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages);
        });
      }
    });
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }
  // event-handlers
  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      }
      reader.readAsDataURL(file);
    }
  }
  // apis
  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice);
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, ''); 
    if (id && name && price && category && image) {
      const prod = { name: name, price: price, category: category, image: image };
      this.apiPutProduct(id, prod);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
  // apis
  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thao tác thành công!!');
        this.apiGetProducts();
      } else {
        alert('Có lỗi xảy ra');
      }
    });
  }
  // event-handlers
  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn có chắc chắn không?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Vui lòng điền ID');
      }
    }
  }
  // apis
  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thao tác thành công!!');
        this.apiGetProducts();
      } else {
        alert('Có lỗi xảy ra');
      }
    });
  }
}
export default ProductDetail;