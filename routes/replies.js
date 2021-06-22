const express = require("express");
const router = express.Router();
const Review = require("../models/reviews");
const Toilet = require("../models/toilets");
const Reply = require("../models/replies");
const { restart } = require("nodemon");

// get all
router.get("/", async(req, res) => {
    try{
        // finding all replies
        const replies = await Replies.find(); 
        // convert replies into json, return as a response
        res.json(replies)
    }catch (error){
        res.status(500).json({message: error.message})
    }
})

// get all replies tagged to a review
router.get("/:reviewID" ,async(req, res)=> {
    // google this
    console.log(req.params.reviewID)

    // then return the replies that have the review id, e.g. getReviewsOfToilet

    const replies = await Reply.find({reviewID: req.params.reviewID})

    // add it into response body
    res.json(replies)
}) 

// posting replies
router.post("/", async(req, res) => {
    console.log(req.body)
    const reply = new Reply({
        replyText: req.body.replyText,
        reviewID: req.body.reviewID,
        date: req.body.date,
    })

    try {
        // saving data into dB
        const newReply = await reply.save();
        console.log(newReply)
        res.status(201).json({newReply})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;