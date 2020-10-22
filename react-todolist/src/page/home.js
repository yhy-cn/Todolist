import React, { Component } from 'react'

export default class home extends Component {
    render() {
        return (
            <div >
             <button onClick={()=>this.props.history.push('/todolist')}>jump</button>
            </div>
        )
    }
}
