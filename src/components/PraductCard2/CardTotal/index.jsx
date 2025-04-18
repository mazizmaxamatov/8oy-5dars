import React from "react";

const CardTotal = () => {
  return (
    <div>
      <div className="w-[354px] text-start max-lg:w-[100%]">
        <h3 className="font-bold pb-[11px] border-b border-[#46A35880]">
          Card Total
        </h3>
        <div className="flex h-[40px] mt-[35px]">
          <input
            placeholder="Enter coupon code here..."
            className="w-4/5 border border-[#46A358] pl-[15px] placeholder:font-light rounded-l-lg"
            value=""
          />
          <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-1/5 rounded-l-none">
            Apply
          </button>
        </div>
        <div className="ant-descriptions mt-[30px] css-k7429z">
          <div className="ant-descriptions-view">
            <table>
              <tbody>
                <tr className="ant-descriptions-row">
                  <td className="ant-descriptions-item" colspan="3">
                    <div className="ant-descriptions-item-container">
                      <span className="ant-descriptions-item-label">
                        Subtotal
                      </span>
                      <span className="ant-descriptions-item-content">$12</span>
                    </div>
                  </td>
                </tr>
                <tr className="ant-descriptions-row">
                  <td className="ant-descriptions-item" colspan="3">
                    <div className="ant-descriptions-item-container">
                      <span className="ant-descriptions-item-label">
                        Coupon Discount
                      </span>
                      <span className="ant-descriptions-item-content">
                        - $(0.00)
                      </span>
                    </div>
                  </td>
                </tr>
                <tr className="ant-descriptions-row">
                  <td className="ant-descriptions-item" colspan="3">
                    <div className="ant-descriptions-item-container">
                      <span className="ant-descriptions-item-label">
                        Shiping
                      </span>
                      <span className="ant-descriptions-item-content">$16</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between">
          <h1>Total</h1>
          <h1 className="text-[#46A358]">$12</h1>
        </div>
        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-full h-[40px] mt-[30px]">
          Proceed to Checkout
        </button>
        <h3 className="mt-[14px] text-center text-[#46A358] cursor-pointer">
          Continue Shopping
        </h3>
      </div>
    </div>
  );
};

export default CardTotal;
