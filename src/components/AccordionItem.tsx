import React, { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpenInitially?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpenInitially = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenInitially);

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden shadow-md bg-gray-800 hover:border-pink-500/50 transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-5 sm:p-6 focus:outline-none focus:bg-gray-700/50 transition-colors duration-200"
      >
        <h3 className="text-base sm:text-lg font-semibold text-white">{question}</h3>
        <span className="text-xl sm:text-2xl text-gray-400 flex-shrink-0 font-light">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="p-5 sm:p-6 border-t border-gray-700 bg-gray-800/50">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionItem; 