
import React, { RefObject } from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';


interface DropdownRightMenuProps {
  label: string;
  icon ? : LucideIcon;
  children: React.ReactNode;
  isOpen: boolean;
  toggle: () => void;
  containerRef: RefObject<HTMLDivElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const DropdownRightMenu = ({ 
  label, 
  icon: Icon, 
  children, 
  isOpen, 
  toggle, 
  containerRef, 
  onMouseEnter, 
  onMouseLeave 
}: DropdownRightMenuProps) => {
  return (
    <div 
      className="relative" 
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button 
        onClick={toggle}
        className="flex items-center gap-1 text-slate-dark hover:text-blue-dark hover:bg-gray-100 transition-colors duration-300 text-sm font-medium whitespace-nowrap"
      >
      
        <span>{label}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-52 -ml-24 bg-white rounded-md shadow-lg py-2 z-100 grid grid-cols-1 max-h-[70vh] overflow-y-auto"
        >
          {children}
        </div>
      )}
    </div>
  );
};
