import React from 'react';

const Popup = ({ selectedProducts, onClose }) => {
  const total = selectedProducts.reduce((sum, product) => sum + product.count * product.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white px-8 py-6 flex flex-col gap-4 justify-start rounded-md relative w-[600px] sm:max-h-none sm:overflow-visible max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-red-500 font-bold">
          ×
        </button>

        <div className="flex flex-col gap-4 items-start text-center w-full">
          <img src="/assets/images/icon-order-confirmed.svg" alt="checked" className="w-[50px]" />

          <div className="flex flex-col gap-[6px] w-full items-start">
            <span className="sm:text-[38px] text-[28px] font-semibold">Order Confirmed</span>
            <span className="text-[#bbb] text-[14px]">We hope you enjoy your food!</span>
          </div>

          <div className="bg-[#f0e1ca] flex justify-start items-center py-4 px-6 rounded w-full">
            <div className="flex flex-col gap-6 w-full">
              {selectedProducts.length > 0 ? (
                selectedProducts.map((product, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center gap-6 w-full">
                      <img src={product.image.desktop} alt={product.name} className="sm:w-[80px] sm:h-[80px] w-[90px] h-[90px] object-cover rounded" />
                      <div className="flex gap-2 flex-col">
                        <div className="text-[16px] font-semibold">{product.name}</div>
                        <div className="flex gap-4">
                          <div>{product.count}x</div>
                          <div>${product.price.toFixed(2)}</div>
                          <div className="text-[#7c7c7c]">${(product.price * product.count).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    <span className="w-full h-[1px] bg-[#b8b8b8]"></span>
                  </React.Fragment>
                ))
              ) : (
                <p>No items Selected</p>
              )}

              <div className="flex justify-between items-center">
                <div className="text-[#767676] text-[16px] font-semibold">Order Total</div>
                <div className="text-[24px] font-semibold">${total.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <button className="w-full py-2 rounded-[20px] sm:px-24 px-14 bg-red-600 flex justify-center items-center sm:text-[16px] text-[14px] text-white font-semibold cursor-pointer hover:bg-red-700 transition duration-400">
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
