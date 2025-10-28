import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaBox,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaLaptop,
  FaMobile,
  FaTshirt,
  FaHome,
  FaBook,
  FaCouch,
  FaSearch,
  FaFilter,
  FaDownload,
  FaCalendar,
  FaArrowRight,
} from 'react-icons/fa';

const Statistics = () => {
  const [orders, setOrders] = useState([]);
  console.log(orders);

  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://rifi-bazar.vercel.app/get-orders');
        setOrders(res.data.slice(0, 6)); // Show only recent orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const statsData = {
    totalSales: 1254300,
    totalOrders: 1248,
    totalCustomers: 892,
    totalProducts: 156,
    revenue: 8900,
    averageOrder: 2042,
    salesChange: 12.5,
    ordersChange: 8.3,
    customersChange: 5.7,
    revenueChange: 15.2,
  };

  // Enhanced order status data
  const orderStatusData = [
    {
      status: 'Delivered',
      percentage: 65,
      count: 811,
      color: '#10B981',
      icon: '✓',
    },
    {
      status: 'Processing',
      percentage: 18,
      count: 225,
      color: '#F59E0B',
      icon: '⟳',
    },
    {
      status: 'Shipped',
      percentage: 12,
      count: 150,
      color: '#3B82F6',
      icon: '🚚',
    },
    {
      status: 'Cancelled',
      percentage: 5,
      count: 62,
      color: '#EF4444',
      icon: '✕',
    },
  ];

  // Enhanced Stat Card Component
  const StatCard = ({
    title,
    value,
    icon,
    change,
    isPositive,
    prefix = '',
  }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">
            {prefix}
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              isPositive
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {isPositive ? (
              <FaArrowUp className="mr-1" size={10} />
            ) : (
              <FaArrowDown className="mr-1" size={10} />
            )}
            <span>{change}%</span>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
    </div>
  );

  // Enhanced Circular Chart Component
  const CircularChart = ({ data, title, type = 'products' }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaCalendar className="w-4 h-4" />
            <span>This month</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center">
          <div className="relative w-48 h-48 flex items-center justify-center mb-6 lg:mb-0">
            <svg className="w-full h-full transform -rotate-90">
              {data.map((item, index) => {
                const strokeDashoffset =
                  circumference - (item.percentage / 100) * circumference;
                return (
                  <circle
                    key={index}
                    cx="50%"
                    cy="50%"
                    r={radius}
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="16"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-gray-800">
                {type === 'products'
                  ? data.reduce((acc, curr) => acc + curr.percentage, 0) + '%'
                  : 'Total'}
              </span>
              <span className="text-sm text-gray-600">
                {type === 'products'
                  ? 'Distribution'
                  : `${statsData.totalOrders} orders`}
              </span>
            </div>
          </div>

          <div className="lg:ml-6 space-y-4 flex-1 min-w-0">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl mr-4 flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-800 truncate">
                      {item.category || item.status}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {type === 'products'
                      ? `${item.value?.toLocaleString()} Tk • ${
                          item.count || item.percentage
                        }%`
                      : `${item.count} orders • ${item.percentage}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl p-6 h-32">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome back! Here's what's happening with your store today.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Today</option>
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
            </select>
            <button className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center">
              <FaDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Revenue"
              value={statsData.revenue}
              icon={<FaMoneyBillWave className="w-6 h-6" />}
              change={statsData.revenueChange}
              isPositive={statsData.revenueChange > 0}
              prefix="Tk "
            />
            <StatCard
              title="Total Orders"
              value={statsData.totalOrders}
              icon={<FaShoppingCart className="w-6 h-6" />}
              change={statsData.ordersChange}
              isPositive={statsData.ordersChange > 0}
            />
            <StatCard
              title="Total Customers"
              value={statsData.totalCustomers}
              icon={<FaUsers className="w-6 h-6" />}
              change={statsData.customersChange}
              isPositive={statsData.customersChange > 0}
            />
            <StatCard
              title="Total Products"
              value={statsData.totalProducts}
              icon={<FaBox className="w-6 h-6" />}
              change={statsData.salesChange}
              isPositive={statsData.salesChange > 0}
            />
          </div>

          {/* Charts and Recent Orders */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:col-span-1 h-[400px] overflow-y-scroll">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Orders
                </h2>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
                  View All <FaArrowRight className="ml-1" size={12} />
                </button>
              </div>
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <div
                    className="flex items-center p-4 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01] group border border-gray-200 shadow-sm hover:shadow-md cursor-pointer"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="relative">
                      <img
                        className="w-14 h-14 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                        src={order.product.image}
                        alt={order.product.title}
                      />
                      <div
                        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                          order.status === 'Delivered'
                            ? 'bg-green-500'
                            : order.status === 'Shipped'
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                        }`}
                      ></div>
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0 mr-4">
                          <p className="text-sm font-semibold text-gray-900 truncate mb-1">
                            {order?.customer?.name || 'Customer'}
                          </p>
                          <p className="text-xs text-gray-600 truncate mb-2">
                            {order?.product?.title}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'delivered'
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : order.status === 'Shipped'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                              }`}
                            >
                              {order.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {order?.combo ? 'Combo' : `${order?.quantity} Kg`}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900 mb-1">
                            {Number(order?.product?.price).toLocaleString()} Tk
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Order Status Chart */}
            <div className="xl:col-span-1">
              <CircularChart
                data={orderStatusData}
                title="Order Status Distribution"
                type="orders"
              />
            </div>
          </div>
          {/* Quick Stats Footer */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">
                  {statsData.averageOrder}
                </div>
                <div className="text-sm text-gray-600">Avg. Order Value</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">24h</div>
                <div className="text-sm text-gray-600">Avg. Delivery</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">4.8</div>
                <div className="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
