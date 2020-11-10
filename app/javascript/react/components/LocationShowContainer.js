import React, { useState, useEffect } from "react"
import LocationShow from "./LocationShow"
import CommentsList from "./CommentsList"
import CommentForm from "./CommentForm"
import CommentErrorList from "./CommentErrorList"
const LocationShowContainer = (props) => {
  const [location, setLocation] = useState({})
  const [comments, setComments] = useState({})
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const id = props.match.params.id 

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

  const validforSubmission = (submittedComment) => {
    let submittedErrors = {}
    const requiredFields = ["body"]
    requiredFields.forEach(field => {
      if (submittedComment[field].trim() === "") {
        submittedErrors = {
          ...submittedErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submittedErrors)
    return _.isEmpty(submittedErrors)
  }
  const addNewComment = (newCommentObject) => {
    event.preventDefault() 
    if (validforSubmission(newCommentObject)) {
      fetch(`/api/v1/locations/${id}/comments.json`, {
        method: "POST",
        body: JSON.stringify(newCommentObject),
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(body => {
        if (body.errors) {
          const requiredFields = ["body"]
          requiredFields.forEach(field => { 
            if (body.errors[field] !== undefined) {
              setErrors({
                ...errors,
                [field]: body.errors[field][0]
              })
            }
          })
        }else if(body.error){
          setError(body.error[0])
        }else {
          setComments([
            ...comments,
            body
          ])
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }
  
  
  
  return (
    <div className="cell auto grid-container page">
      <LocationShow
        location={location}
      />

      <CommentsList 
        comments={comments}
      />
      <CommentErrorList 
        errors={errors} 
        error={error}
      />

      <CommentForm 
        addNewCommentFunction={addNewComment} 
      />
     
    </div>
  )
}

export default LocationShowContainer