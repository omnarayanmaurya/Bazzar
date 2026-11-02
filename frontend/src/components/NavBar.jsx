import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const { getCartCount, setShowSearch,navigate,token,setToken,setCartItems } = useContext(ShopContext);

  const logout=()=>{
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    navigate('/login')
  }

  return (
    <div className="flex justify-between items-center py-5 font-medium">

      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">

        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

      </ul>

      {/* Search and Profile Icons */}
      <div className="flex items-center gap-6">

        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-6 cursor-pointer"
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div className="group relative">
          <img
            onClick={() => !token && navigate('/login')}
            src={assets.profile_icon}
            className="w-6 cursor-pointer"
            alt="Profile"
          />
          {/* Dropdown Menu */}
          {token && 
          <div className="hidden pt-4 right-0 absolute z-50 group-hover:block">

            <div className="flex flex-col rounded bg-slate-100 text-gray-500 gap-2 w-36 py-3 px-5">

              <p className="hover:text-black cursor-pointer">
                My Profile
              </p>

              <p onClick={()=>navigate('/orders')} className="hover:text-black cursor-pointer">
                Orders
              </p>

              <p onClick={logout} className="hover:text-black cursor-pointer">
                Log Out
              </p>

            </div>

          </div>
          }
          
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5"
            alt="Cart"
          />

          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="sm:hidden w-4 cursor-pointer"
          alt="Menu"
        />

      </div>

      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >

        <div className="text-gray-600 flex flex-col">

          {/* Back Button */}
          <div
            onClick={() => setVisible(false)}
            className="border-b flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              src={assets.dropdown_icon}
              className="rotate-90 h-4"
              alt=""
            />
            <p>BACK</p>
          </div>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b"
            to="/"
          >
            HOME
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b"
            to="/collection"
          >
            COLLECTION
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b"
            to="/about"
          >
            ABOUT
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border-b"
            to="/contact"
          >
            CONTACT
          </NavLink>

        </div>
      </div>

    </div>
  );
};

export default NavBar;