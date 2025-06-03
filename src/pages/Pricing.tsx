import React, { useState } from 'react';
import DesignNavbar from '../components/DesignNavbar';

const plans = [
  {
    name: 'Starter AI',
    priceMonthly: '$29',
    priceYearly: '$17',
    yearlyFull: '$288 billed yearly',
    features: [
      '500 AI design generations/mo',
      'Access to core styles',
      'Standard image resolution',
      'Personal use license',
      'Community support',
    ],
  },
  {
    name: 'Pro AI Designer',
    priceMonthly: '$59',
    priceYearly: '$42',
    yearlyFull: '$588 billed yearly',
    features: [
      '2,000 AI design generations/mo',
      'Access to all 50+ styles',
      'High-resolution images',
      'Sketch & 3D model uploads',
      'Commercial use license',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Studio AI Suite',
    priceMonthly: '$199',
    priceYearly: '$142',
    yearlyFull: '$1980 billed yearly',
    features: [
      '10,000 AI design generations/mo',
      'All Pro features, plus:',
      'Batch image processing',
      'Team collaboration tools (beta)',
      'API access (coming soon)',
      'Dedicated account manager',
    ],
  },
];

const Pricing: React.FC = () => {
  // 假设套餐还有3天到期
  const daysLeft = 3;
  const [billingType, setBillingType] = useState('yearly');
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  return (
    <div className="bg-gray-900 min-h-screen text-white pt-20">
      <DesignNavbar />
      <div className="container mx-auto px-4 py-12">
        {daysLeft <= 5 && (
          <div className="bg-yellow-400 text-yellow-900 font-bold px-6 py-3 rounded-lg mb-8 text-center text-lg shadow-lg">
            Your package will expire in {daysLeft} days, please renew in time!
          </div>
        )}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">Simple Plans for Every Design Need</h2>
        {/* 月/年切换按钮 */}
        <div className="flex justify-center mb-10 gap-4">
          <button
            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 ${billingType === 'monthly' ? 'bg-blue-500 text-white border-blue-500 shadow-lg' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}`}
            onClick={() => setBillingType('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 border-2 ${billingType === 'yearly' ? 'bg-purple-500 text-white border-purple-500 shadow-lg' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}`}
            onClick={() => setBillingType('yearly')}
          >
            ✨Yearly Get 6+ Months Free with Yearly!
          </button>
        </div>
        {/* 价格栏 */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`bg-gray-800 p-8 rounded-lg shadow-xl border-2 flex flex-col transition-all duration-200 cursor-pointer ${plan.popular ? 'border-blue-500' : 'border-gray-700'} ${selectedPlan === idx ? 'ring-4 ring-blue-400 scale-105 z-10' : 'hover:ring-2 hover:ring-blue-300 hover:scale-105'}`}
              onMouseEnter={() => setSelectedPlan(idx)}
              onMouseLeave={() => setSelectedPlan(null)}
              onClick={() => setSelectedPlan(idx)}
            >
              {plan.popular && <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Most Popular</span>}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-4xl font-extrabold text-white mb-1">
                {billingType === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                <span className="text-base font-normal text-gray-400">/mo</span>
              </p>
              {billingType === 'yearly' && (
                <p className="text-sm text-gray-400 mb-6">{plan.yearlyFull}</p>
              )}
              <ul className="space-y-3 text-gray-300 mb-8 flex-grow">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-300 via-blue-200 to-purple-200 hover:from-blue-400 hover:to-purple-300 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-center">Recharge now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 