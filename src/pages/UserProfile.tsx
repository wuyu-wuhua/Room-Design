import React from 'react';

const user = {
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: '/images/avatar-demo.jpg',
  daysLeft: 12,
};

const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center pt-24 pb-16">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full border-4 border-pink-400 shadow mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
        <p className="text-gray-700 mb-2">{user.email}</p>
        <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg font-semibold mt-4">
          Plan days left: <span className="font-bold">{user.daysLeft}</span>
        </div>
      </div>
      <div className="w-full flex justify-center py-8">
        <button
          onClick={() => window.history.back()}
          className="bg-gradient-to-r from-blue-300 via-blue-200 to-purple-200 hover:from-blue-400 hover:to-purple-300 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 