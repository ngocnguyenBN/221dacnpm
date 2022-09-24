import React, { useState, Fragment, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Comment from './Comment';
import { useLocation } from "react-router-dom";
import axios from 'axios';
// import Buttoninfor from './Buttoninfor'
import { useHistory } from "react-router-dom";

function Infor(props) {
    const location = useLocation();
    const history = useHistory();
    // const productData =
    // {
    //     "productName": "Samsung Galaxy Note 20 Ultra 5G",
    //     "image": "https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/300x/9df78eab33525d08d6e5fb8d27136e95/y/e/yellow_final_2.jpg",
    //     "specifications": {
    //         "screen": 6.9,
    //         "ram": 12,
    //         "rom1": "128 GB",
    //         "rom2": "256 GB",
    //         "rom3": "512 GB",
    //         "rom4": "1 TB"
    //     },
    //     "newPrice": 20490000,
    //     "oldPrice": 32990000,
    //     "chip": "Exynos 990",
    //     "pin": "4500 mAh",
    //     "OS": "Android 10"
    // }
    const [data,setdata]=useState([])
    useEffect(()=>{
      const getData = async ()=>{
        try {
          const res = await axios.get('http://localhost:8080/products/getinfor') 
          setdata(res.data)
          //console.log(res.data)
        } catch (error) {
          console.log(error.message)
        }
      }
      getData()
    },[])
    //console.log(data)
    //localStorage.setItem('cart','data')
    console.log(location)
    let info={}
    let img=[]
    let rom=[]
    let price=[]
    for (var i=0; i<data.length; i++){
        if(location.state.Product_Name==data[i].Product_Name){
            var temp =true
            var temp1=true
            var temp2=true
            for(var j=0; j<= img.length; j++) {
                if(img[j] == data[i].Url){
                    //temp=false
                } 
            }
            if(temp ==true){
                img.push(data[i].Url)
                info = data[i]
            }
            for(var j=0; j< rom.length; j++) {
                if(rom[j] == data[i].Rom_Capacity){
                    temp1=false
                } 
            }
            if(temp1 ==true){
                rom.push(data[i].Rom_Capacity)
            }
            for(var j=0; j< price.length; j++) {
                if(price[j] == data[i].Price){
                    temp2=false
                } 
            }
            if(temp2 ==true){
                price.push(data[i].Price)
            }
        }
    }
    rom.sort();
    price.sort();
    
    // for(var i=0; i< img.length; i++) {
    //     if (typeof (img[i]) == 'string') {
    //         imgnew.push(img[i])
    //     }
    // }
    //console.log(imgnew)
    info.Url=location.state.Url
    Object.defineProperty(info, 'Quantity',{
        writable: true,
        configurable: false,
        value: 1
    });
    console.log(info)
    const [show, setShow] = useState(false)
    const HandleShow = () => {

        setShow(!show);
    }
    function handleSubmit() {
        toast.success('Sản phẩm đã thêm vào giỏ hàng', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
         history.push('/Cart',info)
    }
    
    const [rominfor, setRominfor] = useState(location.state.Rom_Capacity)
    const [priceinfor, setPriceinfor] = useState(location.state.Price)
    const [imginfor, setImginfor] = useState(location.state.Url)
    function Handlerominfor (rominfo) {
        setRominfor(rominfo)
        for (var i = 0; i < rom.length; i++){
            if (rominfo == rom[i]){
                setPriceinfor(price[i])
            }
        }
        setImginfor(imginfor)
    }
    info.Rom_Capacity=rominfor
    info.Price=priceinfor
    const [counter, setCounter] = useState(1)
    
    const HandleIncrese = () => {
        setCounter(counter + 1)
    }
    const HandleDecrese = () => {
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }
    info.Quantity=counter
    console.log(img)
    function Renderbutton() {
        return <Fragment >{rom.slice(0, rom.length).map((romindex) => {
             if(typeof(romindex) == 'number'){
                return (
                    <button type="button" style={{ border: '0.5px solid #C4C4C4', borderRadius: '12px', width: "100px", marginLeft: "20px" ,height:'60px'}} class="btn btn-outline-secondary mb-3" onClick={() => Handlerominfor(romindex)} >{romindex} GB</button>
                        //<Buttoninfor romindex={romindex} />
                )
             }
        })}
        </Fragment>
      }
    return (

        <div className="container mt-5" id='product-list'>
            <ToastContainer />
            <div class="row" >
                <div class="col-md-5 col-sm-12 " >
                    {/* <div class="d-flex" style={{ height: 'auto', width: 'auto' }}>
                        <div style={{ display: 'block', marginTop: 'auto', marginBottom: 'auto' }}>
                            <button type="button" class="btn btn-outline-secondary" aria-label="Left Align" style={{ height: '64px', marginLeft: 'auto', borderColor: 'white' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                </svg>
                            </button>
                        </div>
                        <div  >
                            <img style={{ marginLeft: "2px", display: 'block', maxWidth: '100%', height: 'auto' }}
                                src={location.state.image}
                                alt="new"
                                class="card-img-top "
                            />
                        </div>
                        <div style={{ display: 'block', marginTop: 'auto', marginBottom: 'auto' }}>
                            <button type="button" class="btn btn-outline-secondary" aria-label="Left Align" style={{ height: '64px', marginLeft: 'auto', width: 'auto', borderColor: 'white' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                        </div>
                    </div> */}
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">               
                            <div class="carousel-item active">
                                <img src= {img[0]} class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item">
                                <img src={img[1]} class="d-block w-100" alt="..."/>
                            </div>
                            <div class="carousel-item">
                                <img src={img[2]} class="d-block w-100" alt="..."/>
                            </div>
                        </div>
                        <button class="carousel-control-prev btn btn-primary" type="button" data-bs-target="#carouselExampleControls" 
                        data-bs-slide="prev" style={{margin : 'auto', height: '10%', width:'10%'}}>
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next btn btn-primary" type="button" data-bs-target="#carouselExampleControls" 
                        data-bs-slide="next" style={{margin : 'auto', height: '10%', width:'10%'}}>
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div style={{ border: '2px solid #C4C4C4', borderRadius: '12px', textAlign: 'center' }}>
                        <h3>Thông tin chi tiết sản phẩm</h3>
                        <table class="table table-striped">
                            {/* <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            </tr>
                        </thead> */}
                            <tbody>
                                <tr>
                                    <th scope="row">Kích thước màn hình</th>
                                    <td>{info.DisplaySize} inches</td>
                                </tr>
                                <tr>
                                    <th scope="row">Chipset</th>
                                    <td>{info.chip}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Dung lượng RAM</th>
                                    <td>{info.Ram_Capacity} GB</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bộ nhớ trong</th>
                                    <td>{rominfor} GB</td>
                                </tr>

                            </tbody>
                            {
                                show ?
                                    <tbody>
                                        <tr>
                                            <th scope="row">Pin</th>
                                            <td>{info.battery}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Hệ điều hành</th>
                                            <td>{info.Os}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Màu sắc</th>
                                            <td>{info.Color}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Hãng sản xuất</th>
                                            <td>{info.Product_Type}</td>
                                        </tr>
                                    </tbody>
                                    : null
                            }
                        </table>
                        <button type="button" onClick={HandleShow} class="btn btn-outline-secondary mb-3" >
                            {
                            show ? 
                            <div>
                            Ẩn bớt
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                            </svg>
                            </div>  
                            :
                            <div>
                            Xem thêm
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                            </div>
                            }
                        </button>
                    </div>
                </div>
                <div class="col-md-7 col-sm-12" >
                    <div style={{ color: "blue", textAlign: "center" }}>
                        <h1>{location.state.Product_Name}</h1>
                    </div>
                    <div class="d-flex" >
                        <div class="col-md-5 col-sm-5" style={{ color: "red" }}>
                            <h3>{priceinfor} Đ</h3>
                        </div>
                        <div class="col-md-7 col-sm-7" style={{ padding: "auto" }}>
                            <h5 style={{ lineHeight: "20px" }}>(Giá đã bao gồm VAT) Giao hàng tận nơi trên toàn quốc, miễn phí vận chuyển.</h5>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-5 col-sm-5">
                            <h3>Số lượng đặt mua:</h3>
                        </div>
                        {/* <div class="col-md-7 col-sm-7" >
                            <h3><input style={{ maxWidth: '50px' }} class="form-control" type="text" id="fname" name="fname" required /></h3>
                        </div> */}
                        <div class="btn-group d-flex row-col-md-5 row-col-sm-5" role="group" aria-label="Basic example">
                            <button style={{height:'40px'}} type="button" class="btn btn-outline-secondary" onClick={HandleDecrese}>-</button>
                            <input style={{height:'40px', width: '40px', marginLeft:'-36px'}} class="form-control " type="text" id="fname" name="fname" value={counter} required />
                            <button style={{height:'40px'}} type="button" class="btn btn-outline-secondary" onClick={HandleIncrese}>+</button>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-5 col-sm-5 mt-2">
                            <h3>Giá niêm yết:</h3>
                        </div>
                        <div class="col-md-7 col-sm-7" >
                            <h4 style={{ lineHeight: "50px" }}>{priceinfor} * {counter} = { priceinfor * counter}</h4>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="col-md-5 col-sm-5 mt-2">
                            <h3>Thành tiền:</h3>
                        </div>
                        <div class="col-md-7 col-sm-7" >
                            <h4 style={{ lineHeight: "50px" }}>{ priceinfor * counter}</h4>
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {/* <button type="button" style={{ border: '0.5px solid #C4C4C4', borderRadius: '12px', width: "100px", marginLeft: "20px" }} class="btn btn-outline-secondary mb-3">{productData.specifications.rom1} <br /> {productData.newPrice}Đ</button>
                        <button type="button" style={{ border: '0.5px solid #C4C4C4', borderRadius: '12px', width: "100px", marginLeft: "20px" }} class="btn btn-outline-secondary mb-3">{productData.specifications.rom2} <br /> {productData.newPrice}Đ</button>
                        <button type="button" style={{ border: '0.5px solid #C4C4C4', borderRadius: '12px', width: "100px", marginLeft: "20px" }} class="btn btn-outline-secondary mb-3">{productData.specifications.rom3} <br /> {productData.newPrice}Đ</button>
                        <button type="button" style={{ border: '0.5px solid #C4C4C4', borderRadius: '12px', width: "100px", marginLeft: "20px" }} class="btn btn-outline-secondary mb-3">{productData.specifications.rom4} <br /> {productData.newPrice}Đ</button> */}
                        <Renderbutton/>
                    </div>
                    <div class="col-md-10 col-sm-12" style={{ marginTop: "30px" }}>
                        <table >
                            <thead >
                                <th style={{ borderRadius: '12px 12px 0px 0px', borderColor: "#67B9F4", backgroundColor: "#67B9F4", textAlign: "center" }}><h3 style={{ fontWeight: "bold" }}>Thông tin khuyến mãi</h3></th>
                            </thead>
                            <tbody style={{ border: '0.5px solid #C4C4C4', borderRadius: '0px 0px 12px 12px' }}>
                                <tr>
                                    <h4 style={{ marginLeft: "10px" }}>Tặng mã giảm giá 1,000,000đ khi mua các sản phẩm khác tại cửa hàng</h4>
                                    <h4 style={{ marginLeft: "10px" }}>Bảo hành 12 tháng</h4>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-12 col-sm-12" style={{ textAlign: "center" }}>
                        <button style={{ width: "230px", marginTop: "30px", borderRadius: "30px" }} type="button" class="btn btn-danger" onClick={handleSubmit}><h1>Đặt mua</h1></button>
                    </div>
                </div>

            </div>
            {/* <div class="mt-5 text-center w-50 shadow bg-light" style={{ textAlign: "center", margin:"auto" }}>
                    <h3 class="pt-2">Đánh giá và nhận xét</h3>
                    <div class="d-flex justify-content-center">
                        <div class="content text-center">
                            <div class="ratings"> <h3><span class="product-rating">4.6</span><span>/5</span></h3>
                                <div class="stars" style={{ fontSize: "18px", color: "#28a745" }}> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                                <div class="rating-text pt-2"> <span><h3>46 ratings & 15 reviews</h3></span> </div>
                            </div>
                        </div>
                    </div>
            </div> */}
            <div class="mb-5">
                {/* <button style={{ border: '0.5px solid #C4C4C4', borderRadius: '12px', textAlign: "center", width: "500px" }} type="button" class="btn btn-outline-secondary mb-3"><h2> Xem tất cả đánh giá </h2></button> */}
                {/* <Comment /> */}
            </div>
        </div>

    )
}


export default Infor;