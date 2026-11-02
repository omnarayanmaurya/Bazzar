import React from 'react'

const NewsLetterBox = () => {
    // so that page doesnt reload oon submit
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-gray-800 text-2xl font-medium'>Subscribe now & get 20% off</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, fuga!</p>
        <form onSubmit={onSubmitHandler} className='border w-full sm:w-1/2 flex items-center gap-3 mx-auto rounded my-6'>
            <input type="email" className='w-full sm:flex-1 outline-none' placeholder='enter your email id.' />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
