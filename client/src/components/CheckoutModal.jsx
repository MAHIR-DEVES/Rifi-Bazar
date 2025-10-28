// CheckoutModal.jsx
import { useState } from 'react';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import axios from 'axios';
import SuccessModal from './Modal/SuccessModal';

function CheckoutModal({
  book,
  quantity,
  setQuantity,
  savings,
  totalPrice,
  formData,
  handleInputChange,
  setShowCheckout,
}) {
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔹 Radio field select handler
  const handleQuantityChange = e => {
    setQuantity(Number(e.target.value));
  };

  // 🔹 Function to generate unique order ID
  const generateOrderId = () => {
    const datePart = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ORD-${datePart}-${randomPart}`;
  };

  // 🔹 Handle form submit
  const handleSubmitOrder = async e => {
    e.preventDefault();

    const orderId = generateOrderId();
    const finalQuantity = book?.combo ? 10 : quantity;

    const order = {
      orderId, // unique order ID
      product: {
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
      },
      combo: book.combo,
      quantity: finalQuantity, // from radio button
      savings,
      totalPrice,
      customer: formData,
      status: 'Pending',
    };

    try {
      const response = await axios.post('http://localhost:5000/orders', order);
      console.log('✅ Order Submitted:', response.data);

      setShowSuccess(true);
    } catch (error) {
      console.error('❌ API Error:', error);
      alert('Failed to submit order. Please try again.');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setShowCheckout(false);
  };

  return (
    <div className="max-w-7xl mx-auto md:px-2 md:py-12 relative">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => setShowCheckout(false)}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            <FaArrowLeft />
            <span>Back to Book</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h3>

            <div className="flex items-center space-x-4 mb-6">
              <img
                src={book.image}
                alt={book.title}
                className="object-cover rounded-lg shadow-md w-full h-48"
              />
            </div>

            <div className="flex justify-between py-5">
              <div>
                <h4 className="font-semibold text-gray-800 text-lg">
                  {book.title}
                </h4>
                <p className="text-gray-600 text-sm">by {book.author}</p>
              </div>
              <div>
                <p className="text-indigo-600 font-semibold text-lg">
                  ৳ {book.price}
                </p>
              </div>
            </div>

            {/* Quantity Selector (Radio Buttons) */}
            {book?.combo === false && (
              <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
                <span className="block text-gray-700 font-semibold mb-2">
                  Select Quantity
                </span>
                <div className="space-y-2">
                  {[1, 2, 3].map(value => (
                    <label
                      key={value}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="quantity"
                        value={value}
                        checked={quantity === value}
                        onChange={handleQuantityChange}
                        className="form-radio text-indigo-600"
                      />
                      <span className="text-gray-800 font-medium">
                        {value} Kg
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Unit Price</span>
                <span className="font-semibold">৳ {book.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span className="font-semibold">{quantity} Kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">৳ {totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">You Save</span>
                  <span className="font-semibold text-green-600">
                    ৳ {savings}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                <span>Total</span>
                <span className="text-indigo-600">৳ {totalPrice}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                📦 Buy {quantity} Kg and get free shipping!
              </p>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Shipping & Payment
            </h3>
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Shipping Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your complete shipping address"
                />
              </div>

              {/* City & ZIP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="ZIP Code"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#01662c] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#054923] transition duration-300 shadow-md hover:shadow-lg"
              >
                Complete Order - ৳ {totalPrice}
              </button>

              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <FaLock />
                <span className="text-sm">
                  Your payment is secure and encrypted
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <SuccessModal
          message={`✅ Order placed successfully! Order ID: ${generateOrderId()} for ${quantity} Kg of "${
            book.title
          }".`}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
}

export default CheckoutModal;
