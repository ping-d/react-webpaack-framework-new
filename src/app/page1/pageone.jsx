import React from 'react'
import './page.scss'
class PageOne extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(<div className="page1">this is page 1</div>)
    }
}

module.exports = PageOne