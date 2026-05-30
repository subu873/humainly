import { memo } from 'react';
import { ChevronRight } from 'lucide-react';
const data = [
    {
        "question": "Show me top deals this quarter",
        "suggestions": [
            "Which deals are closing this month?",
            "Who owns the highest value deals?",
            "Show me deals in negotiation stage",
            "What is the total pipeline value?"
        ]
    },
    {
        "question": "Break down pipeline by stage",
        "suggestions": [
            "How many deals are in proposal stage?",
            "What is the average days open per stage?",
            "Which stage has the highest drop-off rate?",
            "Compare this quarter pipeline to last quarter"
        ]
    },
    {
        "question": "Show me recent contacts",
        "suggestions": [
            "Who has the highest engagement score?",
            "Which contacts have not been reached in 30 days?",
            "Show contacts from Northwind Traders",
            "Who should I follow up with today?"
        ]
    },
    {
        "question": "Who owns what deals?",
        "suggestions": [
            "Who is the top performing rep this quarter?",
            "Compare win rates across all reps",
            "Which rep has the most deals in negotiation?",
            "Show me Asha Nair's open pipeline"
        ]
    },
    {
        "question": "What is my recent activity?",
        "suggestions": [
            "Show all calls from this week",
            "Which proposals are still awaiting reply?",
            "What meetings are scheduled this week?",
            "Show activity for Northwind Traders"
        ]
    },
    {
        "question": "Give me the Northwind Traders account overview",
        "suggestions": [
            "What is the last interaction with Northwind?",
            "How many open deals does Northwind have?",
            "Who are the key contacts at Northwind?",
            "Show the full deal timeline for Northwind"
        ]
    },
    {
        "question": "Show me the deal timeline",
        "suggestions": [
            "What is the next step for this deal?",
            "How long has this deal been in negotiation?",
            "When was the proposal sent?",
            "What is the expected close date?"
        ]
    },
    {
        "question": "Show me the forecast for this quarter",
        "suggestions": [
            "What is our expected revenue this quarter?",
            "Which deals are at risk of slipping?",
            "How confident are we in hitting the target?",
            "Show forecast vs actual pipeline"
        ]
    }
]


const RelatedQuestionsScreen = ({ message = "", onClick }) => {

    const messageText = message?.filter((msg) => msg.role === 'user').map((msg) => msg.text).join(' ') || "";
    const finalQuestions = data.find(item => item.question.toLowerCase().includes(messageText.toLowerCase()))?.suggestions || [];

    console.log("messageText", messageText)
    console.log("finalQuestions", finalQuestions)

    if (!finalQuestions || finalQuestions.length == 0) return <></>

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex flex-col gap-1">
                    <div className="w-4 h-0.5 bg-white"></div>
                    <div className="w-4 h-0.5 bg-white"></div>
                    <div className="w-4 h-0.5 bg-white"></div>
                </div>
                <h1 className="text-white text-xl font-medium">Related Questions</h1>
            </div>

            {/* Questions List */}
            <div className="space-y-6 mb-2 ml-4">
                {!!finalQuestions && finalQuestions.length > 0 && finalQuestions.map((question, index) => (
                    <div
                        key={index}
                        onClick={() => onClick(question)}
                        className="flex items-start justify-between gap-4 cursor-pointer hover:bg-gray-800 rounded-lg p-3 mb-1 transition-colors"
                    >
                        <p
                            className="text-[14px] leading-relaxed flex-1"
                            style={{ color: '#E9ECF1' }}
                        >
                            {question}
                        </p>
                        <ChevronRight
                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                            style={{ color: '#E9ECF1' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(RelatedQuestionsScreen);