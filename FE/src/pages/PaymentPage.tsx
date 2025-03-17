import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const benefits = [
    'Access to all AI models including GPT-4 and DALL-E 3',
    'Unlimited generations with priority queue access',
    'Priority processing with dedicated GPU resources',
    'Advanced customization of model parameters',
    'Full REST API access with comprehensive documentation',
    'Dedicated technical support with 24/7 availability'
  ];

  // Function to load Razorpay checkout script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to handle the payment process
  const handlePayment = async () => {
    setLoading(true);

    // Load Razorpay checkout script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load Razorpay SDK. Please check your internet connection.');
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create an order by calling your backend API
      const response = await axios.post('http://localhost:5000/create-order');
      const { id: order_id, amount, currency } = response.data;

      // Step 2: Configure Razorpay payment options
      const options = {
        key: import.meta.env.VITE_APP_RAZ_API_KEY, // Use the environment variable
        amount: amount.toString(), // Amount in paise
        currency: currency,
        name: 'Synth AI Suite',
        description: 'Upgrade to Pro Plan',
        image: 'https://your-website.com/logo.png', // Optional: Add your logo URL
        order_id: order_id, // Order ID from backend
        handler: function (response: any) {
          // Handle successful payment
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
          console.log(response);
          // Optionally, redirect to a success page or update UI here
          navigate('/dashboard'); // Redirect to dashboard after successful payment
        },
        prefill: {
          name: 'John Doe', // Prefill user details (optional)
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        notes: {
          plan: 'Pro Plan',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Step 3: Open Razorpay checkout modal
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (response: any) {
        // Handle payment failure
        alert('Payment failed. Please try again. Error: ' + response.error.description);
        console.error(response.error);
      });
      paymentObject.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center py-12">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Home
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Upgrade to Pro</h1>
        <p className="text-gray-600 mb-6 text-center">
          Unlock all features of Synth AI Suite for just $29/month.
        </p>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pro Plan Includes:</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <motion.button
          onClick={handlePayment}
          disabled={loading}
          className={`block w-full py-3 text-center rounded-lg text-white font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          } transform hover:scale-105 transition-transform`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? 'Processing...' : 'Upgrade to Pro'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentPage;