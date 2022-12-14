import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
//inside the render() we cannot change the state of component
// There are two endpoints for the newsapi i.e, everything and top-headlines and we will hit top headlines
const App = ()=> {
  const pageSize = 5;  //This indicates no of items that will be displayed on one page
  const apiKey = process.env.REACT_APP_NEWS_API
  // const apiKey="5a41596f2241456dac856de7c2853e01"
  //.env this is environmental variable.And we can create our environemnt variable and use them that start with REACT_APP and this is also added in gitignore
  const [progress, setProgress] = useState(0)  // This is used to change the progess of our top loading bar
  // useState hook is used to set the initial value of state
 
    return (
      <div>
        <Router>
        <NavBar/> 
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}   // this denoted the initial progess
      /> 
      {/* This is the loading bar which is used to indicate the progess of the loading page.Since in the single page application using react page do not reload then to keep the track of loading we keep top loading bar */}
      {/* And we will use loading bar only when we start application and also when we change category and not while loading news on infinite scroll */}
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/></Route> 
          {/* Key is used here to uniquely identify each component and its necessary to use it else we will not be able to load the news item of that particular category althoug without key we will see the changing title in the title bar */}
          <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/></Route> 
          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/></Route> 
          <Route exact path="/general"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/></Route> 
          <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/></Route> 
          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/></Route> 
          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/></Route> 
          <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/></Route> 
        </Switch>
        </Router>
      </div>
    )
 
}

export default App;