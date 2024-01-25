import React from 'react'
import Posts from './posts/Posts'
import RightBar from './RightBar'

const Content = () => {
  return (
    <div className='flex'>
        <Posts/>
        <RightBar/>
    </div>
  )
}

export default Content