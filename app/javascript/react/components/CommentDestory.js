import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
const CommentDestroy = (props) => {
  const [currentComment, setCurrentComment] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [error, setError] = useState(null)
  let location_id = props.match.params.location_id
  useEffect(() => {
    let id = props.match.params.id
    fetch(`/api/v1/locations/${location_id}/comments/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Errror(errorMessage)
        throw error
      }
    })
    .then(body => {
      setCurrentComment(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, []);

  const onClickDelete = event => {
    event.preventDefault()
    let id = props.match.params.id
    fetch(`/api/v1/locations/${location_id}/comments/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(),
      credentials: 'same-origin',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      if (body.errors) {
        setError("Couldnt delete")
      } else {
        setShouldRedirect(true)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  if (shouldRedirect) {
    return <Redirect to={`/locations/${location_id}`} />
  }

  return (
    <div className='grid-container wrapper'>
      <h4>Are you sure you want to delete {currentComment.body}?</h4>
      <div className='button-group'>
          <input onClick={onClickDelete} className='button' type='submit' value='Delete Comment' />
        </div>
    </div>
  )
}

export default CommentDestroy 