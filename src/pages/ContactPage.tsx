import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen pt-24 sm:pt-28 md:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent pb-2 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out for support, partnership, or just to say hello.
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-12 items-stretch justify-center">
          {/* Left: Contact Info */}
          <div className="flex-1 min-w-[320px] max-w-xl bg-gradient-to-br from-[#232b3a] via-[#1a1f29] to-[#232b3a] rounded-3xl shadow-2xl p-10 flex flex-col items-start border border-blue-900/40 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/10 rounded-full blur-2xl z-0" />
            <h2 className="text-2xl font-bold mb-6 text-blue-200 relative z-10">Contact Information</h2>
            <div className="flex items-center mb-4 text-lg relative z-10"><Mail className="mr-3 text-blue-300" /> support@aiinteriordesign.com</div>
            <div className="flex items-center mb-4 text-lg relative z-10"><Phone className="mr-3 text-blue-300" /> +1 234 567 8901</div>
            <div className="flex items-center mb-6 text-lg relative z-10"><MapPin className="mr-3 text-blue-300" /> 123 AI Street, San Francisco, CA</div>
            <div className="flex space-x-4 mt-2 relative z-10">
              <a href="#" className="text-blue-400 hover:text-blue-300"><Linkedin size={24} /></a>
              <a href="#" className="text-blue-400 hover:text-blue-300"><Twitter size={24} /></a>
              <a href="#" className="text-blue-400 hover:text-blue-300"><Facebook size={24} /></a>
            </div>
          </div>
          {/* Right: Contact Form */}
          <div className="flex-1 min-w-[320px] max-w-xl bg-gradient-to-br from-[#232b3a] via-[#1a1f29] to-[#232b3a] rounded-3xl shadow-2xl p-10 flex flex-col border border-blue-900/40 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-400/30 via-blue-400/20 to-purple-400/10 rounded-full blur-2xl z-0" />
            <h2 className="text-2xl font-bold mb-6 text-blue-200 relative z-10">Send Us a Message</h2>
            <form className="space-y-6 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input type="text" name="name" id="name" autoComplete="name" className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition-shadow shadow-md focus:shadow-blue-500/50" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input type="email" name="email" id="email" autoComplete="email" className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition-shadow shadow-md focus:shadow-blue-500/50" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition-shadow shadow-md focus:shadow-blue-500/50" placeholder="Your message..."></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-white font-bold py-3 px-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 