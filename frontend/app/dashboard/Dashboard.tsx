
import React from 'react'
import SideBar from '../components/SideBar';
import MainBar from '../components/MainBar';

const Dashboard = () => {
  return (
    <div className='flex flex-1'>
        <div className='flex-[0.17]'>
            <SideBar />
        </div>
        <div className='flex-[0.83]'>
            <MainBar />

        </div>
       
      
    </div>
  )
}

export default Dashboard