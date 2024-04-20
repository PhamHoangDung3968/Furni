import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Order extends Component {
  static contextType = MyContext; 
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }
  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total}</td>
          <td>{item.status}</td>
          <td>
            {item.status === 'PENDING' ?
               <div ><span className="link" style={{textDecoration:"none"}} onClick={() => this.lnkApproveClick(item._id)}>CHẤP THUẬN</span> || <span className="link" style={{color:'red', textDecoration:"none"}} onClick={() => this.lnkCancelClick(item._id)}>HỦY</span></div>
              : <div />}
          </td>
        </tr>
      );
    });
    if (this.state.order) {
      var items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id} className="datatable">
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{item.product.price * item.quantity}</td>
          </tr>
        );
      });
    }
    return (
      <div>
        <h2 class="align-center">Danh sách đặt hàng</h2>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ngày khởi tạo</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Tổng cộng</th>
                  <th>Trạng thái</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {orders}
            </tbody>
          </table>
        </div>
        </div>
        {this.state.order ?
          <div className="align-center">
          <h2 className="text-center">Chi tiết đặt hàng</h2>
          <div class="site-blocks-table">
            <table class="table">
              <thead>
                <tr>
                <th>Số thứ tự</th>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Giá tổng</th>
                </tr>
              </thead>
              {items}
              </table>
              </div>
        </div>
          : <div />}
      </div>
    );
  }
  componentDidMount() {
    this.apiGetOrders();
  }
  // event-handlers
  trItemClick(item) {
    this.setState({ order: item });
  }
  // event-handlers
  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }
  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }
  // apis
  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('Có lỗi xảy ra!');
      }
    });
  }
  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}
export default Order;