import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
    const {id} = useParams();
    let navigate = useNavigate();
    const {restaurants} = useContext(RestaurantsContext);
    const [name ,setName] = useState("");
    const [location ,setLocation] = useState("");
    const [priceRange ,setPriceRange] = useState("");

    useEffect(() => {
        const fetchData = async() =>{
            const response = await RestaurantFinder.get(`/${id}`);
            console.log(response);
            setName(response.data.data.restaurants[0].name);
            setLocation(response.data.data.restaurants[0].location);
            setPriceRange(response.data.data.restaurants[0].price_range);

        }
        fetchData();
    },[])

    const handleSubmit =  async(e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range : priceRange
        });
        console.log(updatedRestaurant);
        navigate("/");
    };

  return (
    <div>
      <form action="">
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} id="name" className="form-control" type="text"/>
        </div>

        <div className="form-group">
            <label htmlFor="location">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} id="location" className="form-control" type="text"/>
        </div>

        <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number"/>
        </div>
      </form>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
    </div>
  )
}

export default UpdateRestaurant
