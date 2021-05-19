const express = require('express')
const router  = express.Router()
const Toilet = require('../models/toilets')



//get one
router.get('/', async (req,res) => {
    try {
        const toilets = await Toilet.find()
        res.json(toilets)
    } catch (error) {
        res.status(500).json({message : error.message})        
    }
})


//get one 
router.get('/:id', getToilet, async (req,res) => {
    console.log(res.toilet);
})


router.post("/", async (req,res) => {
 
    const toilet = new Toilet({
        name : req.body.name,
        location : req.body.location,
        hasBidet : req.body.hasBidet,
        rating : req.body.rating,
        lat : req.body.lat,
        lng : req.body.lng
    })

    try {
        const newToilet = await toilet.save()
        res.status(201).json(newToilet)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})


router.patch("/:id", getToilet, async (req,res) => {
    //toilet stored inside res.toilet
    if (req.body.name){
        res.toilet.name = req.body.name
    }
    if (req.body.location){
        res.toilet.location = req.body.location
    }
    if (req.body.lat){
        res.toilet.lat = req.body.lat
    }
    if (req.body.lng){
        res.toilet.lng = req.body.lng
    }
    if (req.body.rating){
        res.toilet.rating = req.body.rating
    }
    if (req.body.hsBidet){
        res.toilet.hasBidet = req.body.hasBidet
    }

    try {
        const updatedToilet = await res.toilet.save()
        res.json(updatedToilet)
    } catch (error) {
        res.status(400).json({message : error.message})
    }
    


})

router.delete("/:id", getToilet, async (req,res) => {
    try {
        await res.toilet.remove()
        res.json({message : "deleted toilet"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


//middleware to find toilet  
async function getToilet(req,res,next) {
    res.toilet = null
    try {
        res.toilet = await Toilet.findById(req.params.id)
        if (!res.toilet){
            return res.status(404).json({message : "cannot find toilet"})
        }

    } catch (error) {
        return res.status(500).json({message : error.message})
    }
    next()
}


module.exports = router