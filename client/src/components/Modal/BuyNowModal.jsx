import React, { useState } from 'react';
import axios from 'axios';
import {
  FaTimes,
  FaCheckCircle,
  FaShoppingBag,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaShippingFast,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const BuyNowModal = ({ isOpen, onClose, product, quantity }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        productId: product._id,
        productName: product.name,
        productImage: product.images?.[0],
        price: product.discountPrice || product.price,
        quantity,
        userName: userInfo.name,
        userPhone: userInfo.phone,
        userAddress: userInfo.address,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post(
        'https://tech-bazar-iota.vercel.app/orders',
        orderData
      );
      toast.success('Order Placed Successfully! 🎉');
      onClose();
      // Reset form
      setUserInfo({ name: '', email: '', phone: '', address: '' });
      setCurrentStep(1);
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate prices
  const productPrice = product?.discountPrice || product?.price || 0;
  const productTotal = productPrice * quantity;
  const deliveryCharge = 120; // 120 TK delivery charge
  const totalPrice = productTotal + deliveryCharge;
  const discountAmount = product?.price
    ? (product.price - productPrice) * quantity
    : 0;

  const canProceed = userInfo.name && userInfo.phone && userInfo.address;

  return (
    <div className="fixed inset-0  bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <FaShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Complete Your Order</h2>
                <p className="text-red-100 mt-1">Fast & Secure Checkout</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6">
            <div
              className={`flex items-center ${
                currentStep >= 1 ? 'text-white' : 'text-red-300'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 1
                    ? 'bg-white text-red-600 border-white'
                    : 'border-red-300'
                }`}
              >
                {currentStep > 1 ? <FaCheckCircle size={14} /> : '1'}
              </div>
              <span className="ml-2 text-sm font-medium">Details</span>
            </div>
            <div
              className={`w-12 h-1 mx-2 ${
                currentStep >= 2 ? 'bg-white' : 'bg-red-400'
              }`}
            ></div>
            <div
              className={`flex items-center ${
                currentStep >= 2 ? 'text-white' : 'text-red-300'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= 2
                    ? 'bg-white text-red-600 border-white'
                    : 'border-red-300'
                }`}
              >
                {currentStep > 2 ? <FaCheckCircle size={14} /> : '2'}
              </div>
              <span className="ml-2 text-sm font-medium">Confirm</span>
            </div>
          </div>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Product Summary Card */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl border border-red-100 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <FaShoppingBag className="mr-3 text-red-500" />
              Order Summary
            </h3>

            <div className="flex items-start space-x-4 mb-4">
              <img
                src={product?.images?.[0] || 'https://via.placeholder.com/80'}
                alt={product?.name}
                className="w-20 h-20 object-contain rounded-lg border-2 border-white shadow-sm"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-lg leading-tight">
                  {product?.name}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  Quantity: {quantity}
                </p>

                {/* Pricing Breakdown */}
                <div className="mt-3 space-y-2">
                  {product?.discountPrice && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 line-through text-sm">
                        ৳{(product.price * quantity).toLocaleString()}
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                        Save ৳{discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Product Price:</span>
                      <span className="font-medium">
                        ৳{productTotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center">
                        <FaShippingFast className="w-3 h-3 mr-1 text-blue-500" />
                        Delivery Charge:
                      </span>
                      <span className="font-medium">
                        ৳{deliveryCharge.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800">
                          Total Amount:
                        </span>
                        <span className="text-2xl font-bold text-red-600">
                          ৳{totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* {product?.discountPrice && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-green-700 text-sm font-medium">
                    You're saving ৳{discountAmount.toLocaleString()}!
                  </span>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {Math.round(
                      (1 - product.discountPrice / product.price) * 100
                    )}
                    % OFF
                  </span>
                </div>
              </div>
            )} */}
          </div>

          {/* User Information Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  আপনার নাম *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                    value={userInfo.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  মোবাইল নাম্বার *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+880 1234-567890"
                    value={userInfo.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ঠিকানা *
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <textarea
                  name="address"
                  placeholder="আপনার সম্পূর্ণ  ঠিকানা লেখুন গ্রাম/এলাকা/থানা/ উপজেলা, /জেলা বিভাগ
 "
                  value={userInfo.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-600 text-sm font-bold">!</span>
              </div>
              <div className="text-yellow-800 text-sm">
                <p className="font-semibold mb-1"> Important Notice</p>
                <p className="mb-2">
                  অর্ডার করার আগে নিশ্চিত হোন যে প্রোডাক্টটি নেবেন। অযথা অর্ডার
                  করলে আমরা ও ডেলিভারি ম্যান হয়রানির শিকার হবো
                </p>
                <p className="font-medium">
                  💵 Payment Method: Cash on Delivery
                </p>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <FaShieldAlt className="w-6 h-6 text-green-500 mb-2" />
              <span className="text-xs font-medium text-gray-700">
                সুরক্ষিত
              </span>
              <span className="text-xs text-gray-500">পেমেন্ট</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <FaShippingFast className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-xs font-medium text-gray-700">দ্রুত</span>
              <span className="text-xs text-gray-500">ডেলিভারি</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
              <FaCheckCircle className="w-6 h-6 text-red-500 mb-2" />
              <span className="text-xs font-medium text-gray-700">
                কোয়ালিটি
              </span>
              <span className="text-xs text-gray-500">গ্যারান্টিড</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row-reverse sm:justify-between sm:items-center space-y-3 sm:space-y-0">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-2 py-2 md:px-6 md:py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 flex-1 sm:flex-none"
                disabled={isSubmitting}
              >
                বাতিল করুন
              </button>
              <button
                onClick={handleConfirm}
                disabled={!canProceed || isSubmitting}
                className="px-2 py-2 md:px-6 md:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center min-w-[140px] flex-1 sm:flex-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    প্রসেসিং...
                  </>
                ) : (
                  <> কনফার্ম করুন</>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center sm:justify-start text-sm text-gray-500">
              <FaShieldAlt className="w-4 h-4 mr-2 text-green-500" />
              <span>SSL Secured • 256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
