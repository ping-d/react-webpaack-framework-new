import React from 'react'
import { render } from 'react-dom'

import Home from './home/home.jsx'
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory } from 'react-router'

const PageOne = function(nextState, cb){require.ensure([], (require) => {cb(null, require('./page1/pageone.jsx'))},'PageOne')};
const Page2 = function(nextState, cb){require.ensure([], (require) => {cb(null, require('./page2/page2.jsx'))},'Page2')};


import './index.css'

class App extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(<div>
            <p> Hello World</p>
            {this.props.children}
        </div>)
    }
}

render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="page1" getComponent={ PageOne } />
            <Route path="page2" getComponent={ Page2 } />

        </Route>
    </Router>
), document.getElementById("app-root"))

