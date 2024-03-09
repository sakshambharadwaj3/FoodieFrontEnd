import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
export default function Login() {
let navigate = useNavigate()
  const [credentials,setcredentials]=useState({email:"",password:""})
        const handleSubmit = async(e)=>{
            e.preventDefault();
            const response = await fetch("https://foodiebackend-1.onrender.com/api/auth/login",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email:credentials.email,password:credentials.password,})
            });
        const json = await response.json()
        console.log(json);
        if(json.success){
          localStorage.setItem("userEmail",credentials.email);
          localStorage.setItem("authToken",json.authToken);
          navigate("/");
      }
      else {
        alert("Enter Valid Cs")
           }}
           const onChange =(event)=>{setcredentials({...credentials,[event.target.name]:event.target.value})} 
  return (
    <>
    <div> <Navbar/></div>
    <div  style={{
      fontSize: '25px',
      fontFamily: 'montserrat',
      width:'100%',
      height:'100%',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      position: "absolute", 
      marginLeft:"0.1%",backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    }}>
      <div className="container-fluid "style={{paddingTop:"6%"}}>
      <div className='container  border-success rounded'style={{"maxHeight": "360px" , boxShadow: "0px 10px 20px black", position:"sticky", zIndex: "10" ,opacity:"100"}}>
      <form onSubmit={handleSubmit}>
  <div className="form-group text-white " style= {{marginTop:"8%"}}>
    <label htmlFor="Email ">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value ={credentials.email} placeholder="Enter email" onChange ={onChange}/>
  
  </div>
  <div className="form-group text-white" style= {{marginBottom:"3%"}}>
    <label htmlFor="Password">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value ={credentials.password} placeholder="Password" onChange ={onChange}/>
  </div>
  
  <button type="submit" className="m-3 btn btn-success">Submit</button> 
  <Link to = "/createuser" className='m-3 btn btn-danger'>New user</Link>
</form></div>
    </div>
    </div></>
  )
  }