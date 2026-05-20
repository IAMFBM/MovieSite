import mongodb from "mongodb";
import { error } from "node:console";

const ObjectId = mongodb.ObjectId;

export default class ReviewDAO
{
    static reviewsCollection = null;

    static async injectDB(client)
    {
        console.log("injectDB called, client:", client ? "exists" : "undefined");
        console.log("this.reviewsCollection before:", this.reviewsCollection);
        
        if(this.reviewsCollection) {
            console.log("Collection already injected, returning");
            return;
        }
        try
        {
        this.reviewsCollection = await client.db("review").collection("review");
        console.log("ReviewDAO injected successfully");
        console.log("this.reviewsCollection after:", this.reviewsCollection ? "set" : "null");
        }
    
        catch(e)
        {
          console.error(`Unable to connect to database, ${e}`);
        }
    }

    static async AddReview(MovieId,User,Review)
    {
        try
        {
         console.log("AddReview called");
         console.log("this.reviewsCollection in AddReview:", this.reviewsCollection);
         
         const reviewDOcument = 
         {
            MovieId:MovieId,
            User:User,
            ReviewContent:Review
         }
         
         console.log("Inserting review:", reviewDOcument);
         const result = await this.reviewsCollection.insertOne(reviewDOcument);
         console.log("Review inserted successfully:", result);
         return result;
        }
        catch(e)
        {
          console.error(`Unable to post Review,${e}`)
          return{error:e}
        }
    }

    static async GetReviewByReviewID(ReviewId)
    {
        try
        {           
        const reviewOutput = await this.reviewsCollection.findOne({_id: new ObjectId(ReviewId)});
          
         console.log("ReviewOutput in GetReviewByReviewID after:", reviewOutput);
          return reviewOutput;
          console.log("happened");
        }
        catch(e)
        {
            console.error(`Review not available!,${e}`)
            return{error:e}
        }
    }

    static async UpdateReview(ReviewId,User,Review)
    {
        try
        {
          /*  const UpdateDoc =
            {
              ReviewId:ReviewId,
              User:User ,
              NewReview : Review
            }*/
             return await this.reviewsCollection.updateOne({ _id: new ObjectId(ReviewId) }, { $set: { User: User,ReviewContent: Review } })

        }
        catch(e)
        {
            console.error(`Unable to update Review,${e} `);
            return{error:e};
        }
    }

     static async DeleteReview(ReviewId)
    {
        try
        {
          /*  const UpdateDoc =
            {
              ReviewId:ReviewId,
              User:User ,
              NewReview : Review
            }*/
             return await this.reviewsCollection.deleteOne({ _id: new ObjectId(ReviewId) })

        }
        catch(e)
        {
            console.error(`Unable to delete Review,${e} `);
            return{error:e};
        }
    }

     static async GetReviewsByMovieId(MovieId)
    {
        try
        {
          /*  const UpdateDoc =
            {
              ReviewId:ReviewId,
              User:User ,
              NewReview : Review
            }*/
             const cursor = await this.reviewsCollection.find({ MovieId:parseInt(MovieId) })
             return cursor.toArray()

        }
        catch(e)
        {
            console.error(`Unable to delete Review,${e} `);
            return{error:e};
        }
    }
}