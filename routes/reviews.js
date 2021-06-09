const express = require('express')
const router = express.Router()
const Review = require('../models/reviews')

// get all 
router.get('/', async (req, res) => {
    try{
        const reviews = await Review.find()
        res.json(reviews)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get 1 by id
router.get('/:id', getReview, async(req, res) => {
    res.json(res.review)
})

// create new review
router.post('/', async (req,res) => {

    const review = new Review({
        reviewText: req.body.reviewText,
        toiletID: req.body.toiletID,
        date: req.body.date
    })

    try{
        const newReview = await review.save()
        res.status(201).json(newReview)
    } catch(error){
        res.status(400).json({message: error.message})
    }
})

// delete
router.delete("/:id", getReview, async (req,res) => {
    try {
        await res.review.remove()
        res.json({message : "deleted review"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// middleware to find reviews
async function getReview(req, res, next) {
    res.review = null
    try {
        res.review = await Review.findById(req.params.id)
        if(!res.review){
            return res.status(404).json({message: "cannot find review"})
        }
    }catch (error){
        return res.status(500).json({message: error.message})
    }
    next()
}

module.exports = router