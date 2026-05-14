import  review  from "./api/reviews.route.js";
import  express  from "express";
import cors  from "cors";

const A_Express= express(); 

A_Express.use(express.json());
A_Express.use(cors());


A_Express.use("/api//v1reviews", review);
FileSystemHandle

