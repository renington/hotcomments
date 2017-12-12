import React, { Component } from 'react'

class NewComment extends Component {
    constructor(props){
        super(props)

        this.handleEnter = this.handleEnter.bind(this)
    }

    handleEnter = (e) =>{
        if(e.keyCode === 13){
            this.props.postNewComment({
                comment: 'test'
            })
            e.preventDefault()
        }
    }

    render() {
        return (
            <div className="row">
                <textarea placeholder="Send Comment" className="form-control" onKeyDown={this.handleEnter}></textarea>
            </div>
        )
    }
}

export default NewComment