import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='absolute z-10 pt-[20%] px-20   '>
            <h1 className='text-7xl font-bold text-white'>{title}</h1>
            <p className='text-lg w-1/4 mt-2 py-6 text-white'>{overview}</p>
            <div className='flex gap-2 mt-4'>
                <button className=' px-6 py-2 bg-amber-50  text-black  bg-opacity-50 rounded-lg cursor-pointer'>Play</button>
                <button className=' px-6 py-2 bg-gray-500 text-white  bg-opacity-50 rounded-lg cursor-pointer'>More info</button>
            </div>
        </div>
    )
}

export default VideoTitle
