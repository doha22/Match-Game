const { Timestamp } = require('bson');
var mongoose = require('mongoose');
const { type } = require('os');


const Schema = mongoose.Schema ;
require('mongoose-date-format')
let time = new Date
var MatchSchema = new Schema({

          homeTeam :{
            type: String,
            minlength : [3,'name must be at least 3 character long'] ,
          },
          awayTeam :{
            type: String,
            minlength : [3,'name must be at least 3 character long'] ,
          },
          startTime :{
           type:String

          },
          endTime :{

            type: String,
            // new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            
          },
          
          homeTeamScore :{
            type: Number,
            default:0
          },
          awayTeamScore :{
            type: Number,
            default:0
          },
          duration:{
            type: String,
            default :"01:15"
          },
          isActive:{
          type: Number,  // 0 is inactive , 1 active , 2 finished
          default: 0
          },
          league:{
            type: String,
            minlength : [3,'name must be at least 3 character long'] 
          },
      
     
    
});


const Match = mongoose.model('Match', MatchSchema);

module.exports = Match ;
