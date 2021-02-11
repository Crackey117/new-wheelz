import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
const LocationDestroy = (props) => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [error, setError] = useState(null)
  
  useEffect(() => {
    let id = props.match.params.id
    fetch(`/api/v1/locations/${id}`)
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
      setCurrentLocation(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, []);
  
  const onClickDelete = event => {
    event.preventDefault()
    let id = props.match.params.id
    fetch(`/api/v1/locations/${id}`, {
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
  let title = ""
  if(currentLocation.location){
    title = currentLocation.location.title
  }
  if (shouldRedirect) {
    return <Redirect to='/locations' />
  }

  return (
    <div className='grid-container wrapper bordered sweet-blue-background'>
      <p>{error}</p>
      <h4>Are you sure you want to delete {title}?</h4>
      <div className='button-group'>
          <input onClick={onClickDelete} className='button' type='submit' value='Delete Location' />
        </div>
    </div>
  )
}

export default LocationDestroy