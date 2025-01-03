require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json())


//get all restaurants
app.get("/api/v1/restaurants", async (req,res) =>
{
    try{
        const results = await db.query("select * from restaurants");
        const restaurantsRatingData = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), " +
            "TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
        res.json({
            status : "success",
            results: restaurantsRatingData.rows.length,
            data:{restaurants : restaurantsRatingData.rows}}
            )
    }catch(err){
        console.log(err);
    }
    
});

//get one restaurant
app.get("/api/v1/restaurants/:id", async (req,res) =>{
    try{
        const results = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), " +
            "TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1", [req.params.id]);
        console.log(results.rows);

        const reviews  = await db.query("select * from reviews where restaurant_id = $1",[req.params.id]);
        console.log(results.rows);
        res.json({
            status : "success",
            results: results.rows.length,
            data:{restaurants : results.rows,
                reviews : reviews.rows
            }}
            )
    }catch(err){
        console.log(err);
    }
}   
);

//create restaurant
app.post("/api/v1/restaurants", async (req,res) =>{
    try{
        const results = await db.query("INSERT INTO restaurants(name,location,price_range) VALUES ($1, $2, $3) returning *",[req.body.name, req.body.location, req.body.price_range]);
        console.log(results.rows);
        res.status(201).json({
            status : "success",
            data:{restaurants : results.rows}}
            )
    }catch(err){
        console.log(err);
    }
}   
);

//update restaurant
app.put("/api/v1/restaurants/:id", async (req,res) =>{
    try{
        const results = await db.query("UPDATE restaurants SET name = $1,location = $2,price_range= $3 where id = $4 returning *",[req.body.name, req.body.location, req.body.price_range,req.params.id]);
        console.log(results.rows);
        res.json({
            status : "success",
            data:{restaurants : results.rows}}
            )
    }catch(err){
        console.log(err);
    }
}   
);

//Delete restaurant
app.delete("/api/v1/restaurants/:id", async (req,res) =>{
    try{
        const results = await db.query("DELETE FROM restaurants WHERE id = $1 returning *",[req.params.id]);
        console.log(results.rows);
        res.status(200).json({
            status : "success",
            data:{restaurants : results.rows}}
            )
    }catch(err){
        console.log(err);
    }
}   
);

//Delete restaurant
app.post("/api/v1/restaurants/:id/addReview", async (req,res) =>{
    try{
        const results = await db.query("INSERT INTO reviews(restaurant_id, name,review,rating) VALUES ($1, $2, $3, $4) returning *",[req.params.id, req.body.name, req.body.review, req.body.rating]);
        console.log(results.rows);
        res.status(200).json({
            status : "success",
            data:{review : results.rows[0]}}
            )
    }catch(err){
        console.log(err);
    }
}   
);

const port = process.env.PORT || 3001;
app.listen(port, () =>(
    console.log(`server is up and listening on port ${port}`)
));

