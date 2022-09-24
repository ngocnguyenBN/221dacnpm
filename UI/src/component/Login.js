import { React, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios')




export default function Login() {
    const [account, setAccount] = useState('')
    const [pw, setPw] = useState('')



    async function handleSubmit(e) {
        e.preventDefault();

        const respon = await axios.post('http://localhost:8080/login', {
            "acc": account,
            "pass": pw
        })

        if (respon.data === 'Accept') {
            localStorage.setItem('isAdmin', true)
            window.location.href = "/Admin"
        }
        else {
            toast.error('Mật khẩu hoặc tài khoản không đúng', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div>
            <div className="container-md container-xs container-xl text-center" style={{ width: "30%", minWidth: "350px", paddingTop: "150px", paddingBottom: "200px" }} >
                <form method="post">
                    <p className="display-5 mb-5 fw-normal text-center ">Log in</p>
                    <div className="form-floating mb-2">
                        <input type="account" className="form-control" id="floatingInput" placeholder="name@example.com"
                            onChange={(event) => setAccount(event.target.value)} />
                        <label for="floatingInput">Account</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" value={pw}
                            placeholder="Password" onChange={(event) => setPw(event.target.value)} />
                        <label for="floatingPassword">Password</label>
                    </div>
                    {/* {userAccountData.} */}
                    <div class="d-flex mt-5" > 
                        <button className="w-75 btn btn-lg btn-primary mb-5" style={{margin : 'auto'}} type="submit" onClick={handleSubmit}>Log in</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}