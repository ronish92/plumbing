'use client';

import { User, Building2 } from 'lucide-react';

type UserType = 'user' | 'company';

interface UserTypeSelectorProps {
  onSelect: (type: UserType) => void;
}

interface Role {
  id: UserType;
  title: string;
  button: string;
  description: string;
  icon: React.ReactNode;
}

export default function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  const roles: Role[] = [
    {
      id: 'user',
      title: 'User',
      button: 'Continue as user',
      description:
        'Connect with our experienced professionals which will deliver exceptional service.',
      icon: <User className="h-10 w-10" />,
    },
    {
      id: 'company',
      title: 'Company',
      button: 'Register as Company',
      description:
        'Grow your reach by offering high-quality services and building long-term clients.',
      icon: <Building2 className="h-10 w-10" />,
    },
  ];

  return (
    <div className="w-full max-w-3xl bg-[#f5f5f7] rounded-3xl p-12 shadow-md border border-gray-100">
      {/* Header */}
      <div className="mb-10 text-center md:text-left md:pl-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-wide uppercase">
          Select User Type
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md">
          Please choose how you plan to use our platform so we can customize your
          experience.
        </p>
        
      </div>

      {/* Role Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="group flex flex-col items-center p-8 rounded-2xl aspect-square transition-all duration-300 border shadow-sm hover:shadow-xl hover:-translate-y-1 bg-white text-gray-700 border-gray-200/50"
          >
            <div className="mb-4 text-orange-400  group-hover:text-lime-400 transition duration-500 ease-in-out group-hover:[transform:rotateY(360deg)]">
              {role.icon}
            </div>

            <span className="font-semibold text-base tracking-wide mb-2">
              {role.title}
            </span>

            <p className="text-sm text-center px-2 line-clamp-3 leading-relaxed text-gray-500">
              {role.description}
            </p>

            <div className="mt-2 pt-6 w-full flex justify-center">
              <button
                type="button"
                onClick={() => onSelect(role.id)}
                className="w-full sm:w-auto px-8 py-3 rounded-xl font-medium tracking-wide transition-all duration-200 bg-orange-500 text-white hover:bg-lime-400 cursor-pointer shadow-md hover:shadow-lg"
              >
                {role.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}