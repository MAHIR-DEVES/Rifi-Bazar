import { useRef, useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Heading from '../../components/Heading';
import Video from '../../components/Video';
import BookDetails from '../../components/BookDetails';
import CheckoutModal from '../../components/CheckoutModal';
import ContactIcon from '../../components/ContactIcon';
import Footer from '../../components/Footer';

const Home = () => {
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const books = [
    {
      id: 1,
      title: 'Premium Organic Honey',
      author: 'Nature Harvest Farm',
      price: 149,
      originalPrice: 19.99,
      rating: 4.8,
      reviews: 1560,
      description:
        '100% pure, raw, and unfiltered honey collected from organic flower fields. Perfect for boosting immunity and adding natural sweetness to your meals.',
      image:
        'https://fargofood.com/wp-content/uploads/2025/01/Date-Molasses-Nolen-1.webp',
      features: [
        'No added sugar',
        'Tested for purity',
        'Rich golden color & aroma',
        'Free worldwide shipping',
      ],
      details: {
        weight: '500g',
        origin: 'Bangladesh',
        ingredients: 'Pure Raw Honey',
        expiryDate: 'December 2025',
        manufacturer: 'Nature Harvest Farm',
      },
    },
    {
      id: 2,
      title: 'Premium Basmati Rice',
      author: 'Golden Grain Mills',
      price: 2289,
      originalPrice: 24.99,
      rating: 4.9,
      reviews: 3120,
      description:
        'Aged long grain basmati rice known for its fragrant aroma and soft texture. Perfect for biryani, pulao, and special meals.',
      image:
        'https://media.istockphoto.com/id/467990429/photo/date-molasses-on-wooden-bowl.jpg?s=612x612&w=0&k=20&c=Tr3VFPjOVJcDPSgPz2VtYcTUmWwQmX5NVKpug696quY=',
      features: [
        'Aged for 2 years',
        'Extra long grains',
        'No artificial additives',
        '30-day money-back guarantee',
      ],
      details: {
        weight: '5kg',
        origin: 'India',
        ingredients: 'Premium Basmati Rice',
        expiryDate: 'July 2026',
        manufacturer: 'Golden Grain Mills Pvt. Ltd.',
      },
    },
    {
      id: 3,
      title: 'Pure Ghee (Deshi)',
      author: 'Shuddho Dairy',
      price: 229,
      originalPrice: 29.99,
      rating: 4.7,
      reviews: 980,
      description:
        'Traditional deshi ghee made from fresh cow milk. Ideal for cooking, special dishes, and improving health naturally.',
      image:
        'https://media.istockphoto.com/id/1320102839/photo/organic-brown-palm-sugar-or-coconut-sugar-better-known-as-java-sugar-sugar-made-from-coconut.jpg?s=612x612&w=0&k=20&c=nwrs7mWWkda1SXxi7T4ssz-ZQNuPV8ORHqV4LxBKvNA=',
      features: [
        'Rich aroma & authentic taste',
        'Preservative-free',
        'Locally sourced milk',
        'Lifetime access to recipe suggestions',
      ],
      details: {
        weight: '1 liter',
        origin: 'Bangladesh',
        ingredients: 'Pure Cow Milk Ghee',
        expiryDate: 'March 2026',
        manufacturer: 'Shuddho Dairy Farm',
      },
    },
    {
      id: 4,
      title: 'Premium Basmati Rice',
      author: 'Golden Grain Mills',
      price: 189,
      originalPrice: 24.99,
      rating: 4.9,
      reviews: 3120,
      description:
        'Aged long grain basmati rice known for its fragrant aroma and soft texture. Perfect for biryani, pulao, and special meals.',
      image:
        'https://media.istockphoto.com/id/467990429/photo/date-molasses-on-wooden-bowl.jpg?s=612x612&w=0&k=20&c=Tr3VFPjOVJcDPSgPz2VtYcTUmWwQmX5NVKpug696quY=',
      features: [
        'Aged for 2 years',
        'Extra long grains',
        'No artificial additives',
        '30-day money-back guarantee',
      ],
      details: {
        weight: '5kg',
        origin: 'India',
        ingredients: 'Premium Basmati Rice',
        expiryDate: 'July 2026',
        manufacturer: 'Golden Grain Mills Pvt. Ltd.',
      },
    },
    {
      id: 5,
      title: 'Pure Ghee (Deshi)',
      author: 'Shuddho Dairy',
      price: 229,
      originalPrice: 29.99,
      rating: 4.7,
      reviews: 980,
      description:
        'Traditional deshi ghee made from fresh cow milk. Ideal for cooking, special dishes, and improving health naturally.',
      image:
        'https://media.istockphoto.com/id/1320102839/photo/organic-brown-palm-sugar-or-coconut-sugar-better-known-as-java-sugar-sugar-made-from-coconut.jpg?s=612x612&w=0&k=20&c=nwrs7mWWkda1SXxi7T4ssz-ZQNuPV8ORHqV4LxBKvNA=',
      features: [
        'Rich aroma & authentic taste',
        'Preservative-free',
        'Locally sourced milk',
        'Lifetime access to recipe suggestions',
      ],
      details: {
        weight: '1 liter',
        origin: 'Bangladesh',
        ingredients: 'Pure Cow Milk Ghee',
        expiryDate: 'March 2026',
        manufacturer: 'Shuddho Dairy Farm',
      },
    },
    {
      id: 6,
      title: 'Pure Ghee (Deshi)',
      author: 'Shuddho Dairy',
      price: 229,
      originalPrice: 29.99,
      rating: 4.7,
      reviews: 980,
      description:
        'Traditional deshi ghee made from fresh cow milk. Ideal for cooking, special dishes, and improving health naturally.',
      image:
        'https://media.istockphoto.com/id/1320102839/photo/organic-brown-palm-sugar-or-coconut-sugar-better-known-as-java-sugar-sugar-made-from-coconut.jpg?s=612x612&w=0&k=20&c=nwrs7mWWkda1SXxi7T4ssz-ZQNuPV8ORHqV4LxBKvNA=',
      features: [
        'Rich aroma & authentic taste',
        'Preservative-free',
        'Locally sourced milk',
        'Lifetime access to recipe suggestions',
      ],
      details: {
        weight: '1 liter',
        origin: 'Bangladesh',
        ingredients: 'Pure Cow Milk Ghee',
        expiryDate: 'March 2026',
        manufacturer: 'Shuddho Dairy Farm',
      },
    },
  ];

  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = e => {
    e.preventDefault();
    setTimeout(() => {
      // Handle order completion
    }, 2000);
  };

  // ✅ Memoized totalPrice and savings
  const totalPrice = useMemo(
    () => ((selectedBook?.price || 0) * quantity).toFixed(2),
    [selectedBook?.price, quantity]
  );
  const savings = useMemo(
    () =>
      ((selectedBook?.originalPrice || 0) - (selectedBook?.price || 0)) *
      quantity,
    [selectedBook?.originalPrice, selectedBook?.price, quantity]
  );

  // Checkout section ref
  const checkoutRef = useRef(null);

  // ✅ Buy Now handler
  const handleBuyNow = (book = null) => {
    setSelectedBook(book);
    setShowCheckout(true);
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // delay ensures CheckoutModal is rendered before scrolling
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar quantity={quantity} setShowCheckout={setShowCheckout} />
      {/* Heading */}
      <Heading onBuyNow={handleBuyNow} />
      {/* Faq */}
      <Video />
      {/* Book Details or Checkout */}
      {!showCheckout ? (
        <BookDetails
          books={books}
          quantity={quantity}
          setQuantity={setQuantity}
          totalPrice={totalPrice}
          setShowCheckout={setShowCheckout}
          onBuyNow={handleBuyNow}
        />
      ) : (
        <div ref={checkoutRef}>
          <CheckoutModal
            book={selectedBook}
            quantity={quantity}
            setQuantity={setQuantity}
            savings={savings.toFixed(2)}
            totalPrice={totalPrice}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmitOrder={handleSubmitOrder}
            setShowCheckout={setShowCheckout}
          />
        </div>
      )}
      <ContactIcon></ContactIcon>
      <Footer></Footer>
    </div>
  );
};

export default Home;
