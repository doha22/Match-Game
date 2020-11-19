import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router ,Route} from "react-router-dom";
import Home from './components/listMatches'
import NewMatch from './components/NewMatch'

import Example from './components/example'
import modifyMatch from './components/modifyMatch'

function App() {
    return (
      <Router>
  
    
        <Route path="/" component={Home} exact />
        <Route path="/new" component={NewMatch} exact />

        <Route path="/test" component={Example} exact />

        <Route path="/modify" component={modifyMatch} exact />




        
  
  
  
  
        
  
       
  
  
      </Router>
  );
}

export default App;
