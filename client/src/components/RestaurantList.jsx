import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';

const RestaurantList = (props) => {
    const {restaurants,setRestaurants} = useContext(RestaurantsContext);
    let navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
            const response =  await RestaurantFinder.get("/");
            setRestaurants(response.data.data.restaurants);
            console.log(response);
            } catch (err) {
              console.log(err);
            }
          })()

    },[])

    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            console.log(response);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
        }))
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async (id) => {
        navigate(`/restaurants/${id}/update`)
    }
  return (
    <div className="list-group">
      <table className="table table-dark table-hover">
        <thead>
            <tr className="bg-primary">
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price Range</th>
                <th scope="col">Ratings</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>    
        </thead>
        <tbody>
            {restaurants && restaurants.map(restaurant => {
                return(
                <tr key={restaurant.id}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{"$".repeat(restaurant.price_range)}</td>
                    <td>reviews</td>
                    <td><button onClick={() => handleUpdate(restaurant.id)} className="btn btn-warning">Update</button></td>
                    <td><button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger">Delete</button></td>
                </tr>)
            })}
             {/*<tr>
                <td>McDonalds</td>
                <td>New York</td>
                <td>$$</td>
                <td>Rating</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-danger">Delete</button></td>
             </tr>
             <tr>
                <td>McDonalds</td>
                <td>New York</td>
                <td>$$</td>
                <td>Rating</td>
                <td><button className="btn btn-warning">Update</button></td>
                <td><button className="btn btn-danger">Delete</button></td>
             </tr>*/}
         </tbody>
        
     </table>
    </div>
  )
}

export default RestaurantList
