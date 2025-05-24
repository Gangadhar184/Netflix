import React from 'react'
import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'

const GptSearch = () => {
  return (
    <div className=''>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch
