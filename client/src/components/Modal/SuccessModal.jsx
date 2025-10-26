import { FaCheckCircle, FaHeadset, FaClock } from 'react-icons/fa';

function SuccessModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-3xl w-full ">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaCheckCircle className="text-green-500 text-6xl" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            সফল হয়েছে!
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {message}
          </p>
        </div>

        {/* Additional Information Box */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
          <div className="flex items-start space-x-3 mb-3">
            <FaHeadset className="text-green-600 text-xl mt-1 flex-shrink-0" />
            <div className="text-left">
              <p className="text-gray-800 font-semibold mb-1">
                আমাদের প্রতিনিধি শীঘ্রই যোগাযোগ করবেন
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                অল্প কিছুক্ষণের মধ্যে আমাদের এক প্রতিনিধি আপনার সাথে কথা বলে
                অর্ডারটি কনফার্ম করবে সেই পর্যন্ত ধৈর্য ধরুন
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-green-200">
            <FaClock className="text-blue-500 text-lg flex-shrink-0" />
            <p className="text-gray-600 text-sm">
              সাধারণত ৫-১০ মিনিটের মধ্যে কল আসে
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>প্রক্রিয়া চলছে...</span>
            <span>৯৯%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-pulse"
              style={{ width: '99%' }}
            ></div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <span>ঠিক আছে</span>
        </button>

        {/* Footer Note */}
        <p className="text-center text-gray-500 text-xs mt-4">
          ধন্যবাদ! আপনার আস্থার জন্য
        </p>
      </div>
    </div>
  );
}

export default SuccessModal;
