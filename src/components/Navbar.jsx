import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Import icons
import { useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'To Do', href: '/todo' },
  { name: 'Profile', href: '/profile' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ page, setPage, loggedIn, setLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation(); 
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const currentPage = navigation.find((item) => item.href === location.pathname);
    if (currentPage) {
      setPage(currentPage.name);
    }
  }, [location.pathname, setPage]);

  const handleNavigation = (name, href) => {
    navigate(href);
    setPage(name);
  };

  const handleLogout = async () => {
    try{
        const response = await axios.post(
            `${API_BASE_URL}/api/user/logout`,
            {},
            {withCredentials: true}
        );
        toast.success('Logout successful!');
        setLoggedIn(false);
        navigate('/');
    }
    catch(err){
        console.error('Error logout ', err);
        toast.error("Failed to logout. Please try again.")
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <img className="h-8 w-auto" src="src/assets/todo-icon.png" alt="Logo" />
                <div className="hidden sm:ml-6 sm:flex space-x-4">
                  {navigation.map((item) => {
                    if ((item.name === 'To Do' || item.name === 'Profile') && !loggedIn) {
                      return null; 
                    }
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleNavigation(item.name, item.href)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200
                          ${item.name === page ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                        `}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex sm:hidden flex-1 ml-5">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>

              <div className="flex items-center space-x-4">
                {loggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigation('Login', '/login')}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleNavigation('Register', '/register')}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                if ((item.name === 'To Do' || item.name === 'Profile') && !loggedIn) {
                  return null; 
                }
                return (
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
                );
              })}
            </div>
          </DisclosurePanel>
          
          <ToastContainer position='bottom-right' autoClose={1000} hideProgressBar />
          
        </>
      )}
    </Disclosure>
  );
}