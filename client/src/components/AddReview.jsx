import React, { useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const AddReview = () => {
    const {id} = useParams();
    const[name,setName] = useState("");
    const[reviewText,setReviewText] = useState("");
    const[rating,setRating] = useState("Rating");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`,{
                name,
                review: reviewText,
                rating
            });
            console.log(response);
            window.location.reload();
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="mb-2">
        <form action="">
            <div className="form-row">
                <div className="form-group col-8">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className='form-control' id='name' placeholder='Name' />
                </div>
                <div className='form-group col-4'>
                    <label htmlFor="rating">Rating</label>
                    <select id="rating" value={rating} onChange={e => setRating(e.target.value)}  name="rating" className='custom-select'>
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                </div>
            </div>
            <div className="form-group">
                <label htmlFor="Review">Review</label>
                <textarea id="Review" value={reviewText} onChange={e => setReviewText(e.target.value)} className="form-control"></textarea>
            </div>
            <button type='submit' onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
        </form>
      
    </div>
  )
}

export default AddReview
