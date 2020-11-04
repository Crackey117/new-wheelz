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
    <form className="new-review-form callout" onSubmit={handleSubmit}>
      <label className="review-label">
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
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default CommentForm