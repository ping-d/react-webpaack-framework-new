import React from 'react'
import './home.scss'
class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<div>
            this is home page
            {this.props.children}
        </div>)
    }
}

module.exports = Home