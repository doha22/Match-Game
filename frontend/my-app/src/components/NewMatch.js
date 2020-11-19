
import React, { Component } from 'react';
import axios from 'axios';
//import { BrowserRouter, Route } from 'react-router-dom'
import '../App.css';
import {Form ,InputGroup ,FormControl ,Button, Card} from "react-bootstrap"


export default class NewMatch extends Component {

    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this)

        this.onChangehomeTeam = this.onChangehomeTeam.bind(this);
        this.onChangeawayTeam = this.onChangeawayTeam.bind(this);
        this.onChangestartTime = this.onChangestartTime.bind(this);
        this.onChangeendTime = this.onChangeendTime.bind(this);
        // this.onChangehomeTeamScore = this.onChangehomeTeamScore.bind(this);
        // this.onChangeawayTeamScore = this.onChangeawayTeamScore.bind(this);
        this.onChangeleague = this.onChangeleague.bind(this);

        // this.checkDate = this.checkDate.bind(this);

        




        this.onSubmit = this.onSubmit.bind(this);

        // this.onSubmitLogin = this.onSubmitLogin.bind(this);

        this.state = {
            homeTeam : '',
            awayTeam : '',
            startTime: '',
            endTime:'',
            // homeTeamScore:'',
            // awayTeamScore:'',
            league:''

        }
    }

    componentDidMount(){

    console.log(this.state.startTime) 


    }

    checkDate=()=>{
   

    var myRegExp=/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
//    var date="2015-01-01 10:10";

      if(this.state.startTime.match(myRegExp)){
         console.log("Good format");
         return true
}
     return false
        
     
    }


     routeChange = () =>{ 
    
    this.props.history.push("/");
  }

    onChangehomeTeam(e) {
        this.setState({ 
            homeTeam: e.target.value 
        })
    }

    onChangeawayTeam(e) {
        this.setState({ 
            awayTeam: e.target.value 
        })
    }

    onChangestartTime(e) {
        this.setState({ 
            startTime: e.target.value 
        })

    }

    onChangeendTime(e){
        this.setState({ 
            endTime: e.target.value 
        })
    }

    // onChangehomeTeamScore(e){
    //     this.setState({ 
    //         homeTeamScore: e.target.value 
    //     })
    // }

    // onChangeawayTeamScore(e){
    //     this.setState({ 
    //         awayTeamScore: e.target.value 
    //     })
    // }

    onChangeleague(e){
        this.setState({ 
            league: e.target.value 
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
            homeTeam : this.state.homeTeam ,
            awayTeam: this.state.awayTeam,
            startTime : this.state.startTime,
            endTime : this.state.endTime,
            league : this.state.league
 
             }
         
        axios.post("http://localhost:8088/api/new", (result)) 
        .then((response) => {
           
              console.log("created")
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
    <Form.Label>homeTeam</Form.Label>
    <Form.Control type="text" placeholder="Enter homeTeam"
    value={this.state.homeTeam}
    onChange={this.onChangehomeTeam}  required />
  </Form.Group>

  <Form.Group >
    <Form.Label>awayTeam</Form.Label>
    <Form.Control type="text" placeholder="Enter awayTeam"
    value={this.state.awayTeam}
    onChange={this.onChangeawayTeam}  required />
  </Form.Group>

  <Form.Group >
    <Form.Label>startTime</Form.Label>
    <Form.Control type="text" placeholder="YYYY-MM-DD HH:MM"
    value={this.state.startTime}
    onChange={this.onChangestartTime}  required />
  </Form.Group>

  <Form.Group >
    <Form.Label>endTime</Form.Label>
    <Form.Control type="text" placeholder="YYYY-MM-DD HH:MM "
    value={this.state.endTime}
    onChange={this.onChangeendTime}  required />
  </Form.Group>

  {/* <Form.Group >
    <Form.Label>homeTeamScore</Form.Label>
    <Form.Control type="number" placeholder="Enter homeTeamScore"
    value={this.state.homeTeamScore}
    onChange={this.onChangehomeTeamScore}  required />
  </Form.Group> */}

  {/* <Form.Group >
    <Form.Label>awayTeamScore</Form.Label>
    <Form.Control type="number" placeholder="Enter awayTeamScore"
    value={this.state.awayTeamScore}
    onChange={this.onChangeawayTeamScore}  required />
  </Form.Group> */}

  <Form.Group >
    <Form.Label>league</Form.Label>
    <Form.Control type="text" placeholder="Enter league"
    value={this.state.league}
    onChange={this.onChangeleague}  required />
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

// export default FormPage;
