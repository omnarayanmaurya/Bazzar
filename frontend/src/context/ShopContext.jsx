import { createContext, useState, useEffect } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Get user cart data
  const getUserCart = async (token) => {
    try {
      const response = await axios.get(
        backendUrl + '/api/cart/get',
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // Add product to cart
  const addToCart = async (itemId, size) => {

    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/add',
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  };

  // Get total cart count
  const getCartCount = () => {

    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        totalCount += cartItems[items][item];
      }
    }

    return totalCount;

  };

  // Update cart quantity
  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) return;

    if (quantity === 0) {

      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + '/api/cart/update',
          { itemId, size, quantity },
          { headers: { token } }
        );

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

  };

  // Get total cart amount
  const getCartAmount = () => {

    let totalAmount = 0;

    for (const items in cartItems) {

      const itemInfo = products.find(
        (product) => product._id === items
      );

      if (!itemInfo) continue;

      for (const item in cartItems[items]) {

        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }

      }
    }

    return totalAmount;
  };

  // Get products data
  const getProductsData = async () => {
    try {
      const response = await axios.get(
        backendUrl + '/api/product/list'
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // Load products when application starts
  useEffect(() => {
    getProductsData();

    const savedToken = localStorage.getItem('token');

    if (savedToken) {
      setToken(savedToken);
    }

  }, []);

  // Load database cart whenever token changes
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );

};

export default ShopContextProvider;