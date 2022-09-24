import React, { useState, Fragment } from 'react';
import Header from './Header'
import Footer from './Footer'

const productData = [
  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },
  {
    "productName": "Oppo Reno 6 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/small_image/9df78eab33525d08d6e5fb8d27136e95/r/e/reno6-1_1.jpg",
    "specifications": {
      "screen": 6.43,
      "ram": 8,
      "rom": 128
    },
    "newPrice": 12490000,
    "oldPrice": 12990000
  },
  {
    "productName": "Xiaomi Redmi Note 10 Pro",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/small_image/9df78eab33525d08d6e5fb8d27136e95/x/i/xiaomi-redmi-note-10-pro_2_.png",
    "specifications": {
      "screen": 6.67,
      "ram": 8,
      "rom": 128
    },
    "newPrice": 7300000,
    "oldPrice": 7490000
  },
  {
    "productName": "ASUS ROG Phone 5 Chính Hãng",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/small_image/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-rog-phone-5_0002_gsmarena_001.jpg",
    "specifications": {
      "screen": 6.78,
      "ram": 16,
      "rom": 256
    },
    "newPrice": 18990000,
    "oldPrice": 22990000
  },
  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490007,
    "oldPrice": 32990000
  },
  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490014,
    "oldPrice": 32990000
  },
  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490045,
    "oldPrice": 32990000
  },
  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },

  {
    "productName": "Samsung Galaxy Note 20 Ultra 5G",
    "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    "specifications": {
      "screen": 6.9,
      "ram": 12,
      "rom": 256
    },
    "newPrice": 20490000,
    "oldPrice": 32990000
  },


]



function ProductItem(props) {


  return (
    <div className="col-md-3 col-lg col-xl my-5">
      <div className="card shadow"
        style={{
          width: '100%',
          border: '0.5px solid #C4C4C4', borderRadius: '12px', cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          maxWidth: '302px'
        }}
        onClick={() => 1}>
        <img src={props.product.image} className="card-img-top " alt="..." style={{ width: '90%', borderRadius: '10%'}} />
        <div className="card-body">
          <h5 className="card-title" style={{minHeight:'48px'}}>{props.product.productName}</h5>
          <div className='row' style={{ paddingRight: '4px', paddingLeft: '4px' }}>
            <div className='col-md col-lg col-xl float-start m-2 rounded text-center' style={{ backgroundColor: '#C4C4C4', maxWidth: '104px' }}>
              {props.product.specifications.screen} inches
            </div>
            <div className='col-md col-lg col-xl m-2 rounded' style={{ backgroundColor: '#C4C4C4', maxWidth: '62px' }}>
              {props.product.specifications.ram}GB
            </div>
            <div className='col-md col-lg col-xl m-2 rounded text-center' style={{ backgroundColor: '#C4C4C4', maxWidth: '72px' }}>
              {props.product.specifications.rom}GB
            </div>
          </div>
          <p className="text-danger h1">{props.product.newPrice}</p>
          <p className="text-muted h3 text-decoration-line-through">{props.product.oldPrice}</p>
        </div>
      </div>
    </div>
  )
}




export default function ProductList() {

  const [index, setIndex] = useState(8)

  const [data, setData] = useState(productData)

  const [increase, setIncrease] = useState(false)

  const [disabledButton, setDisabledButton] = useState(false)

  // này là component 
  function Sort() {
    return <button type="button" className="btn btn-success" onClick={() => handleSort()}>Sắp xếp</button>
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
      <div className='row mb-5 d-flex justify-content-center'>
        <button type="button" className="btn btn-secondary w-25"
          onClick={handleClickMore} disabled={disabledButton}>
          <span> Xem thêm</span>
        </button>
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
    <div className='container-fluid'>
      <div className='row' style={{ marginLeft: '3rem', marginTop: '5rem' }}>
        <div className='col-md-6 mt-5'>
          <Sort />
        </div>
      </div>
      <div className='row mx-5' id='product-list'>
        <RenderProduct />
        {/* <ButtonMore /> */}
      </div>
    </div>
  );
}



