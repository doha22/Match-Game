const { query } = require("express");
const mongoose = require("mongoose");
const Match = require("../models/match");
const match = mongoose.model("Match");

exports.createNewMatch = async (req, res) => {
    const { homeTeam ,awayTeam ,startTime,endTime,duration,homeTeamScore,awayTeamScore,isActive,league} = req.body;
    // try{
    const match = new Match({
        homeTeam,
        awayTeam,
        startTime,
        endTime,
        // homeTeamScore,
        // awayTeamScore,
        league
    });
  
    await match.save();
  
    res.status(200).json({
      message: "match created!",
    });

//} 
//  catch
  };


  //get all matches 
//   exports.getAllMatches = async (req, res) => {
//     const matches = await Match.find(
//         {'$group': 'startTime'});
  
//     res.status(200).json(matches);
//   };

  exports.getAllMatches = async (req, res) => {
    Match.find(function (err, data) {
    if (err) {
    console.log(err);
    }
    else {
    res.json(data);
    }
    } ,{'$group': 'startTime'} ).sort({startTime:-1});
}
// group by starttime and sort in asc order
   


 



// filter by teamname 
// default value of isActive = 0 means is not active now 
// when value = 1 , means is active now
// when value = 2 ,means is finished 
exports.updateMatches = async (req, res) => {
    if (!(req.params.id))
    return res.status(400).send('No record with given id : ' + req.params.id)

   
         var updatedRecord = {
        //  homeTeam : req.body.homeTeam,
        //  awayTeam : req.body.awayTeam,
        //  startTime : req.body.startTime,
         endTime : req.body.endTime,
         homeTeamScore : req.body.homeTeamScore,
         awayTeamScore : req.body.awayTeamScore ,
         isActive: req.body.isActive
        //  league : req.body.awayTeam
     
    }

    Match.updateMany({_id: req.params.id}, updatedRecord ,{new:true}, (err, docs) => {
        if (!err) res.status(200).send(docs)
        else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
    })


}


// filter by team name 
  // here search if awayTeam or homeTeam name as team name
exports.filterTeamNameMatches = async (req, res) => {
    
  
        Match.find(
        //     {"awayTeam": req.body.awayTeam,
        //    }
        {
            $or: [
                   { "awayTeam" : req.body.awayTeam },
                   { "homeTeam": req.body.homeTeam} 
                 ]
          }
           
        
         , function (err,data) {
            if (err) {
                err.status = 404;
                return next(err);
            }
            console.log(data)
            return res.status(200).json({
                message: ' success.',
                data:data
            })
        })

}    

// filter by date 

exports.filterDateMatches = async (req, res) => {
    console.log(req.body.startTime)
    //    var date = req.body.startTime  // get the date 
    // var date = req.body.startTime
    //   var d = date.slice(0,10);

    // console.log("starttime = "+d)
    // if(Match.startTime ==req.body.startTime ){
    Match.find(
        // {"startTime":{ $gte:req.body.startTime, $lt:req.body.startTime}},
        // {"awayTeam": req.body.awayTeam}
        // {"startTime": {$lte:"2020:11:19", $gte:"2020:11:20"}},
    
      function (err,data) {
        if (err) {
            err.status = 406;
            return next(err);
        }
        console.log(data)
        return res.status(201).json({
            message: ' success.',
            data:data
        })
    })
// }else{
//     console.log("no matches with that date")
// }

}  
