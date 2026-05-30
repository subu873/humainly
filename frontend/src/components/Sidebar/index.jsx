import React, { useEffect, useState } from 'react';
import {
  Home,
  LogOut,
  Plus
} from 'lucide-react';
import ChatHistorySection from './ChatThreads';
import { useLocation, useNavigate } from 'react-router-dom';
import { DELETE_COOKIE } from '../../helper/commonFunction';

// Overview Component
const OverviewSection = ({ isExpanded }) => {
  const location = useLocation();
  const isActive = location.pathname === '' || location.pathname === '/';
  return (
    <div
      className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} px-3 py-2 cursor-pointer hover:bg-gray-800`}
      style={{
        color: '#FFF',
        opacity: isActive ? 1 : 0.5,
        fontSize: '14px',
        borderRadius: '4px',
      }}
      onClick={() => window.open("/", "_self")}
      title={!isExpanded ? 'Controls' : ''}
    >
      <div className={`flex items-center ${isExpanded ? 'space-x-3' : ''}`}>
        <Home size={20} />
        {isExpanded && <span>Overview</span>}
      </div>
    </div>
  );
};


const AddNewChatSection = ({ isExpanded, isActive = false }) => {
  return (
    <div
      className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} px-3 py-2 cursor-pointer mb-16 hover:bg-gray-800 `}
      style={{
        color: '#FFF',
        fontSize: '14px',
        borderRadius: '4px',
      }}
      onClick={() => window.open("/", "_self")}
      title={!isExpanded ? 'Controls' : ''}
    >
      <div className={`flex items-center ${isExpanded ? 'space-x-3' : ''}`}>
        <Plus size={15} className='w-8 h-8 p-1 bg-gray-700 rounded-full flex items-center justify-center' />
        {isExpanded && <span>New Chat</span>}
      </div>
    </div>
  );
};


// Logout Component
const LogoutSection = ({ isExpanded }) => {

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    DELETE_COOKIE("Authorization");
    window.open("/", "_self");
  }

  return (
    <div
      className={`flex items-center ${isExpanded ? 'px-3 py-2 space-x-3' : 'px-0 justify-center'}  cursor-pointer hover:bg-gray-800`}
      style={{
        borderRadius: '4px',
        color: '#FFF',
        fontSize: '14px'
      }}
      onClick={handleLogout}
      title={!isExpanded ? "Logout" : ""}
    >
      <LogOut size={25} style={{ color: 'rgba(255, 255, 255, 0.50)' }} />
      {isExpanded && <span style={{ color: 'rgba(255, 255, 255, 0.50)' }}>Logout</span>}
    </div>
  );
};

// Main Sidebar Component
const Sidebar = () => {

  const location = useLocation()

  const [isExpanded, setIsExpanded] = useState(false);
  const [controlsExpanded, setControlsExpanded] = useState(false);
  const [chatHistoryExpanded, setChatHistoryExpanded] = useState(false);

  useEffect(() => {
    if (location.pathname === '/threads' || location.pathname.startsWith('/threads/')) {
      setChatHistoryExpanded(true)
    }
  }, [])

  return (
    <div
      className={`${isExpanded ? 'w-64' : 'w-16'} h-screen flex flex-col transition-all duration-300 hover:w-64`}
      style={{ backgroundColor: '#181818', fontFamily: 'DM Sans' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-4" style={{ borderBottom: '1px solid #2E2E2E' }}>
        <div className="flex items-center justify-between">
          {isExpanded ? (
            <div className="pl-3 flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">M</span>
              </div>
              <span className="font-medium text-white">Mike Williams</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">M</span>
            </div>
          )}

        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">

          <AddNewChatSection isExpanded={isExpanded} />
          {/* Overview */}
          <OverviewSection isExpanded={isExpanded} />

          {/* Border after Overview */}
          <div style={{ borderBottom: '1px solid #2E2E2E', margin: '8px 0' }}></div>

          {/* Chat History Section */}
          <ChatHistorySection
            isExpanded={isExpanded}
            chatHistoryExpanded={chatHistoryExpanded}
            setChatHistoryExpanded={setChatHistoryExpanded}
          />


        </nav>
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: '1px solid #2E2E2E' }}>
        <div className="px-4 py-4">
          <LogoutSection isExpanded={isExpanded} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;