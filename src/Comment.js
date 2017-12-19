import React from 'react'

// functional stateless components
const Comment = props => 
    <p className="well">
        {props.comment.comment}  
        <b> by {props.comment.user.name}</b>
    </p>

export default Comment