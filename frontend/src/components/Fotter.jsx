import React from 'react'
import { assets } from '../assets/assets'

const Fotter = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img className='w-32 mb-5' src={assets.logo} alt="" />
            <p className='w-full sm:w-2/3 text-grey-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi impedit, laboriosam officiis commodi dicta eum perferendis unde accusamus voluptatem! Corporis.</p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>7896050218</li>
                <li>Lorem, ipsum dolor.</li>
            </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All right reserved.</p>
      </div>
    </div>
  )
}

export default Fotter
