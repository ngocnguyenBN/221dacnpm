import React, { useState, Fragment, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'
import productData from '../Data/Data'
import ProductItem from '../component/HomePage/ProductItem'
import axios from 'axios';


export default function Admin() {
  
  const [index, setIndex] = useState(8)

  const [data, setData] = useState([])

  const [increase, setIncrease] = useState(false)

  const [disabledButton, setDisabledButton] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8080/products/comprehension')
      .then(response => {
        setData(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  function Sort() {
    return <button type="button" class="btn btn-success" onClick={() => handleSort()}>Sắp xếp</button>
  }

  function handleSort() {
    setData(productData.slice().sort((a, b) => {
      if (!increase) return a.newPrice - b.newPrice
      else return -(a.newPrice - b.newPrice)
    }))

    setIncrease(!increase)
  }

  function ButtonMore() {
    return (
      <div class='row mb-5 d-flex justify-content-center'>
        <button type="button" class="btn btn-secondary w-25"
          onClick={handleClickMore} disabled={disabledButton}>
          <span> Xem thêm</span>
        </button>
      </div>
    )
  }

  function BtnMode(){
    
    return(
        <div class="dropdown ">
        <button type="button" class="btn dropdown-toggle btn-outline-primary" data-bs-toggle="dropdown">
        Quản lý
        </button>
        <ul class="dropdown-menu ">
          <li><a class="dropdown-item" href="managerItem">Quản lý sản phẩm</a></li>
          <li><a class="dropdown-item" href="OrderAdmin">Quản lý đơn hàng</a></li>
        </ul>
      </div>
      )
  }

  function handleClickMore() {

    setIndex(n => n + 8)

    if (index + 8 >= productData.length) {
      // setIndex(index - 8)
      setDisabledButton(!disabledButton)
    }
    // else setIndex(index + 8)
    // console.log('Index : ' + index + ' and Len :' + productData.length)
    // console.log(nameBtnMore)
  }



  function RenderProduct() {
    // ReactDOM.render(<ProductItem product={productData[0]} />,listProduct)
    return <Fragment>{data.slice(0, index).map((product) => {
      return (
        <ProductItem product={product} />
      )
    })}
      <ButtonMore />
      
    </Fragment>
  }


  return (
    <div class='container-fluid'>
      <div class="d-flex justify-content-end container mt-3">
          <Sort/>
          <BtnMode/>
        
      </div>
      <div class='row mx-5' id='product-list'>
        <RenderProduct />
      </div>
    </div>
  );
}



