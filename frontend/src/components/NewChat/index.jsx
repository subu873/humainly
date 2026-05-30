import React, { useEffect, useRef, useState } from "react";
import {
  StarIcon,
  ArrowRightIcon,
  AttachmentIcon,
  MicrophoneIcon,
} from "../../icons";
import { TrendingUp } from 'lucide-react';
import MicToText from "../Audio/MicToText";


const NewChat = ({ setIsNewMessage, handleSendMessage, message, setMessage }) => {

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestionBox, setShowSuggestionBox] = useState(false)

  const fileInputRef = useRef(null);
  const suggestionBoxRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click(); // trigger file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // do something with the file...
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("outside trigger")
      setShowSuggestionBox(false);
    };

    if (showSuggestionBox) {
      // Use 'click' instead of 'mousedown' to let onClick handlers run first
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showSuggestionBox]);


  const suggestions = [
    'Show me top deals this quarter',
    'Break down pipeline by stage',
    'Show me recent contacts',
    'Who owns what deals?',
    'What is my recent activity?',
    'Give me the Northwind Traders account overview',
    'Show me the deal timeline',
    'Show me the forecast',
  ];
  const handleKeyPress = (e) => {
    if (message?.lengh == 0) {
      return
    }
    setShowSuggestionBox(true)
    if (e.key === "Enter") {
      handleSendMessage()
      setIsNewMessage(true);
    }
  };


  useEffect(() => {
    if (!message) {
      setShowSuggestionBox(false)
    } else {
      setShowSuggestionBox(true)
    }

  }, [message])

  return (
    <div className="min-h-screen bg-[#121312] text-white flex flex-col w-full">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Dashboard Title */}


        {/* Message Input Section */}
        <div className="w-full max-w-3xl mb-1 mt-[100px]">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white font-['Space_Grotesk']">
              Humainly <span className="font-normal">dashboard</span>
            </h1>
            <h6 className="text-[#848588] font-['DM_Sans'] text-[16px] mt-4 text-md max-w-xlg mx-auto">
              Next generation <strike>
                CRM
              </strike>
              <span className="text-white">
                &nbsp; PRM  — People Relationship Management
              </span>
            </h6>
          </div>
          <div className="relative">
            <div
              className="flex items-center bg-[#181818] rounded-full px-4 py-3 border border-[#292929]"
              style={{
                boxShadow:
                  "0 4px 8px -2px rgba(23, 23, 23, 0.10), 0 2px 4px -2px rgba(23, 23, 23, 0.06)",
              }}
            >

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {/* Attachment Icon */}
              <button
                onClick={handleIconClick}
                className="opacity-[0.4] hover:text-white hover:opacity-100 transition-colors p-1 mr-2 cursor-pointer">
                <AttachmentIcon />
              </button>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Message..."
                value={message}
                onChange={({ target }) => setMessage(target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent text-white placeholder-white outline-none text-base"
              />

              {/* Right Icons */}
              <div className="flex items-center space-x-2 ml-3">
                <MicToText setMessage={setMessage} />

                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => { handleSendMessage(); setIsNewMessage(true) }}
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>


        <div
          ref={suggestionBoxRef}
          className={`w-full max-w-3xl transition-all duration-300 ease-in-out transform ${showSuggestionBox
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 translate-y-2 invisible'
            }`}
        >
          <div className="bg-[#1E1E1E] rounded-xl p-2 space-y-1">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={(e) => {
                  console.log("trigger inside sugges")
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedIndex(-1)
                  setMessage(suggestion);
                  setTimeout(() => {
                    setShowSuggestionBox(false);
                  }, 500)
                }}
                className={`flex items-center space-x-4 p-2 rounded-xl cursor-pointer transition-colors duration-150 ${selectedIndex === index
                  ? 'text-white bg-[#2A2A2A]'
                  : 'text-[#919191] hover:text-[#CCCCCC]'
                  }`}
              >
                <TrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm flex-1">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default NewChat;
