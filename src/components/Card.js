import React, { useState,useEffect,useRef } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom'
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let navigate = useNavigate()
    let foodItem = props.item;  
    const priceRef = useRef()
    let options = props.options;
    let price = Object.keys(options);
    const [qty,setQty]=useState(1);
    const[size,setSize]=useState("");
    const handleClick = () => {
        if (!localStorage.getItem("authToken")) {
          navigate("/login")
        }
      }
      const handleQty = (e) => {
        setQty(e.target.value);
      }
      const handleOptions = (e) => {
        setSize(e.target.value);
      }
const handleAddToCart= async()=>{
    let food =[]
    for(const  item of data){
        if(item.id=== props.foodItem._id){
        food =item;
    break;
}
    }
    console.log(props.foodItem._id)
    if (food.length!==0) {
        if (food.length === size) {
          await dispatch({ type: "UPDATE", id:foodItem._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.length !== size){
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
    console.log("Size different so simply ADD one more to the list")
    return
        }
    return
}
await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: props.finalPrice, qty: qty, size: size })
}
let finalPrice = qty*parseInt(options[size])
useEffect(()=>{setSize(priceRef.current.value)},[])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "15rem", "maxHeight": "360px" , boxShadow: "0px 10px 20px black", filter: 'blur(20)', position:"sticky", zIndex: "10"}} >
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fit" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>

                        <div className='container w-100'>
                            <select className='m-2 h-100  bg-danger rounded'onClick={handleClick} onChange={handleQty}>
                                {Array.from(Array(6), (e, i) => {
                                    return (<option key={i + 1} value={i + 1}> {i + 1}</option>)
                                })}
                            </select>
                            <select className='m-2 h-100  bg-danger rounded' ref={priceRef} onClick={handleClick} onChange={handleOptions} >
                                {price.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                            </div>
                            <div><hr>
                            </hr>
                            <button className=' btn-danger justifify-center ms-2 rounded'onClick = {handleAddToCart}>Add to cart</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
