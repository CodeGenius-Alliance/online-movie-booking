const asyncHandler=require('express-async-handler');
const Screens=require('../models/screenModel');
const Shows=require('../models/showModel')
const Movies=require('../models/MovieModule')


const addShows=asyncHandler(async(req,res)=>{ //fine
    const {show_id,screen_id,movie_id,date,time}=req.body;
    try{
        if(!show_id||!screen_id||!movie_id||!date||!time){
            return res.status(401).send("All fields are mandatory");
        }
        const chk_movie=await Movies.findOne({"movie_id":movie_id});
        if(!chk_movie){
            return res.status(404).send("Movie id does'nt exists");
        }
        const chk_screen=await Screens.findOne({"screen_id":screen_id});
        if(!chk_screen){
            return res.status(404).send("Screen id does'nt exists");
        }
        const flag=await Shows.find({$and:[{"screen_id":screen_id,"date":date,"time":time}]});
        if(flag.length>0){
            return res.status(409).send(`Screen with id${screen_id} already scheduled on that given date and time`)
        }
        var seats=new Array(chk_screen.no_of_seats);
        seats.fill(null);
        await Shows.create({"show_id":show_id,"screen_id":screen_id,"movie_id":movie_id,"no_of_seats":chk_screen.no_of_seats,"status":true,"seats":seats,"date":date,"time":time});
        res.status(200).send("Details added successfully");
    }
    catch(e){
        res.status(400).json({e});
    }
})

const getShow=asyncHandler(async(req,res)=>{
    const {show_id}=req.body;
    try{
        if(!show_id){
            return res.status(400).send("Mention Movie id");
        }
        const info=await Shows.find({"show_id":show_id});
        if(!info){
            return res.status(400).send("No shows exists on that id,check again");
        }
        
        res.status(200).send(info)
    }
    catch(e){
        res.status(400).json(e);
        console.log(e);
    }
})

const getShows=asyncHandler(async(req,res)=>{ //clarify
    try{
        const msg=await Movies.aggregate([
            {
                $lookup:{
                    from:"shows",
                    localField:"movie_id",
                    foreignField:"movie_id",
                    as:'showDetails'
                }
            },
            {$unwind:`$showDetails`},
            {$match:{"showDetails.status":true}},
            {
                $project:{
                    "__v":0,
                    "_id":0
                }
            }
        ]);
        res.status(200).send(msg)
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

const viewTicket=asyncHandler(async(req,res)=>{ //fine
    const {show_id}=req.body;
    if(!show_id){
        return res.status(400).send("Mention show id");
    }
    // const msg=await Bookings.find({"show_id":show_id});
    // res.status(200).json(msg) 
})


module.exports={addShows,getShow,getShows,viewTicket}