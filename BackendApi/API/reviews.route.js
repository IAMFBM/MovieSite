import express from "express";
import ReviewsController  from "./ReviewsController.js";

const router =express.Router();

router.route("/movie/:id").get(ReviewsController.ApiGetReviewsOfMovie);
router.route("/new").post(ReviewsController.apiPostReview);
router.route("/:id")
.put(ReviewsController.ApiUpdateReview)
.delete(ReviewsController.ApiDeleteReview)
.get(ReviewsController.apiGetReview);

export default router;