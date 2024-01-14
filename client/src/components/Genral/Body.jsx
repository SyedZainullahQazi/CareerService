import React from 'react'
import TopBar from '../shared/TopBar';
import LeftSideBar from '../shared/LeftSideBar';
function Body({elementBody:Component}) {
  return (
    <div >
    <div >
      <TopBar />
    </div>
    <div>
      <div>
        <LeftSideBar />
      </div>
      <Component/>
    </div>
  </div>
  )
}

export default Body