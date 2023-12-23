import React from 'react'
import SideBar from './SideBar'
import Content from './Content'
import RightBar from './RightBar'

const Body = () => {
  return (
    <div className='flex'>
        <SideBar/>
        <Content/>
        <RightBar/>
    </div>
  )
}

export default Body