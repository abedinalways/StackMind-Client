import React, { useState } from 'react';
import toast from 'react-hot-toast';
import mascot from '../assets/mascot.png'
const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    toast.success('🎉 Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-[#f1f5f9] to-[#e2ecf5] rounded-xl shadow-lg text-center font-[sora] h-120">
      <img
        src={mascot}
        alt="Newsletter mascot"
        className="bg-blue-200 p-4 btn-circle w-30 mx-auto mb-4 shadow-2xl rounded-full"
      />
      <p className="text-xs bg-white text-red-600 px-4 py-3 inline-block rounded-xl font-semibold mb-2 shadow-sm border">
        Email Newsletter
      </p>
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        Useful front-end & UX tips, delivered once a week.
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Get tools and tips to help your work shine. Subscribe and receive our{' '}
        <a
          href="#"
          className="text-blue-600 font-medium underline hover:text-blue-800"
        >
          Smart Design PDF
        </a>{' '}
        in your inbox. 🎁
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-md overflow-hidden shadow-md mt-4"
      >
        <input
          type="email"
          className="w-full px-4 py-2 text-sm focus:outline-none"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white text-sm px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Submit!
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-500">
        On <span className="underline">front-end & UX</span>. Trusted by
        200,000+ folks.
      </p>
    </div>
  );
};

export default Newsletter;
