import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this)
        this.onChangeValue= this.onChangeValue.bind(this)
        this.onSearch = this.onSearch.bind(this);



      

        this.state = {
         teamName:'',
     matches:[]
        
        }
      
    }
  
    onChangeValue(e){
        this.setState({ 
            teamName: e.target.value 

        })   
       
    }
    
    // only done the implementation and the result printed but not seen yet
    onSearch(e){
        e.preventDefault()
        const result = {
           
            awayTeam: this.state.teamName,
            homeTeam:this.state.teamName , 

             }

             axios.post("http://localhost:8088/api/search_team", (result)) 
             .then((response) => {
                
                   console.log(response)

                   return response
            
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
    
        componentDidMount(){
           
           
 
          
           ////////////////// show list of matches //////////////////////////////////
         
       console.log("-------"+this.state.teamName)

    if(this.state.teamName!='All'){
        console.log("not all")
    }

              axios.get("http://localhost:8088/api/All" ) 
              .then(
                response => {
                  
                  this.setState({ matches: response.data,
                 }
                 
                 )
                 
              }).catch((error) => {
                      console.log(error);
                    })
    
                }
          
                routeChange = () =>{ 
    
                    this.props.history.push("/new");
                  }

 

    // to list the matches
   rendermatches() {
    return this.state.matches.map(item => {
       let status = ''
        if(item.isActive === 0){
            status = 'not started' // need timer to alert before the match starts
        }
        else if(item.isActive === 1){
            status = 'Active Now'
        }
        else if(item.isActive === 2){
            status = 'finished'
        }

     
          

      
   

      
            return(
              <tr key={item._id}>
                  
                  <td > {item.homeTeam} </td>
                  <td > {item.homeTeamScore} </td>
                

                 
             
                   <td>{item.duration}</td>
                 <td>
                     
                 <span>{status}</span>   
                      
                      </td>
                 <td > {item.startTime} </td>

                   

                   
                  <td > {item.awayTeam} </td>
                  <td > {item.awayTeamScore} </td>



                  <td>
                  <Link
           to={
               { pathname:"/modify" , M_id : item._id
      }
    }
      >
             Modify 
              </Link> 
                  </td>

               

                 
              </tr>
            )
       
  
    })

 
    }
  
    
  
  

    render() {
       
        return (
        
<div className="container">
  
  <div className="row">
{/* not finished yet */}
      <div className="col-md-4">
      <form method="Post">
      <input type="text" placeholder="Team Name"></input>
      <button type="submit">Search</button>  
      </form>
      </div>
      <div className="col-md-2"></div>

<div className="col-md-4">
<form method="post" onSubmit={this.onSearch} > 

<select name="teamName"  onChange={this.onChangeValue}>
    <option>All</option>
    <option value="غانا">  غانا</option>
    <option value = " الارجنتين">الارجنتين</option>
    <option>..............</option>
    </select> 

      <button type="submit">Search</button>
      {this.state.teamName}
      </form>
</div>
     
<div className="col-md-2">
<button  onClick={this.routeChange}>Create New Match</button>
</div>

  </div>

<br></br>

    <div className="row">


<table className="table table-hover">
         
         <thead>
             <tr>
                 <td>homeTeam </td>
                 <td>homeTeam Score</td>
                
                 <td> duration :   </td>
                 <td>IsActive</td>
                 <td>Start Time</td>
                 <td>awayTeam</td>
                 <td>awayTeamScore</td>
                 <td>modify</td>

             </tr>
         </thead>
         <tbody>
          {this.rendermatches()} 

          </tbody>
        </table>




</div>

   </div>

 );
}
}