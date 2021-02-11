import React, { useState, useEffect } from "react"

const CommentIndex = (props) => {
  const [location, setLocation] = useState({})
  const [comments, setComments] = useState({})
  const id = props.match.params.location_id 

  useEffect(() => {
    fetch(`/api/v1/locations/${id}`, {
      credentials: "same-origin"
    })
    .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      let errorMessage = `${response.status} (${response.statusText})`,
      error = new Error(errorMessage);
      throw(error);
      }
    })
    .then((responseBody) => {
      setLocation(responseBody.location)
      setComments(responseBody.comments)
    })
    .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }, [])
  let commentList 
  if(comments.length > 0){
    commentList = comments.map(comment => {
      return( 
        <p>Id: {comment.id} Body: {comment.body}</p>
      )
    })
  }
 
  return (
    <div className="bordered yellow-background">
      <h1>Location Title: {location.title}</h1>
      {commentList}
    </div>
  )
}

export default CommentIndex