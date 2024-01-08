import React from 'react'
import SideBar from './SideBar'
import Content from './Content'

const Body = () => {
  return (
    <div className='flex mt-20'>
        <SideBar/>
        <Content/>
    </div>
  )
}

export default Body