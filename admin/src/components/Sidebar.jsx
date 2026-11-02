import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[10%] pr-[10%] text-[15px]'>
        <NavLink to="/add" className='flex items-center gap-3 border border-gray-400  px-3 py-3 rounded-lg'>
            <img className='w-5 h-5 mx-auto md:mx-0 md:block' src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink to="/list" className='flex items-center gap-3 border border-gray-400  px-3 py-3 rounded-lg'>
            <img className='w-5 h-5 mx-auto md:mx-0 md:block' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Items List</p>
        </NavLink>
        <NavLink to="/order" className='flex items-center gap-3 border border-gray-400  px-3 py-3 rounded-lg'>
            <img className='w-5 h-5 mx-auto md:mx-0 md:block' src={assets.order_icon} alt="" />
            <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
