import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
//SYNTHEETIC EVENTS KE BAREE ME PADLENA
//Handlesubit banya hai aur sab backend ka hai
//submit button me change kiye hai
export default function Signup() {
const [credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
const navigate=useNavigate()
let [address, setAddress] = useState("");
const handleClick = async (e) => {
  e.preventDefault();
  let navLocation = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  }
  let latlong = await navLocation().then(res => {
    let latitude = res.coords.latitude;
    let longitude = res.coords.longitude;
    return [latitude, longitude]
  })
  // console.log(latlong)
  let [lat, long] = latlong
  console.log(lat, long)
  const response = await fetch("https://foodiebackend-1.onrender.com/api/auth/getlocation", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ latlong: { lat, long } })

  });
  const { location } = await response.json()
  console.log(location);
  setAddress(location);
  setcredentials({ ...credentials, [e.target.name]: location })
}

        const handleSubmit = async(e)=>{
            e.preventDefault();
            console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation}))
            const response = await fetch("https://foodiebackend-1.onrender.com/api/auth/createuser",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
            }
        );
        const json = await response.json()
        console.log(json);
        if(!json.success){
            alert("Enter valid credentials")
        }
        else{
          localStorage.setItem("authToken",json.authToken);
          navigate('/')
        }
           }
          
           const onChange =(event)=>
{
    

    setcredentials({...credentials,[event.target.name]:event.target.value})
} 
  return (
    
    <>
    <div className="form bg-danger" style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh',fontSize: '25px',fontFamily: 'montserrat'}}>
    <div>
      <Navbar />
      </div>
    <div className='container 'style={{paddingTop:"10%"}}>
      <form className='w-70 m-auto rounded' style={{"maxHeight": "860px" , boxShadow: "0px 10px 20px black", zIndex: "10" ,opacity:"100" ,paddingLeft:"2%",paddingRight:"3%"}}onSubmit={handleSubmit}>
      <div className="form text-white" >
    <label htmlFor="Name " >Name</label>
    <input style= {{marginBottom:"3%"}} type="text" className="form-control" name='name' value ={credentials.name}  placeholder="Enter Your Name" onChange ={onChange}/>
  </div>
  <div className="form text-white" >
    <label htmlFor="exampleInputEmail1" >Email address</label>
    <input style= {{marginBottom:"3%"}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value ={credentials.email} placeholder="Enter email" onChange ={onChange}/>
  </div>
  <div className="form text-white">
    <label htmlFor="Password1">Password</label>
    <input style= {{marginBottom:"3%"}} type="password" className="form-control" id="exampleInputPassword1" name='password' value ={credentials.password} placeholder="Password" onChange ={onChange}/>
  </div>
  <div className="form ">
  <fieldset>
                <input type="text" className="form-control text white" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>
            <div className="mb-3  mt-4">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-danger">Click for current Location </button>
            </div>
  <button type="submit" className=" btn btn-success">Submit</button>
  <Link to = "/login" className='m-3 btn btn-success'>Already a user</Link>
</form></div>
</div>
    </>
  )
  }
