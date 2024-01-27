const EventModel=require("../../../models/event_model");

const SearchEvent=async(req,res)=>{

    try{
        
        const postTitle=req.body.values.searchTitle;
        console.log(postTitle);
        if(!postTitle){
            return res.status(400).json({error:"Invalid Post Title"});
        }
        const regex = new RegExp(postTitle, 'i');
        const MatchingEvents = await EventModel.find({ postTitle: { $regex: regex } }).populate({
            path: 'postedBy',
            model: 'User',
            select: 'rollnum name email profilepicture',
          });

        if(MatchingEvents?.length==0){
            console.log()
            return res.status(404).json({message:"No Matching Records"});
        }
        res.status(200).json({MatchingEvents,message:"Search Successful"});
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});
    }
}


module.exports=SearchEvent;