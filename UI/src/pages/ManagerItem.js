import React, { useState, Fragment,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
import './ManagerItem.css'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';
export default function ManagerItem() {
  
  const history = useHistory();
  const [dele, setDele] = useState(false)
  const [productData, setProductData] = useState()
  
  useEffect(()=>{
    const getData = async ()=>{
      try {
        const res = await axios.get('http://localhost:8080/product/list')
        setProductData(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getData()
  },[dele])
  
  async function remove (e){
    try {
      await axios.delete('http://localhost:8080/product/delete'
      ,
      { 
        params:{
        id: parseInt(e.target.name)
        }
      }
      )
      setDele(!dele)
      toast.success('Xóa sản phẩm thành công :)', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      } catch (error) {
      console.log(error.message)
      }
  }
 
  function ProductItem(props){
    return(
      <>
        <tr>
          <td>{props.item.Id}</td>
          <td>{props.item.Product_Type}</td>
          <td>{props.item.Product_Name}</td>
          <td>{props.item.Color}</td>
          <td>{props.item.Os}</td>
          <td>{props.item.battery}</td>
          <td>{props.item.DisplaySize}</td>
          <td>{props.item.chip}</td>
          <td>{props.item.InStock}</td>
          <td>{props.item.Discount}</td>
          <td>
          <div class="btn-group">
            <button type="button" class="btn btn-success" onClick={()=>history.push('/editItem',props.item.Id)}>Sửa</button>
            <button type="button" class="btn btn-danger" name ={props.item.Id} onClick={remove}>Xóa</button>
            </div>
          </td>
        </tr>
      </>
    )
  }
  
  function ListItem() {
    return <Fragment>{
      productData && productData.map((item) => {
      return (
        <ProductItem item={item} />
      )
    })}
    </Fragment>
  }
  function RenderProduct() {
    return <Fragment>
      <div class="table-responsive mt-3 mb-5">
        <table class="table table-bordered table-hover">
          <thead>
            <tr class="table-primary">
              <th>Id</th>
              <th>Hãng</th>
              <th>Tên</th>
              <th>Màu</th>
              <th>Hệ điều hành</th>
              <th>Battery</th>
              <th>DisplaySize</th>
              <th>Chip</th>
              <th>Số lượng</th>
              <th>Giảm giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
           <ListItem/>
          </tbody>
        </table>
      </div>
    </Fragment>
  }

  function AddItem(){
    return(
      <button type="button" class="btn btn-outline-success" onClick={()=>{
        window.location.href='/addItem'
      }}>
        Thêm sản phẩm
      </button>
    )
  }

  function BtnMode(){
    
    return(
        <div class="dropdown ">
        <button type="button" class="btn dropdown-toggle btn-outline-primary" data-bs-toggle="dropdown">
        Quản lý
        </button>
        <ul class="dropdown-menu ">
          <li><a class="dropdown-item" href="Admin">Quản lý</a></li>
          <li><hr class="dropdown-divider"></hr></li>
          <li><a class="dropdown-item active" href="managerItem">Quản lý sản phẩm</a></li>
          <li><a class="dropdown-item" href="OrderAdmin">Quản lý đơn hàng</a></li>
        </ul>
      </div>
      )
  }
  return (
    <div class='container mt-3'>
      <div class="row">
      <div class='col-md-6 col-sm-6 col-12 mt-2'>
        <h4>Danh sách sản phẩm</h4>
      </div>
      <div class='col-md-6 col-sm-6 col-12 mt-2'>
      <div class="d-flex justify-content-end container">
          <AddItem/>
          <BtnMode/>
        
      </div>
      </div>
      </div>
        <RenderProduct />
    </div>
  )

}



