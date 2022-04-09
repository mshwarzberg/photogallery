import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ViewPhotos() {
  const [images, setImages] = useState([])

  useEffect(() => {
    function getImages() {
      axios.post('http://localhost:5000/gallery', {id: sessionStorage.getItem('token')})
            .then(res => {setImages(previmage => (
              [...previmage, res.data]
            ))})
    }
    return getImages()
  }, [])

  return (
    <div>{images[0]}</div>
  )
}

export default ViewPhotos