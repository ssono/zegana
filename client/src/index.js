import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import Posts from './pages/posts';
import NewIdea from './pages/newIdea';
import Idea from './pages/idea';
import Profile from './pages/profile';
import MyIdeas from './pages/myIdeas';
import * as serviceWorker from './serviceWorker';


const routing = (
  <Router>
    <Route exact path="/" component={App}/>
    <Route exact path="/posts/:sorting/:page" component={Posts}/>
    <Route exact path="/newIdea" component={NewIdea}/>
    <Route exact path="/idea/:postId" component={Idea}/>
    <Route exact path="/account/profile" component={Profile}/>
    <Route exact path="/account/myIdeas/:sorting" component={MyIdeas}/>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
