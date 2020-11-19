
import React, { Component } from 'react';
import axios from 'axios';
//import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css';
import {Form ,InputGroup ,FormControl ,Button, Card} from "react-bootstrap"


export default class modifyMatch extends Component {

    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this)

        this.M_id  = this.props.location.M_id

        this.onChangeendTime = this.onChangeendTime.bind(this);
        this.onChangehomeTeamScore = this.onChangehomeTeamScore.bind(this);
        this.onChangeawayTeamScore = this.onChangeawayTeamScore.bind(this);
        this.onChangeisActive = this.onChangeisActive.bind(this);

      

        




        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            
            endTime:'',
            homeTeamScore:'',
            awayTeamScore:'',
            isActive : ''

        }
    }

    componentDidMount(){

    // console.log(this.state.startTime) 
    console.log("id = "+this.M_id)


    }

    checkDate=()=>{
   

    var myRegExp=/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
//    var date="2015-01-01 10:10";

      if(this.state.endTime.match(myRegExp)){
         console.log("Good format");
         return true
}
     return false
        
     
    }


     routeChange = () =>{ 
    // redirect to home page 
    this.props.history.push("/");
  }

    
  onChangeisActive(e){
    this.setState({ 
        isActive: e.target.value 
    }) 
  }


    onChangeendTime(e){
        this.setState({ 
            endTime: e.target.value 
        })
    }

    onChangehomeTeamScore(e){
        this.setState({ 
            homeTeamScore: e.target.value 
        })
    }

    onChangeawayTeamScore(e){
        this.setState({ 
            awayTeamScore: e.target.value 
        })
    }

   

    onSubmit(e) {
        e.preventDefault()

        // check the format date before submitting form
          let  check =  this.checkDate()
        if(check=== false){
           
            alert("Date Format is not True")
         }else{
            
         

        const result = {
            homeTeamScore : this.state.homeTeamScore,
            awayTeamScore : this.state.awayTeamScore,
            endTime : this.state.endTime,
            isActive : this.state.isActive
 
             }
        
        axios.put("http://localhost:8088/update/"+this.M_id, (result)) 
        .then((response) => {
           
              console.log("updated")
           this.routeChange();
        })
        .catch((err) => {
            // console.log(err);
            if (
              err &&
              err.response &&
              err.response.data &&
              err.response.data.message
            )
             console.log( err.response.data.message)
          })
        } 
    }



    render() {
        return (
<div className="container">
                 
<div className="card">
<Form onSubmit={this.onSubmit}  method="post">
  


  <Form.Group >
    <Form.Label>End Match Time</Form.Label>
    <Form.Control type="text" placeholder="YYYY-MM-DD HH:MM "
    value={this.state.endTime}
    onChange={this.onChangeendTime}  required />
  </Form.Group>

  <Form.Group >
    <Form.Label>Home Team Score</Form.Label>
    <Form.Control type="number" placeholder="Enter homeTeamScore"
    value={this.state.homeTeamScore}
    onChange={this.onChangehomeTeamScore}  required />
  </Form.Group>

  <Form.Group >
    <Form.Label>Away Team Score</Form.Label>
    <Form.Control type="number" placeholder="Enter awayTeamScore"
    value={this.state.awayTeamScore}
    onChange={this.onChangeawayTeamScore}  required />
  </Form.Group>

  <Form.Group >
    <Form.Label>Is Active</Form.Label>
    <Form.Control type="text" placeholder="Enter league"
    value={this.state.isActive}
    onChange={this.onChangeisActive}  required />
  </Form.Group>

  

    

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>

        </div>
 );
}
}


