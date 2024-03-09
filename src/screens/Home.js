import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
export default function Home() {
  const [search, setSearch] = useState([]);
  const [foodCat, setfoodCat] = useState([]);
  const [fooditem, setfooditem] = useState([]);
  
  const loadFoodItems = async () => {
    let response = await fetch("https://localhost:5000/api/auth/foodData", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' }
    })
    response = await response.json();
    setfoodCat(response[1])
    setfooditem(response[0])
  }
  useEffect(() => {
    loadFoodItems()
  }, [])



  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
              {/*<button className="btn btn-outline-success text-white bg-sucess" type="submit">Search</button>*/}
            </div>
          </div>
          <div className="carousel-item active">

            <img src="https://source.unsplash.com/random/300×300/?sandwitch" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Sandwitch" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="Pizza" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button></div></div>
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (<div className='row mb-3'>
                <div key={data.id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {fooditem !== [] ? fooditem.filter((item) => (item.CategoryName === data.CategoryName) &&(item.name.toLowerCase().includes(search.toString().toLowerCase())))
                  .map(filterItems => {
                    return (<div key={filterItems.id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem = {filterItems}
                      options={filterItems.options[0]}
                      > </Card></div>)
                  
                    }
                    ) : <div>NOT SUCH DATA FOUND</div>} </div>)
            }) : " "}

      </div >
      <div className='m-4'><Footer /></div>
    </div>
  )
}

