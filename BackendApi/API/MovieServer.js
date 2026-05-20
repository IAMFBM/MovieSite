import express from "express";
import cors from "cors";
import reviews from "./reviews.route.js";

const App_Server = express();

App_Server.use(cors());
App_Server.use(express.json())

App_Server.use("/api/v1/reviews", reviews);
App_Server.use(/.*/,(req,res) => res.status(404).json({error: "Not found"}));

export default App_Server;