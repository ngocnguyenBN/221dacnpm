
import productData from '../Data/Data'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import ProductList from './HomePage/ProductList'
import ProductItem from './HomePage/ProductItem'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'



function Header() {

    const [searchTerm, setSearchTerm] = useState('')
    const history = useHistory()

    function handleSearch(searchKey) {



        if (searchKey == '') {
            window.location.href = "/"
            return
        }

        axios.get(`http://localhost:8080/products/search/${searchKey}`)
            .then(response => {
                let data = response.data
                console.log(data)
                if (data.length == 0) {
                    toast.error('Không tìm thấy sản phẩm', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return
                }

                console.log(window.location.pathname)

                if (window.location.pathname === '/search') history.push('/', data)

                // else 
                // window.location.href = '/'
                history.push('/search', data)

                // let resultSearch;
                // // let productFound = productData.filter((product) => {
                // //     return product.productName.toLowerCase().includes(searchKey.toLowerCase())
                // // })
                // resultSearch = (<div class='row ' style={{ marginTop: '6rem', marginBottom: '6rem' }}>
                //     {
                //         data.map((product => {
                //             return <ProductItem product={product} />
                //         }))
                //     } </div>)
                // ReactDOM.render(resultSearch, document.getElementById('product-list'))
            })
            .catch(error => console.log(error))
    }

    function LogIcon() {
        if (localStorage.getItem("isAdmin")) {
            return (<button class="btn btn-outline-primary me-3" type="submit" onClick={() => {
                localStorage.removeItem("isAdmin")
                window.location.href = "/Login"
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-people-fill mb-1 me-1" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
                Đăng xuất
            </button>)
        }
        else return (<button class="btn btn-outline-primary me-3" type="submit" onClick={() => window.location.href = "/Login"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-people-fill mb-1 me-1" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
            </svg>
            Đăng nhập
        </button>)
    }


    return (<div class="row">
        <nav class="navbar navbar-expand-lg navbar-light shadow-sm" style={{ backgroundColor: "#A1C6E0" }}>

            <div class="container-fluid">
                <a class="navbar-brand " href="/" style={{ fontFamily: "Roboto", fontSize: "36px" }}>Logo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">Trang chủ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#footer">Liên Hệ</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Danh Mục Sản Phẩm
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" onClick={() => handleSearch('samsung')} style={{ 'cursor': "pointer" }}>Samsung</a></li>
                                <li><a class="dropdown-item" onClick={() => handleSearch('Oppo')} style={{ 'cursor': "pointer" }}>Oppo</a></li>
                                <li><a class="dropdown-item" onClick={() => handleSearch('Iphone')} style={{ 'cursor': "pointer" }}>Iphone</a></li>
                                <li><a class="dropdown-item" onClick={() => handleSearch('Xiaomi')} style={{ 'cursor': "pointer" }}>Xiaomi</a></li>
                                <li><a class="dropdown-item" onClick={() => handleSearch('ASUS')} style={{ 'cursor': "pointer" }}>ASUS</a></li>

                            </ul>
                        </li>
                    </ul>
                    <LogIcon />
                    <a class="nav-link text-primary" href="/admin">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                        </svg>
                    </a>
                    <a class="nav-link text-danger" href="/Cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                    </a>
                    <div class='me-2'>
                        <input class="form-control" type="text" placeholder="Search" aria-label="text" onKeyUp={(even) => {
                            if (even.key === "Enter") {
                                even.preventDefault();
                                document.getElementById('search').click()
                            }
                            else setSearchTerm(even.target.value)
                        }} />
                    </div>
                    <div>
                        <button class="btn btn-outline-success me-2 " type="submit" onClick={() => handleSearch(searchTerm)} id='search'>Search</button>
                    </div>
                </div>
            </div >
            <ToastContainer />
        </nav >
    </div>)
}

export default Header