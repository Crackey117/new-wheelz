import React from "react"

const CommentsList = (props) => {
  let comments = ""

  if(props.comments.length > 0) { 
    comments = props.comments.map(comment => {
      return (
      <div className="callout cell small-12 bordered pink-background third-width">
        <p>{comment.body}</p>
      </div>)
    })
  }

  return (
  <div>
    <div className="grid-x grid-margin-x third-width">
      {comments} 
    </div> 
  </div>
  )
}

export default CommentsList
