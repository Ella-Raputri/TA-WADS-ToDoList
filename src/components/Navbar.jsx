import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'To Do', href: '/todo', current: false },
  { name: 'Profile', href: '/profile', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const navigate = useNavigate();
  const [page, setPage] = useState("Home");

  const handleNavigation = (name, href) => {
    navigate(href);
    setPage(name);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <img
                  className="h-8 w-auto"
                  src="src/assets/todo-icon.png"
                  alt="Logo"
                />
                <div className="hidden sm:ml-6 sm:flex space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.name, item.href)}
                      className={classNames(
                        item.name === page ? 'bg-gray-950 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium transition duration-200'
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="button"
                  onClick={() => handleNavigation(item.name, item.href)}
                  className={classNames(
                    item.name === page ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-200'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
