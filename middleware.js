const Listings = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js")
const { listingSchema ,reviewSchema } = require("./schema.js");
const review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next)=>{
    // isAuthenticated() is used to authencate user it check user in the session is logged in or not req.authenticated() method is define in 
    if(!req.isAuthenticated()){
    req.session.redirectUrl= req.originalUrl;
req.flash("error","you must be logged in to create listings")
     return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl= (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}


module.exports.isOwner =async (req,res,next)=>{
    let {id} = req.params;
    let listings = await Listings.findById(id);
    if(!listings.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


//schema validation on server side creating middleware as passing as function to post route for error handling

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error)
    } else {
        next();
    }
}

// serverside validation for reviewSchema 

module.exports.validateReview =(req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
throw new ExpressError(400,error)
    }else{
        next();
    }
}

// middleware to validate the right author who created this rating and he only can delete created rating

module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id,reviewId}= req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
next();
}