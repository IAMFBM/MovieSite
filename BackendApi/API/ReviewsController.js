import { error } from "node:console";
import ReviewsDAO from "./dao/ReviewsDAO.js";

export default class ReviewsController
{
    static async apiPostReview(req,res,next)
    {
        try
        {
           const MovieId = req.body.movieId;
           const Review = req.body.review;  
           const User = req.body.user;

           const ReviewPostRes = await ReviewsDAO.AddReview(MovieId,User,Review);
           res.json({status : " Success! "})
        }
        catch(e)
        {
            res.status(500).json({error: e.message});
        };
    };

    static async apiGetReview(req,res,next)
    {
        try
        {
        let ReviewId = req.params.id || {};
                     
         let Review = await ReviewsDAO.GetReviewByReviewID(ReviewId);
         
         

         if(!Review)
           {
                res.status(404).json({error:"unable to retrieve review"});
                return;
           }

           res.json(Review);
       }
        catch(e)
        {
            console.log(`Api Error, ${e}`);
            res.status(500).json({error:e.message});
        }

    }

    static async ApiDeleteReview(req,res,next)
    {
        try
        {
        const DelReviewId = req.params.id;
        const DelResults = await ReviewsDAO.DeleteReview(DelReviewId);
         
       /* if(!DelResults)
        {
            res.status(404).json({error:"Delete Failed"})
            return
        }*/



            res.json({status:"Delete Success!"})

        }
        catch(e)
        {
            res.status(500).json({error:e.message});
        }

    }

        static async ApiUpdateReview(req,res,next)
        {
            try
            {
                const ReviewId = req.params.id;
                const Review = req.body.review;
                const User = req.body.user;
                const UpdateResults = await ReviewsDAO.UpdateReview(ReviewId,User,Review);

                /*if(!UpdateResults)
                {
                    res.status(404).json({error:"Update Failed"})
                    return
                }*/  

                var {error} = UpdateResults; 
                if(error) 
                {
                    res.status(400).json({error});
                 }    

                if(UpdateResults.modifiedCount === 0)
                {
                    throw new Error("Unable to update review - user may not be original poster");
                } 
                    
                res.json({status:"Update Success!"})
            } 
            catch(e)
            {
                res.status(500).json({error:e.message});
            }   
        };

    static async ApiGetReviewsOfMovie(req,res,next)
    {
        try
        {
            const MovieId = req.params.id || {};
            const Reviews = await ReviewsDAO.GetReviewsByMovieId(MovieId);
            if(!Reviews)
            {
                res.status(404).json({error:"Reviews not found"});
                return;
            }
            res.json(Reviews);
        }
        catch(e)
        {
            res.status(500).json({error:e.message});
        }
    }    
};