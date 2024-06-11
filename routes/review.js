const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js");


//Review 
//post route 
// when user rate and submit the form from show route we will get the request at this route and we use request body data and add in database and send some in response

router.post("/",isLoggedIn ,validateReview,wrapAsync(reviewControllers.createReview));

//Delete review route 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));


module.exports = router;