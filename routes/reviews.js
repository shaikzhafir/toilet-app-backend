const express = require("express");
const router = express.Router();
const Review = require("../models/reviews");
const Toilet = require("../models/toilets");

// get all
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get all review tagged to a toilet
router.get("/toilet", getReviewsOfToilet, async (req, res) => {
  res.json(res.reviews);
});

// get 1 by id
router.get("/:id", getReview, async (req, res) => {
  res.json(res.review);
});

// create new review
router.post("/", async (req, res) => {
  const review = new Review({
    reviewText: req.body.reviewText,
    toiletID: req.body.toiletID,
    date: req.body.date,
    rating: req.body.rating,
  });

  try {
    const newReview = await review.save();
    console.log(`id is ${req.body.toiletID}, rating is  ${req.body.rating}`);
    let newRating = await calculateAverageRating(req.body.toiletID, req.body.rating);
    console.log(newRating);
    res.status(201).json({newReview,newRating});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete
router.delete("/:id", getReview, async (req, res) => {
  try {
    await res.review.remove();
    res.json({ message: "deleted review" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// middleware to find reviews
async function getReview(req, res, next) {
  res.review = null;
  try {
    res.review = await Review.findById(req.params.id);
    if (!res.review) {
      return res.status(404).json({ message: "cannot find review" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
}

// middleware to find all reviews associated with a toilet
async function getReviewsOfToilet(req, res, next) {
  res.reviews = null;
  res.toilet = null;
  try {
    res.toilet = await Toilet.findById(req.query.toiletID);
    if (!res.toilet) {
      return res.status(404).json({ message: "cannot find toilet" });
    }
    res.reviews = await Review.find({ toiletID: res.toilet._id });
    console.log(res.reviews);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
}

async function calculateAverageRating(toiletID, newRating) {
  //find the toilet with the rating
    const toilet = await Toilet.findById(toiletID);
    // multiply averageRating by numRating
    //add current rating to the result add 1 to numRating
    //divide previous output by numRating
    if (toilet.numRating == 0 && toilet.rating == 0) {
      toilet.numRating = 1;
      toilet.rating = newRating;
      await toilet.save();
      return toilet.rating 
    } else {
      console.log(`sum is ${toilet}`);
      let sumRating = toilet.numRating * toilet.rating;
      toilet.numRating += 1;
      toilet.rating = ((sumRating + newRating) / toilet.numRating).toFixed(2);
      await toilet.save();
      return toilet.rating
    }


}

module.exports = router;
