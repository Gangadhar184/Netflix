import React from 'react'
import { IMG_URL } from '../constants/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-48'>
        <img src={IMG_URL + posterPath} alt="moviecard" />
    </div>
  )
}

export default MovieCard
