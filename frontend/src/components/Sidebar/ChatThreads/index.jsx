import { MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const ChatHistorySection = ({ isExpanded, chatHistoryExpanded, setChatHistoryExpanded }) => {

    const [chatHistoryItems, setChatHistoryItems] = useState([]);
    const navigate = useNavigate();

    const handleGetThreads = () => {
        //todo fetch threads from backend and set it to state
    }

    useEffect(() => {
        // Fetch chat threads when the component mounts
        // handleGetThreads();
    }, []);


    return (
        <div>
            {/* Section Header */}
            <div
                className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} px-3 py-2 cursor-pointer hover:bg-gray-800`}
                style={{
                    opacity: chatHistoryExpanded ? 1 : 0.5,
                    color: '#FFF',
                    fontSize: '14px',
                    borderRadius: '4px',
                }}
                onClick={() => isExpanded && setChatHistoryExpanded(!chatHistoryExpanded)}
                title={!isExpanded ? 'Chat History' : ''}
            >
                <div className={`flex items-center ${isExpanded ? 'space-x-3' : ''}`}>
                    <MessageSquare size={20} />
                    {isExpanded && <span>Chat History</span>}
                </div>
                {isExpanded &&
                    (chatHistoryExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </div>

            {/* History Items */}
            {isExpanded && chatHistoryExpanded && (
                <div className="ml-6 mt-2 space-y-1 relative max-h-70 overflow-y-auto">
                    {/* <div className="absolute left-0 top-0  w-px  max-h-70 bg-gray-600"></div> */}
                    <div className="border-l border-gray-600">
                        {chatHistoryItems.map((item, index) => {
                            const isActive = window.location.pathname === `/threads/${item.id}`;
                            return (
                                <>

                                    <div
                                        key={index}
                                        onClick={() => {
                                            navigate(`/threads/${item.id}`);
                                        }}
                                        className="flex items-center px-3 py-2  hover:bg-[#FFF]/3 hover:opacity-100 cursor-pointer relative"
                                        style={{
                                            borderRadius: isActive ? '5.158px' : undefined,
                                            background: isActive && 'rgba(255, 255, 255, 0.03)',
                                            color: isActive ? '#FFF' : 'rgba(255, 255, 255, 0.50)',
                                            fontFeatureSettings: "'liga' off, 'clig' off",
                                            fontSize: '13px',
                                            fontWeight: 400,
                                            lineHeight: '17.193px',
                                        }}
                                    >
                                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-px bg-gray-600"></div>
                                        <div className="flex items-center space-x-3 ml-4 truncate">
                                            {item.title}
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatHistorySection;
