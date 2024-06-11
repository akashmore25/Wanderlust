const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn ,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



//9.step|| we have created your main route as /listings route which which will display all listing on the page note that ./listings/index.ejs is important to set as render path beacuse in views-> listings is folder inside that ->index.ejs is file which we want to access and use
//  || INDEX ROUTE  ||
//12. step || when new listing form is submiited we will use that request body information to create new listing and add that listing into db and redirect to main page

router.route("/").get( wrapAsync(listingController.Index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));

// 11. step|| create new route which will display after clicking on new listing button new route will display for creating new listing //
// || NEW ROUTE ||
router.get("/new",isLoggedIn, listingController.renderNewForm);

//13. step|| this is edit route the user click on edit listing it will send get request  and display edit from page
// EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))

//14. step|| this is update route we will recevie put request to update listing from show route
// UPDATE ROUTE 
//15> step || this delete rooute which will delete listing when delete request come from 
// DELETE ROUTE
//10. step|| show route will display indivual listing after clicking it 
//   || SHOW ROUTE  ||

router.route("/:id").put(isLoggedIn,isOwner,upload.single("listing[image]"),  validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
.get( wrapAsync(listingController.showListing))


// 11. step|| create new route which will display after clicking on new listing button new route will display form for creating new listing
// || NEW ROUTE ||
// router.get("/new", listingController.renderNewForm);

module.exports = router;