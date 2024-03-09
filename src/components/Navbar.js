import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'
export default function Navbar() {
  let data = useCart();
  const [cartView,setCartVieww]=useState(false)
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger "
      style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', zIndex: "10", width: "100%", position:"fixed" }}>
        <div className="container-fluid font-success">
          <Link className="navbar-brand fs-1 fst-italic " to="/">फूDe</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                </li> : ""}
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUP</Link></div>
              : <div>
                <div className='btn bg-white text-success mx-2'onClick={()=>{setCartVieww(true)}}>MY CART{" "}
                <Badge pill bg="danger">{data.length} </Badge></div>
                {cartView?<Modal onClose={()=>setCartVieww(false)}><Cart/></Modal>:null}
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>LOGOUT</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
