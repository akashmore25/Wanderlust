const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js")

// step 4|| creating basic schema for for listing model defining basic struture
const listningSchema = new Schema({
   title:{
    type: String,
    requied:true,
},
   description:String,
   image:{
    url:{
        type:String,
        default: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v==="" ?"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    filename: {
        type:String,
    }
   },
   price: Number,
   location:String,
   country:String,  
   reviews:[
    {
        type: Schema.Types.ObjectId,
        ref:"Review",
    },
   ],

   owner:{
    type:Schema.Types.ObjectId,
    ref: "User",
   } ,
   geometry:{
    type:{
       type: String,
        enum:['Point'],
        required:true,
    },
    coordinates:{
type:[Number],
required:true,
    },
   },
});

 //when any listing will be delete then we will delete all the ratings related to that listing from are db

 listningSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
 })

// step 5|| by using schema we have created model as listing which will be listings in our db as collection
const Listing = mongoose.model("Listing",listningSchema);


//step 6 || exporting the modules to app.js
module.exports = Listing;