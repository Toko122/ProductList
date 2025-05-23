import React, {useState} from 'react';
import { products } from './../../data/ProductsData';
import { FiPlusCircle } from "react-icons/fi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { CiCircleRemove } from "react-icons/ci";
import Popup from '../../components/popup/Popup';

export const Home = () => {
  const [addCart, setAddCart] = useState(null);

  const addToCart = (index) => {
    setAddCart(index);
  };

  const [cartCount, setCartCount] = useState({});

  const increment = (index) => {
    setCartCount(prev => {
      const updated = { ...prev };
      updated[index] = (updated[index] || 0) + 1;
      return updated;
    });
  };

  const decrement = (index) => {
    setCartCount(prev => {
      const updated = { ...prev };
      if (updated[index] > 1) {
        updated[index] -= 1;
      } else {
        delete updated[index];
      }
      return updated;
    });
  };

  const removeCart = (index) => {
    setCartCount(prev => {
      const filtered = { ...prev };
      delete filtered[index];
      return filtered;
    });
  };

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <section className='w-full bg-[#fdf3eb]'>
        <div className='w-full h-full flex flex-col lg:flex-row justify-center py-14 px-4 sm:px-10 gap-8'>
          <div className='flex flex-col gap-y-6 w-full lg:w-3/4'>
            <h1 className='text-3xl font-semibold'>Deserts</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {products.map((product, index) => (
                <div className='justify-center px-4 py-2 items-start shadow rounded flex flex-col gap-2 relative' key={index}>
                  <div className='w-full flex justify-center items-center'>
                    <img src={product.image.desktop} alt={product.description} className='w-full sm:w-[400px] rounded-md h-[250px] sm:h-[350px] object-cover object-center' />
                  </div>
                  <div className='text-[#9d9d9d] mt-4'>{product.category}</div>
                  <div className='text-[20px] font-semibold'>{product.name}</div>
                  <div className='font-semibold text-red-500'>${(product.price).toFixed(2)}</div>
                  {addCart !== index ? (
                    <div
                      onClick={() => addToCart(index)}
                      className='flex w-[150px] border-[1px] group absolute bottom-[105px] sm:bottom-[110px] left-1/2 transform -translate-x-1/2 hover:text-white cursor-pointer hover:bg-red-500 border-red-300 rounded-[20px] bg-white h-10 justify-center items-center'
                    >
                      <div className='flex w-full h-full justify-center items-center'>
                        <div className='flex justify-center items-center gap-2'>
                          <div className='font-semibold group-hover:text-white text-red-400'>
                            <BsCartPlus />
                          </div>
                          <div className='text-black font-semibold group-hover:text-white'>
                            Add to Cart
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex w-[150px] border-[1px] group absolute bottom-[105px] left-1/2 transform -translate-x-1/2 cursor-pointer border-red-300 rounded-[20px] bg-white h-10 justify-center items-center'>
                      <div className='flex px-4 rounded-[20px] bg-red-500 w-fit justify-center items-center py-[10px] gap-10'>
                        <button onClick={() => decrement(index)} className='text-[24px] text-white hover:text-[#cac4c4]'>
                          <AiOutlineMinusCircle />
                        </button>
                        <div className='text-white text-[20px]'>{cartCount[index] || 0}</div>
                        <button onClick={() => increment(index)} className='text-[24px] text-white hover:text-[#cac4c4]'>
                          <FiPlusCircle />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className='w-full sm:w-[350px] bg-white rounded-lg shadow-[5px_5px_5px_5px_rgb(0,0,0,0.1)] h-fit pt-6 pb-14 px-4'>
            <div className='flex flex-col items-start gap-y-4'>
              <h1 className='text-[26px] font-semibold text-red-500'>Your Cart ({products.reduce((total, _, i) => total + (cartCount[i] || 0), 0)})</h1>
              <div>
                {products.filter((_, i) => cartCount[i] > 0).length === 0 ? (
                  <>
                    <div className='flex justify-center items-center p-8'>
                      <img src='/assets/images/11329060.png' alt='Empty Cart' className='w-[250px] select-none flex justify-center items-center' />
                    </div>
                    <p className='flex justify-center items-center font-semibold text-[#9b9b9b]'>Cart Is Empty</p>
                  </>
                ) : products.map((product, index) => {
                  const count = cartCount[index] || 0;
                  if (count === 0) return null;
                  return (
                    <div key={index} className='flex flex-col gap-4 w-full'>
                      <div className='flex w-full justify-between items-center gap-4 mt-4'>
                        <div className='flex flex-col w-full'>
                          <span className='font-semibold'>{product.name}</span>
                          <div className='flex gap-4 w-full'>
                            <span className='text-red-500 font-semibold'>{count}x</span>
                            <span className='text-[#a9a9a9]'>${product.price.toFixed(2)}</span>
                            <span className='text-[#a9a9a9]'>${(product.price * count).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className='flex'>
                          <span onClick={() => removeCart(index)} className='text-3xl transition-all duration-300 cursor-pointer hover:text-[#e8e6e6]'>
                            <CiCircleRemove />
                          </span>
                        </div>
                      </div>
                      <div className='w-full h-[1px] bg-black'></div>
                    </div>
                  );
                })}

                {products.filter((_, i) => cartCount[i] > 0).length > 0 && (
                  <div className='flex flex-col gap-6'>
                    <div className='flex justify-between w-full mt-6'>
                      <div className='text-[#bbb] text-[16px] font-semibold'>Order Total</div>
                      <div className='text-[24px] font-semibold'>
                        ${
                          products.reduce((total, product, i) => {
                            const count = cartCount[i] || 0;
                            const price = Number(product.price);
                            return total + count * price;
                          }, 0).toFixed(2)
                        }
                      </div>
                    </div>
                    <div className='bg-[#e7d9c9] px-4 py-[2px] flex gap-2 justify-center'>
                      <div>
                        <img src='assets/images/icon-carbon-neutral.svg' alt='carboni' />
                      </div>
                      <div className='text-[16px] text-[#5c5c5c]'>
                        This is a <span className='font-semibold text-black'>carbon-neutral</span> delivery
                      </div>
                    </div>
                    <div onClick={() => setShowPopup(true)} className='bg-red-500 w-full py-[10px] hover:bg-red-700 cursor-pointer transition-all duration-400 px-6 flex justify-center items-center rounded-[15px]'>
                      <button className='text-white font-semibold'>Confirm Order</button>
                    </div>
                    {showPopup && (
                      <Popup
                        selectedProducts={products.map((product, index) => ({
                          ...product,
                          count: cartCount[index] || 0,
                        })).filter(product => product.count > 0)}
                        onClose={() => setShowPopup(false)}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
