import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowRightIcon,
  AttachmentIcon,
  ExternalLinkIcon,
} from "../../icons";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas-pro';
import { Check, CopyIcon, PenLine } from "lucide-react";
import MicToText from "../Audio/MicToText";
import { useLocation, useParams } from "react-router-dom";
import RelatedQuestionsScreen from "../RelatedSearch";
import { Fragment } from "react";
import BlockRenderer from "../Block/BlockRenderer";


const Message = ({ handleSendMessage, message, messages, setMessage, inputDisabled, isStreaming }) => {

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const messageRefs = useRef({});
  const params = useParams()
  const THREAD_ID = params?.threadId || null
  const [copied, setCopied] = useState('');

  const fileInputRef = useRef(null);


  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(textToCopy);
      setTimeout(() => setCopied(''), 5000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };


  const handleIconClick = () => {
    console.log('Attachment icon clicked');
    fileInputRef.current.click(); // trigger file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };


  const scrollToBottom = () => {
    if (messages[messages.length - 1]?.role === "user") return
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleTextExport = async (msgId) => {
    const element = messageRefs.current[msgId];
    if (!element) return;
    const clone = element.cloneNode(true);
    clone.style.padding = "2rem";
    clone.style.backgroundColor = "#ffffff";
    clone.style.color = "#000000";
    clone.style.padding = "20px";
    clone.style.width = "fit-content";
    clone.style.maxWidth = "800px";
    clone.querySelectorAll("*").forEach(el => {
      el.style.color = "#000000";
    });
    document.body.appendChild(clone);
    try {
      // Capture the section
      const canvas = await html2canvas(clone, {
        scale: 1.5,
        backgroundColor: "#ffffff",
        ignoreElements: (el) => el.hasAttribute("data-html2canvas-ignore"),
      });
      document.body.removeChild(clone); // cleanup
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save(`message-${msgId}.pdf`);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  const handleGraphExport = async (msgId) => {
    const element = messageRefs.current[msgId];
    if (!element) return;

    // Clone element
    const clone = element.cloneNode(true);
    clone.style.padding = "2rem";
    // Replace <svg> with <img> for Recharts export
    const originalSvgs = element.querySelectorAll("svg");
    const cloneSvgs = clone.querySelectorAll("svg");

    originalSvgs.forEach((svg, i) => {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const img = document.createElement("img");
      img.src = url;

      const { width, height } = svg.getBoundingClientRect();
      img.width = Math.round(width);
      img.height = Math.round(height);
      img.style.width = width + "px";
      img.style.height = height + "px";

      const target = cloneSvgs[i];
      if (target?.parentNode) {
        target.parentNode.replaceChild(img, target);
      }
    });

    // Add to DOM for html2canvas to render
    document.body.appendChild(clone);

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        ignoreElements: (el) => el.hasAttribute("data-html2canvas-ignore"),
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = (canvas.height * pageWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save(`message-${msgId}.pdf`);
    } catch (err) {
      document.body.removeChild(clone);
      console.error("Export failed", err);
    }
  }

  const handleExport = async (msgId, isGraph) => {

    if (!isGraph) {
      handleTextExport(msgId)
    } else {
      handleGraphExport(msgId)
    }

  };



  const handleReWriteMessage = (index) => {
    const msg = messages[index - 1]
    setMessage(msg.text)
  }

  const handleSuggestionClick = useCallback((data) => {
    setMessage(data)
  }, [])

  return (
    <div className="min-h-screen bg-[#121312] text-white flex flex-col w-full">
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6"
      >
        {messages.map((msg, index) => {
          const isLastMsg = messages.length - 1 === index;

          return (
            <Fragment key={msg?.id}>
              <div
                key={msg?.id}
                ref={(el) => (messageRefs.current[msg.id] = el)}
                className="max-w-4xl mx-auto"
              >

                {msg?.role === "user" && (
                  // User message
                  <div className="font-normal mb-6 text-2xl">
                    {msg?.text}
                  </div>
                )}

                {msg?.role === "assistant" && (
                  <div>
                    {(msg?.blocks || []).map((block, blockIndex) => (
                      <div key={blockIndex} className="mb-4">
                        <BlockRenderer block={block} />
                      </div>
                    ))}
                  </div>
                )}

                {msg?.role === 'assistant' && !isStreaming && (
                  <div data-html2canvas-ignore className="flex flex-wrap gap-4 border-b border-gray-700 pb-5">
                    <button
                      onClick={() => handleReWriteMessage(index)}
                      className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white text-sm"
                    >
                      <PenLine size={11} /> Rewrite
                    </button>
                    <button
                      onClick={() => handleCopy(msg.blocks?.map(b => b.text || '').join('\n'))}
                      className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white text-sm"
                    >
                      {copied ? <Check size={11} /> : <CopyIcon size={11} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={() => handleExport(msg.id, false)}
                      className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white text-sm"
                    >
                      <ExternalLinkIcon /> Export
                    </button>
                  </div>
                )}
              </div>
            </Fragment>
          )
        })}


        {!isStreaming && !inputDisabled &&
          <RelatedQuestionsScreen message={messages} onClick={(data) => handleSuggestionClick(data)} />
        }
        <div ref={messagesEndRef} id="messagesEnd" />

      </div>

      {/* Input Section - Fixed at Bottom */}
      <div className="bg-[#121312] border-gray-700 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
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
                disabled={inputDisabled}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent text-white placeholder-white outline-none text-base"
              />

              {/* Right Icons */}
              <div className="flex items-center space-x-2 ml-3">
                <MicToText setMessage={setMessage} />
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={handleSendMessage}
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Message;
