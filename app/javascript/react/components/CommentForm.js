import React, { useState, useEffect } from "react"

const CommentForm = (props) => {
  const [newComment, setNewComment] = useState({
    body: ""
  })

  const handleChange = (event) => {
    setNewComment({
      ...newComment,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNewCommentFunction(newComment)
    setNewComment({
      body: ""
    })
  }
  return (
    <form className="new-review-form callout sweet-blue-background bordered third-width" onSubmit={handleSubmit}>
      <label className="review-label bordered green-background centered">
        Add a Comment:
        <input
          name="body"
          id="body"
          type="text"
          onChange={handleChange}
          value={newComment.body}
        />
      </label>

      <div className="button-group">
        <input className="button bordered yellow-background black-font" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default CommentForm