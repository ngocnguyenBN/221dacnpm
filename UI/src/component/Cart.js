import React, { useState, Fragment, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Card from 'react-bootstrap/Card'
function Cart(props) {
    const [reload, setReload] =useState(false)
    let date = new Date().toLocaleDateString('zh-Hans-CN');
    let incart = true
    const [indexitem,setIndexitem] = useState(-1)
    let temp={
        "state":{
            Quantity: 1,
            Product_Name: '',
            Price: 0,
            Url: ''
        }
    }
    let location = useLocation();
    if(!location.state){
        location=temp
        incart = false
    }
    const [discount, setDiscount] = useState('')
    const [check, setCheck] = useState(0)
    const [counter, setCounter] = useState(location.state.Quantity)
    const HandleDiscount = () => {
        setCheck(0);
        for (var i = 0; i < data.length; i++){
            temp = JSON.parse(localStorage.getItem('cart'))
            if (data[i].Id_Discount == discount && (data[i].Product_Name == location.state.Product_Name|| data[i].Product_Name == temp.belongtocart[indexitem].productname )){
                setCheck(data[i].Price);
                return 
            }
            else {
                setDiscount(0);
                
            }
        }
    }

    const [name, setName] = useState('')
    const [phone, setPhone] = useState(0)
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [paymethod, setPayMethod] = useState('')
    let infoitem = {
        "id" : location.state.Id,
        "productname": location.state.Product_Name,
        "price": location.state.Price,
        "url": location.state.Url,
        "quantity": counter
    }
    let info = {
        "name" : name,
        "phone" : phone,
        "address": address,
        "email": email,
        "paymethod":paymethod,
        "buytime": date,
        "belongtocart": []
    }
    const [checklocal, setChecklocal] = useState(true)
    if(localStorage.getItem('cart')!== null){
        info = JSON.parse(localStorage.getItem('cart'))

        incart=true
    }

    if (incart && checklocal) {
        if (infoitem.price>0 && infoitem.quantity>0){
            let checkpush = true
            let addquantity = -1
            for(var i=0; i<info.belongtocart.length; i++){
                if(info.belongtocart[i].price == infoitem.price && info.belongtocart[i].id == infoitem.id){
                    checkpush = false
                    addquantity = i
                }
            }
            if (checkpush ==true){
                info.belongtocart.push(infoitem)
            }
            else{
                info.belongtocart[addquantity].quantity += infoitem.quantity
            }
        }
        localStorage.setItem('cart',JSON.stringify(info))
        setChecklocal(false)
    }


    if(localStorage.getItem('cart')!== null){
        info = JSON.parse(localStorage.getItem('cart'))

        incart=true
    }

    function HandleIncrese (index) {
        var thisindex = 0
        for (var i = 0; i < info.belongtocart.length; i++){
            if(index == info.belongtocart[i]){
                thisindex = i
            }
        }
        info.belongtocart[thisindex].quantity +=1
        localStorage.setItem('cart',JSON.stringify(info)) 
        setReload(!reload)
    }
    function HandleDecrese (index) {
            var thisindex = 0
            for (var i = 0; i < info.belongtocart.length; i++){
                if(index == info.belongtocart[i]){
                    thisindex = i
                }
            }
            if(info.belongtocart[thisindex].quantity >1){
                info.belongtocart[thisindex].quantity -=1
            }
            localStorage.setItem('cart',JSON.stringify(info)) 
            setReload(!reload)


    }
    function HandleDelete (index) {
        var thisindex = 0
        for (var i = 0; i < info.belongtocart.length; i++){
            if(index == info.belongtocart[i]){
                thisindex = i
            }
        }
        if(info.belongtocart.length == 1){
            incart = false 
            location =''
            localStorage.removeItem('cart');
        }
        else{
            location =''
            info.belongtocart.splice(thisindex,1)
            localStorage.setItem('cart',JSON.stringify(info))
        }
        
    }
    const [data,setdata]=useState([])
   
    useEffect(()=>{
      const getData = async ()=>{
        try {
          const res = await axios.get('http://localhost:8080/products/discount') 
          setdata(res.data)
        } catch (error) {
        }
      }
      getData()
    },[])

    function handleSubmit() {
        if(name!=='' && phone !== '' && email !== '' && paymethod !== '' && address !== '') {
            toast.success('?????t h??ng th??nh c??ng', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            info.name=name;
            info.phone=phone;
            info.email=email;
            info.paymethod=paymethod;
            info.address=address;
            info.buytime=date;
            localStorage.setItem('cart',JSON.stringify(info))
            axios.post('http://localhost:8080/cart/add',{info})
        }
    }
    function total(){
        var sum = 0;
        for(var i=0; i< info.belongtocart.length; i++){
            sum+= info.belongtocart[i].price* info.belongtocart[i].quantity
        }
        sum -= check
        return sum
    }
    function Renderitem() {
        return <Fragment >{info.belongtocart.slice(0, info.belongtocart.length).map((index) => {
            for (var i = 0; i < info.belongtocart.length; i++){
                if(index === info.belongtocart[i]){
                    setIndexitem(i)
                }
            }
                return (
                    <div class="col-md-12 col-sm-12 my-3 row" style={{ border: '2px solid #C4C4C4', borderRadius: '12px' }}>
                        <div class="col-md-4 col-sm-4">
                            <img style={{ marginLeft: "2px", display: 'block', maxWidth: '100%', height: 'auto' }}
                                //src="https://cdn.hoanghamobile.com/i/preview/Uploads/2021/09/15/image-removebg-preview-15.png"
                                src={index.url}
                                alt="new"
                                class="card-img-top "
                            />
                        </div>
                        <div class="col-md-8 col-sm-8">
                            <h2 style={{ textAlign: 'center' }}>{index.productname}</h2>
                            <h3 style={{ color: 'red' }}>{index.price} ??</h3>
                            <h3>Khuy???n m??i:</h3>
                            <h5>- T???ng m?? gi???m gi?? 1,000,000?? khi mua c??c s???n ph???m kh??c t???i c???a h??ng</h5>
                            <h5>- B???o h??nh 12 th??ng</h5>
                            <div class="btn-group d-flex col-md-12 col-sm-12 mb-3" role="group" aria-label="Basic example" style={{maxWidth:'300px'}}>
                                <a id="delete" href="#" ><button style={{height:'40px'}} type="button"  class="btn btn-outline-danger" onClick={() => HandleDelete(index)}> X??a kh???i gi??? </button></a>
                                <button style={{height:'40px', marginLeft:'-36px'}}type="button" class="btn btn-outline-secondary" onClick={() => HandleDecrese(index)}>-</button>
                                <input style={{height:'40px', width: '40px', marginLeft:'-36px'}} class="form-control" type="text" id="fname" name="fname" value={index.quantity} required />
                                <button style={{height:'40px'}}type="button" class="btn btn-outline-secondary" onClick={() => HandleIncrese(index)}>+</button>
                            </div>
                        </div>
                    </div>
                )
            
        })}
        </Fragment>
      }


    return (
        <div className="container" id='product-list' >
            
            <ToastContainer />
            <div class="col-md-12 col-sm-12 d-flex mt-3">
                <div class="col-md-6 col-sm-6 ">
                    {/* <span class="glyphicon glyphicon-menu-left" aria-hidden="true" style={{ marginLeft: 'auto', width: 'auto', color: 'red' }}></span> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16" style={{ marginLeft: 'auto', width: 'auto', color: 'red' }}>
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <a href="/" class="link-danger text-decoration-none">Ti???p t???c t??m ki???m s???n ph???m</a>
                </div>
                <div class="col-md-6 col-sm-6 ">
                    <p style={{ textAlign: 'right', fontSize: '1.5em' }}>Gi??? h??ng c???a b???n</p>
                </div>
            </div>


            {
                incart==true?
            <div>
            <Renderitem/>
            

            <div style={{ marginTop: '30px'}} class="row-col-md-12 row-col-sm-12 d-flex ">
                <p class="col-md-4 col-sm-4 h3">Nh???p m?? gi???m gi??:</p>
                <input style={{maxWidth: '40%'}}class="form-control col-md-5 col-sm-5" type="text" id="fname" name="fname" required onChange={(event) => setDiscount(event.target.value)}/>
                {/* <button style={{ height: '35px', marginLeft: '10px' }} type="button" class="btn btn-danger" onClick={HandleDiscount} >??p d???ng</button> */}
                <button style={{ marginLeft: '10px'}} type="button" class="btn btn-danger col-md-2 col-sm-3" onClick={HandleDiscount} >??p d???ng</button>
            </div>
            <div style={{ marginTop: '30px' }} class="row-col-md-12 row-col-sm-12 d-flex">
                <p class="col-9 h3" >M?? gi???m gi??:</p>
                <p class="h3">{
                    check?
                        <p> {check}?? </p>
                    :   <p> 0?? </p>
                }
                
                 </p>
            </div>
 
            <div style={{ marginTop: '30px' }} class="row-col-md-12 row-col-sm-12 d-flex">
                <p class="col-9 h3" >T???ng ti???n:</p>
                <p class="h3" style={{ color: 'red' }}>{total()}??</p>
            </div>



            <form class="row g-3 needs-validation" novalidate>
            <div style={{ marginTop: '30px', textAlign: 'center' }} class="col-md-11 col-sm-11">
                <p style={{ fontSize: '2em', textAlign: 'center' }} class="col-md-12 col-sm-12 ">Nh???p th??ng tin ?????t mua</p>
                <div className="d-flex" >

                    <input style={{ maxWidth : '49.7%'}} type="text" class="form-control col-md-6 col-sm-6 mb-2" aria-describedby="emailHelp" placeholder="H??? v?? t??n" required onChange={(event) => setName(event.target.value)}></input>
                    <input style={{ marginLeft: '8px', maxWidth : '49.7%' }} type="number" class="form-control col-md-6 col-sm-6 mb-2" aria-describedby="emailHelp" placeholder="S??? ??i???n tho???i" required onChange={(event) => setPhone(event.target.value)}></input>

                </div>
                <div className="d-flex" >
                    <input style={{ maxWidth : '49.7%'}} type="text" class="form-control col-md-6 col-sm-6 mb-2" aria-describedby="emailHelp" placeholder="?????a ch??? nh???n h??ng" required onChange={(event) => setAddress(event.target.value)}></input>
                    <input style={{ marginLeft: '8px', maxWidth : '49.7%' }} type="email" class="form-control col-md-6 col-sm-6 mb-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required onChange={(event) => setEmail(event.target.value)}></input>
                </div>
                <select id="inputState" class="form-control col-12" style={{margin : "auto",maxWidth : '100%'}} required onChange={(event) => setPayMethod(event.target.value)}>
                    <option selected disabled value="">H??nh th???c thanh to??n</option>
                    <option value="Thanh to??n tr???c ti???p">Thanh to??n tr???c ti???p</option>
                    <option value="Chuy???n kho???n">Chuy???n kho???n</option>
                </select>
            </div>
            <div class="col-12 mb-5" style={{ textAlign: "center" }}>
                <button style={{ marginTop: "30px", borderRadius: "15px" }} type="submit" class="btn btn-danger" onClick={handleSubmit}><h1>X??c nh???n ?????t h??ng</h1></button>
            </div>
            </form>
            </div>
            : 
            <div class="text-center my-5">
                <Card>
                    <Card.Body>
                        <h2>B???n ch??a c?? s???n ph???m n??o trong gi??? h??ng</h2>
                    
                    </Card.Body>
                </Card>
                
            </div>
            }
                
          </div>      
    )
    
}


export default Cart;
