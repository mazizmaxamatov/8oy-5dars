import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd'; // Import Ant Design Modal
import { ShoppingCart } from 'lucide-react';

const Checkout = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))?.user || {});
    const [billingAddress, setBillingAddress] = useState(user.billing_address || {});
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify({ user }));
    }, [user]);

    const handleInputChange = (e, field, isBilling = false) => {
        const value = e.target.value;
        if (isBilling) {
            setBillingAddress((prev) => ({ ...prev, [field]: value }));
            setUser((prev) => ({
                ...prev,
                billing_address: { ...prev.billing_address, [field]: value }
            }));
        } else {
            setUser((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handlePlaceOrder = () => {
        // Show the modal with order details
        setIsModalVisible(true);
        // Optionally, save order details in localStorage for tracking
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        // Clear the cart after placing the order
        localStorage.removeItem("cart");
        setCartItems([]);
    };

    const handleTrackOrder = () => {
        navigate("/profile/track");  // Navigate to the "Track your order" page
    };

    return (
        <div className="">
            <div className="text-gray-500 text-sm mb-4">
                <span
                    onClick={() => navigate("/")}
                    className="hover:underline cursor-pointer text-green-600"
                >
                    Home
                </span>{" "}
                / <span className="text-black font-medium">Checkout</span>
            </div>

            <form className="max-w-[800px]">
                {/* Billing Information */}
                <div className="flex gap-3 justify-between items-center">
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> First Name
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            value={user?.name || ''}
                            onChange={(e) => handleInputChange(e, 'name')}
                        />
                    </label>
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> Last Name
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            value={user?.surname || ''}
                            onChange={(e) => handleInputChange(e, 'surname')}
                        />
                    </label>
                </div>

                <div className="flex gap-3 justify-between items-center">
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> Country / Region
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            placeholder="Enter your country / region"
                            value={billingAddress.country || ''}
                            onChange={(e) => handleInputChange(e, 'country', true)}
                        />
                    </label>
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> Town / City
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            placeholder="Enter your town / city"
                            value={billingAddress.town || ''}
                            onChange={(e) => handleInputChange(e, 'town', true)}
                        />
                    </label>
                </div>

                <div className="flex gap-3 justify-between items-center">
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> Street Address
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            placeholder="Enter your street name and house number"
                            value={billingAddress.street_address || ''}
                            onChange={(e) => handleInputChange(e, 'street_address', true)}
                        />
                    </label>
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> Extra Address
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            placeholder="Enter your apartment or suite (optional)"
                            value={billingAddress.extra_address || ''}
                            onChange={(e) => handleInputChange(e, 'extra_address', true)}
                        />
                    </label>
                </div>

                <div className="flex gap-3 justify-between items-center">
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> State
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            placeholder="Enter your state"
                            value={billingAddress.state || ''}
                            onChange={(e) => handleInputChange(e, 'state', true)}
                        />
                    </label>
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> Zip
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            placeholder="Enter your ZIP code"
                            value={billingAddress.zip || ''}
                            onChange={(e) => handleInputChange(e, 'zip', true)}
                        />
                    </label>
                </div>

                <div className="flex gap-3 justify-between items-center">
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> Email Address
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="email"
                            value={user.email || ''}
                            onChange={(e) => handleInputChange(e, 'email')}
                        />
                    </label>
                    <label className="w-full my-3">
                        <div className="font-semibold text-sm">
                            <span className="text-red-500">*</span> Phone
                        </div>
                        <input
                            className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
                            type="text"
                            placeholder="Phone number"
                            value={user.phone_number || ''}
                            onChange={(e) => handleInputChange(e, 'phone_number')}
                        />
                    </label>
                </div>

                {/* Payment Methods */}
                <div className="my-6">
                    <div className="font-semibold text-sm mb-2">
                        <span className="text-red-500">*</span> Payment Method
                    </div>
                    <label className="flex items-center gap-3 border rounded-lg p-3 my-2">
                        <input type="radio" name="payment" value="paypal" defaultChecked className="accent-green-500" />
                        PayPal
                    </label>
                    <label className="flex items-center gap-3 border rounded-lg p-3 my-2">
                        <input type="radio" name="payment" value="bank" className="accent-green-500" />
                        Direct bank transfer
                    </label>
                    <label className="flex items-center gap-3 border rounded-lg p-3 my-2">
                        <input type="radio" name="payment" value="cod" className="accent-green-500" />
                        Cash on delivery
                    </label>
                </div>

                {/* Order Notes */}
                <div className="my-6">
                    <label className="w-full">
                        <div className="font-semibold text-sm mb-2">Order notes (optional)</div>
                        <textarea
                            className="w-full h-[150px] py-2 px-3 rounded-lg border bg-white resize-none"
                            placeholder="Your order notes, thoughts, feedback, etc..."
                        />
                    </label>
                </div>

                {/* Place Order Button */}
                <div className="my-6">
                    <button
                        type="button"
                        onClick={handlePlaceOrder}
                        className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg"
                    >
                        Place Order
                    </button>
                </div>
            </form>

            {/* Modal to display order confirmation */}
            <Modal
                title="Order Confirmation"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[ 
                    <button key="track" onClick={handleTrackOrder} className="btn btn-primary">
                        Track Your Order
                    </button>,
                ]}
            >
                <div className="text-center">
                    <h2>Thank you for your order!</h2>
                    <p>Your order has been placed successfully. Below are the items you ordered:</p>

                    <div className="order-details">
                        {cartItems.map(item => (
                            <div key={item._id} className="order-item flex justify-between my-2">
                                <img src={item.main_image} alt={item.title} className="w-20 h-20 object-contain" />
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-total">
                        <h4>Total: ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h4>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Checkout;



























// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Modal } from 'antd'; // Import Ant Design Modal
// import { ShoppingCart } from 'lucide-react';

// const Checkout = () => {
//     const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))?.user || {});
//     const [billingAddress, setBillingAddress] = useState(user.billing_address || {});
//     const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         localStorage.setItem("user", JSON.stringify({ user }));
//     }, [user]);

//     const handleInputChange = (e, field, isBilling = false) => {
//         const value = e.target.value;
//         if (isBilling) {
//             setBillingAddress((prev) => ({ ...prev, [field]: value }));
//             setUser((prev) => ({
//                 ...prev,
//                 billing_address: { ...prev.billing_address, [field]: value }
//             }));
//         } else {
//             setUser((prev) => ({ ...prev, [field]: value }));
//         }
//     };

//     const handlePlaceOrder = () => {
//         // Show the modal with order details
//         setIsModalVisible(true);
//         // Optionally, save order details in localStorage for tracking
//     };

//     const handleCloseModal = () => {
//         setIsModalVisible(false);
//         // Clear the cart after placing the order
//         localStorage.removeItem("cart");
//         setCartItems([]);
//     };

//     const handleTrackOrder = () => {
//         navigate("/profile.track");  // Navigate to the "Track your order" page
//     };

//     return (
//         <div className="">
//             <div className="text-gray-500 text-sm mb-4">
//                 <span
//                     onClick={() => navigate("/")}
//                     className="hover:underline cursor-pointer text-green-600"
//                 >
//                     Home
//                 </span>{" "}
//                 / <span className="text-black font-medium">Checkout</span>
//             </div>

//             <form className="max-w-[800px]">
//                 {/* Billing Information */}
//                 <div className="flex gap-3 justify-between items-center">
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> First Name
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             value={user?.name || ''}
//                             onChange={(e) => handleInputChange(e, 'name')}
//                         />
//                     </label>
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> Last Name
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             value={user?.surname || ''}
//                             onChange={(e) => handleInputChange(e, 'surname')}
//                         />
//                     </label>
//                 </div>

//                 <div className="flex gap-3 justify-between items-center">
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> Country / Region
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             placeholder="Enter your country / region"
//                             value={billingAddress.country || ''}
//                             onChange={(e) => handleInputChange(e, 'country', true)}
//                         />
//                     </label>
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> Town / City
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             placeholder="Enter your town / city"
//                             value={billingAddress.town || ''}
//                             onChange={(e) => handleInputChange(e, 'town', true)}
//                         />
//                     </label>
//                 </div>

//                 <div className="flex gap-3 justify-between items-center">
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> Street Address
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             placeholder="Enter your street name and house number"
//                             value={billingAddress.street_address || ''}
//                             onChange={(e) => handleInputChange(e, 'street_address', true)}
//                         />
//                     </label>
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> Extra Address
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             placeholder="Enter your apartment or suite (optional)"
//                             value={billingAddress.extra_address || ''}
//                             onChange={(e) => handleInputChange(e, 'extra_address', true)}
//                         />
//                     </label>
//                 </div>

//                 <div className="flex gap-3 justify-between items-center">
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> State
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             placeholder="Enter your state"
//                             value={billingAddress.state || ''}
//                             onChange={(e) => handleInputChange(e, 'state', true)}
//                         />
//                     </label>
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> Zip
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             placeholder="Enter your ZIP code"
//                             value={billingAddress.zip || ''}
//                             onChange={(e) => handleInputChange(e, 'zip', true)}
//                         />
//                     </label>
//                 </div>

//                 <div className="flex gap-3 justify-between items-center">
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> Email Address
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="email"
//                             value={user.email || ''}
//                             onChange={(e) => handleInputChange(e, 'email')}
//                         />
//                     </label>
//                     <label className="w-full my-3">
//                         <div className="font-semibold text-sm">
//                             <span className="text-red-500">*</span> Phone
//                         </div>
//                         <input
//                             className="w-full my-2 py-2 px-3 rounded-lg border bg-white"
//                             type="text"
//                             placeholder="Phone number"
//                             value={user.phone_number || ''}
//                             onChange={(e) => handleInputChange(e, 'phone_number')}
//                         />
//                     </label>
//                 </div>

//                 {/* Payment Methods */}
//                 <div className="my-6">
//                     <div className="font-semibold text-sm mb-2">
//                         <span className="text-red-500">*</span> Payment Method
//                     </div>
//                     <label className="flex items-center gap-3 border rounded-lg p-3 my-2">
//                         <input type="radio" name="payment" value="paypal" defaultChecked className="accent-green-500" />
//                         PayPal
//                     </label>
//                     <label className="flex items-center gap-3 border rounded-lg p-3 my-2">
//                         <input type="radio" name="payment" value="bank" className="accent-green-500" />
//                         Direct bank transfer
//                     </label>
//                     <label className="flex items-center gap-3 border rounded-lg p-3 my-2">
//                         <input type="radio" name="payment" value="cod" className="accent-green-500" />
//                         Cash on delivery
//                     </label>
//                 </div>

//                 {/* Order Notes */}
//                 <div className="my-6">
//                     <label className="w-full">
//                         <div className="font-semibold text-sm mb-2">Order notes (optional)</div>
//                         <textarea
//                             className="w-full h-[150px] py-2 px-3 rounded-lg border bg-white resize-none"
//                             placeholder="Your order notes, thoughts, feedback, etc..."
//                         />
//                     </label>
//                 </div>

//                 {/* Place Order Button */}
//                 <div className="my-6">
//                     <button
//                         type="button"
//                         onClick={handlePlaceOrder}
//                         className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg"
//                     >
//                         Place Order
//                     </button>
//                 </div>
//             </form>

//             {/* Modal to display order confirmation */}
//             <Modal
//                 title="Order Confirmation"
//                 visible={isModalVisible}
//                 onCancel={handleCloseModal}
//                 footer={[
//                     <button key="track" onClick={handleTrackOrder} className="btn btn-primary">
//                         Track Your Order
//                     </button>,
//                 ]}
//             >
//                 <div className="text-center">
//                     <h2>Thank you for your order!</h2>
//                     <p>Your order has been placed successfully. Below are the items you ordered:</p>

//                     <div className="order-details">
//                         {cartItems.map(item => (
//                             <div key={item._id} className="order-item flex justify-between my-2">
//                                 <img src={item.main_image} alt={item.title} className="w-20 h-20 object-contain" />
//                                 <div>
//                                     <h4>{item.title}</h4>
//                                     <p>${item.price.toFixed(2)}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="order-total">
//                         <h4>Total: ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h4>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default Checkout;















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Modal } from 'antd'; // Import Ant Design Modal
// import { ShoppingCart } from 'lucide-react';

// const Checkout = () => {
//     const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))?.user || {});
//     const [billingAddress, setBillingAddress] = useState(user.billing_address || {});
//     const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart")) || []);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         localStorage.setItem("user", JSON.stringify({ user }));
//     }, [user]);

//     const handleInputChange = (e, field, isBilling = false) => {
//         const value = e.target.value;
//         if (isBilling) {
//             setBillingAddress((prev) => ({ ...prev, [field]: value }));
//             setUser((prev) => ({ ...prev, billing_address: { ...prev.billing_address, [field]: value } } ));
//         } else {
//             setUser((prev) => ({ ...prev, [field]: value }));
//         }
//     };

//     const handlePlaceOrder = () => {
//         // Show the modal with order details
//         setIsModalVisible(true);
//         // You can also add order details in localStorage here if needed for tracking purposes
//     };

//     const handleCloseModal = () => {
//         setIsModalVisible(false);
//         // Optionally, clear the cart after placing the order
//         localStorage.removeItem("cart");
//         setCartItems([]);
//     };

//     const handleTrackOrder = () => {
//         navigate("/track-order");  // Navigate to the "Track your order" page
//     };

//     return (
//         <div className="">
//             <div className="text-gray-500 text-sm mb-4">
//                 <span
//                     onClick={() => navigate("/")}
//                     className="hover:underline cursor-pointer text-green-600"
//                 >
//                     Home
//                 </span>{" "}
//                 / <span className="text-black font-medium">Checkout</span>
//             </div>

//             <form className='max-w-[800px]'>
//                 {/* Checkout form fields */}
//                 {/* Billing Address, Payment Methods, etc. */}
//                 <div className="my-6">
//                     <button
//                         type="button"
//                         onClick={handlePlaceOrder}
//                         className='w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg'
//                     >
//                         Place Order
//                     </button>
//                 </div>
//             </form>

//             {/* Modal to display order confirmation */}
//             <Modal
//                 title="Order Confirmation"
//                 visible={isModalVisible}
//                 onCancel={handleCloseModal}
//                 footer={[
//                     <button key="track" onClick={handleTrackOrder} className="btn btn-primary">
//                         Track Your Order
//                     </button>,
//                 ]}
//             >
//                 <div className="text-center">
//                     <h2>Thank you for your order!</h2>
//                     <p>Your order has been placed successfully. Below are the items you ordered:</p>

//                     <div className="order-details">
//                         {cartItems.map(item => (
//                             <div key={item._id} className="order-item flex justify-between my-2">
//                                 <img src={item.main_image} alt={item.title} className="w-20 h-20 object-contain" />
//                                 <div>
//                                     <h4>{item.title}</h4>
//                                     <p>${item.price.toFixed(2)}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="order-total">
//                         <h4>Total: ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h4>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     );
// };

// export default Checkout;
























// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {

//     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
//     const [user, setUser] = useState(storedUser.user || {});
//     const [billingAddress, setBillingAddress] = useState(user.billing_address || {});
//     const navigate = useNavigate();

//     useEffect(() => {
//         localStorage.setItem("user", JSON.stringify({ user }));
//     }, [user]);

//     const handleInputChange = (e, field, isBilling = false) => {
//         const value = e.target.value;
//         if (isBilling) {
//             setBillingAddress((prev) => ({ ...prev, [field]: value }));
//             setUser((prev) => ({ ...prev, billing_address: { ...prev.billing_address, [field]: value } }));
//         } else {
//             setUser((prev) => ({ ...prev, [field]: value }));
//         }
//     };

//     return (
//         <div className="">
//             <div className="text-gray-500 text-sm mb-4">
//                 <span
//                     onClick={() => navigate("/")}
//                     className="hover:underline cursor-pointer text-green-600"
//                 >
//                     Home
//                 </span>{" "}
//                 / <span className="text-black font-medium">Checkout</span>
//             </div>
//             <div>
//                 <form className='max-w-[800px]'>
//                     <div className='flex gap-3 justify-between items-center'>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> First Name</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={user?.name || ''} onChange={(e) => handleInputChange(e, 'name')} />
//                         </label>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> Last Name</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" value={user?.surname || ''} onChange={(e) => handleInputChange(e, 'surname')} />
//                         </label>
//                     </div>
//                     <div className='flex gap-3 justify-between items-center'>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> Country / Region</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='Enter your country / region' value={billingAddress.country || ''} onChange={(e) => handleInputChange(e, 'country', true)} />
//                         </label>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> Town / City</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='Enter your town / city' value={billingAddress.town || ''} onChange={(e) => handleInputChange(e, 'town', true)} />
//                         </label>
//                     </div>
//                     <div className='flex gap-3 justify-between items-center'>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> Street Address</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='Enter your street name and house number' value={billingAddress.street_address || ''} onChange={(e) => handleInputChange(e, 'street_address', true)} />
//                         </label>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> Extra Address</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='Enter your apartment or suite (optional)' value={billingAddress.extra_address || ''} onChange={(e) => handleInputChange(e, 'extra_address', true)} />
//                         </label>
//                     </div>
//                     <div className='flex gap-3 justify-between items-center'>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> State</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='Enter your state' value={billingAddress.state || ''} onChange={(e) => handleInputChange(e, 'state', true)} />
//                         </label>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> Zip</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="text" placeholder='Enter your ZIP code' value={billingAddress.zip || ''} onChange={(e) => handleInputChange(e, 'zip', true)} />
//                         </label>
//                     </div>
//                     <div className='flex gap-3 justify-between items-center'>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> Email Address</div>
//                             <input className='w-full my-2 py-2 px-3 rounded-lg border bg-white' type="email" value={user.email || ''} onChange={(e) => handleInputChange(e, 'email')} />
//                         </label>
//                         <label className='w-full my-3'>
//                             <div className='font-semibold text-sm'><span className='text-red-500'>*</span> Phone</div>
//                             <div className='w-full my-2 flex items-center group active:border-green-500 hover:border-green-500 transi focus:border-green-500 outline-none rounded-lg border bg-white'>
//                                 <div className='bg-[#FBFBFB] py-2 group-hover:border-r-green-500 transi rounded-l-lg px-3 border-r-2 font-semibold'>
//                                     +998
//                                 </div>
//                                 <input className='w-full outline-none rounded-r-lg py-2 px-3 bg-white' placeholder='Phone number' type="text" value={user?.phone_number || ''} onChange={(e) => handleInputChange(e, 'phone_number')} />
//                             </div>
//                         </label>
//                     </div>
//                     {/* Payment Method */}
//                     <div className='my-6'>
//                         <div className='font-semibold text-sm mb-2'>
//                             <span className='text-red-500'>*</span> Payment Method
//                         </div>

//                         <label className='flex items-center gap-3 border rounded-lg p-3 my-2'>
//                             <input type='radio' name='payment' value='paypal' defaultChecked className='accent-green-500' />
//                             <img src='https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg' alt='PayPal' className='h-8' />
//                             <img src="/images/mastercard.svg" alt="img" className='h-8'/>
//                             <img src="/images/visa.svg" alt="img" className='h-8'/>
//                             <img src="/images/amex.svg" alt="img" className='h-8'/>

//                         </label>

//                         <label className='flex items-center gap-3 border rounded-lg p-3 my-2'>
//                             <input type='radio' name='payment' value='bank' className='accent-green-500' />
//                             Direct bank transfer
//                         </label>

//                         <label className='flex items-center gap-3 border rounded-lg p-3 my-2'>
//                             <input type='radio' name='payment' value='cod' className='accent-green-500' />
//                             Cash on delivery
//                         </label>
//                     </div>

//                     {/* Order Notes */}
//                     <div className='my-6'>
//                         <label className='w-full'>
//                             <div className='font-semibold text-sm mb-2'>Order notes (optional)</div>
//                             <textarea
//                                 className='w-full h-[150px] py-2 px-3 rounded-lg border bg-white resize-none'
//                                 placeholder='Your order notes, thoughts, feedback, etc...'
//                             />
//                         </label>
//                     </div>

//                     {/* Place Order Button */}
//                     <div className='my-6'>
//                         <button
//                             type='submit'
//                             className='w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg'
//                         >
//                             Place Order
//                         </button>
//                     </div>

//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Checkout
















{/* <button className='bg-[#46A358] hover:bg-[#46A358]/80 text-white py-2 px-3 cursor-pointer rounded font-semibold'>
                        Save My Address
                    </button> */} 