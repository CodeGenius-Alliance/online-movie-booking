const asyncHandler=require('express-async-handler');
const Screens=require('../models/screenModel');
const Movies=require('../models/MovieModule');

const addScreen=asyncHandler(async(req,res)=>{
    const {screen_id,movie_id,no_of_seats,date,time}=req.body;
    try{
        if(!screen_id||!movie_id||!date||!time||!no_of_seats){
            return res.status(401).send("All fields are mandatory");
        }
        const chk=await Movies.findOne({"movie_id":movie_id});
        if(!chk){
            return res.status(409).send("Movie id does'nt exists");
        }
        var seats=new Array(no_of_seats);
        seats.fill(0);
        await Screens.create({"screen_id":screen_id,"movie_id":movie_id,"movie_name":chk.movie_name,"no_of_seats":no_of_seats,"status":true,"seats":seats,"date":date,"time":time});
        res.status(200).send("Details added successfully");
    }
    catch(e){
        res.status(400).json({e});
    }
})

const getScreen=asyncHandler(async(req,res)=>{
    const {screen_id}=req.body;
    try{
        if(!screen_id){
            return res.status(400).send("Mention Screen id");
        }
        const chk=await Screens.findOne({"screen_id":screen_id});
        if(!chk){
            return res.status(400).send("No screens exists on that id");
        }
        const info=await Screens.aggregate([
            {
                $lookup: {
                    from: "movies",
                    localField: "movie_id",
                    foreignField: "movie_id",
                    as: "screenDetails"
                }
            },
            {$unwind:"$screenDetails",
           },
            {
                $project:{
                    _id:0,
                    movie_id:1,
                    screen_id:1,
                    movie_name:`$screenDetails.title`,
                    no_of_seats:1,
                    date:1,
                    time:1,
                    status:1,
                    seats:1,   
                }
            }
        ])
        res.status(200).send(info)
    }
    catch(e){
        res.status(400).json(e);
        console.log(e);
    }
})

const editScreen=asyncHandler(async(req,res)=>{
    const {screen_id,movie_id,date,time}=req.body;
    try{
        if(!screen_id||!movie_id||!date||!time){
            return res.status(400).send("All fields are mandatory");
        }
        const chk=await Screens.findOne({"screen_id":screen_id});
        if(!chk){
            return res.status(409).send("No Screen exists on that id");
        }
        if(chk.status){
            return res.status(409).send("Remove screen before editing..");
        }
        const flag=await Movies.findOne({"movie_id":movie_id});
        if(!flag){
            return res.status(409).send("No movie exists on that id");
        }
        let seats=new Array(60);
        seats.fill(0);
        await Screens.updateOne({"screen_id":screen_id},{$set:{"movie_id":movie_id,"movie_name":flag.movie_name,"seats":seats,"no_of_seats":60,"date":date,"status":true,"time":time}});
        res.status(200).send("Screen Updated successfully");
    }
    catch(e){
        res.status(400).json({e});
    }
})
const removeScreen=asyncHandler(async(req,res)=>{
    const {screen_id}=req.body;
    try{
        if(!screen_id){
            return res.status(400).send("Mention screen id");
        }
        await Screens.updateOne({"screen_id":screen_id},{$set:{"status":false}});
        res.status(200).send("Screen removed successfully");
    }
    catch(e){
        res.status(400).json({e});
    }
})

module.exports={addScreen,getScreen,editScreen,removeScreen};