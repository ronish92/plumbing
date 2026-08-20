"use client";

import { useState, useEffect } from 'react';
import Form from 'next/form';

const PLACEHOLDERS = [
  'Try "Air Conditioner"',
  'Try "Smart TV"',
  'Try "Wireless Headphones"',
  'Try "Gaming Laptop"'
];

export default function SearchBar() {
  const [placeholder, setPlaceholder] = useState('');
  const [currentStringIdx, setCurrentStringIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = PLACEHOLDERS[currentStringIdx];
    
    // Typing speed configurations (in ms)
    const typingSpeed = isDeleting ? 40 : 100;
    const delayBeforeDelete = 2000; // Pause when full word is typed
    const delayBeforeNextWord = 500; // Pause before starting next word

    const handleTimeout = () => {
      if (!isDeleting && currentCharIdx < currentFullText.length) {
        // Typing forward
        setPlaceholder(currentFullText.substring(0, currentCharIdx + 1));
        setCurrentCharIdx((prev) => prev + 1);
      } else if (isDeleting && currentCharIdx > 0) {
        // Deleting backward
        setPlaceholder(currentFullText.substring(0, currentCharIdx - 1));
        setCurrentCharIdx((prev) => prev - 1);
      } else if (!isDeleting && currentCharIdx === currentFullText.length) {
        // Finished typing full word -> Wait, then switch to deleting
        setTimeout(() => setIsDeleting(true), delayBeforeDelete);
        return;
      } else if (isDeleting && currentCharIdx === 0) {
        // Finished deleting -> Switch to next word
        setIsDeleting(false);
        setCurrentStringIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
        return;
      }
    };

    const timer = setTimeout(handleTimeout, currentCharIdx === 0 && !isDeleting ? delayBeforeNextWord : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentCharIdx, isDeleting, currentStringIdx]);

  return (
    <Form 
      action="" 
      className="flex items-stretch w-full max-w-2xl bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden"
    >
      <input
        name="query"
        type="text"
        placeholder={placeholder}
        className="flex-1 px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none text-base bg-transparent min-w-0"
      />
      
      <button
        type="submit"
        aria-label="Submit Search"
        className="flex items-center justify-center px-6 bg-[#F15A24] hover:bg-[#d94e1d] text-white transition-colors cursor-pointer group"
      >
        <svg 
          xmlns="http://w3.org" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-5 h-5 transition-transform group-hover:scale-105"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
        </svg>
      </button>
    </Form>
  );
}
