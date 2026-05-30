// MicToText.js
import React, { useState, useEffect, useRef } from 'react';
import { Mic, AudioLines } from 'lucide-react';


const MicToText = ({ setMessage }) => {
    const [isSupported, setIsSupported] = useState(false);
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const recognitionRef = useRef(null);

    useEffect(() => {
        // Check if browser supports the API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.interimResults = false;
            recognitionRef.current.maxAlternatives = 1;
            setIsSupported(true);
        }
    }, []);

    const handleSetTranscript = (text) => {
        setMessage(text);
        setTranscript(text);
    };

    const startListening = () => {
        if (listening) return;
        if (!recognitionRef.current) return;

        setListening(true);
        handleSetTranscript('');

        recognitionRef.current.start();

        recognitionRef.current.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            console.log('Recognized text:', speechResult);
            handleSetTranscript(speechResult);
            setListening(false);
        };

        recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setListening(false);
        };

        recognitionRef.current.onend = () => {
            setListening(false);
        };
    };

    if (!isSupported) {
        return <p>Your browser does not support speech recognition.</p>;
    }



    return (

        <button onClick={startListening} disabled={listening} className='cursor-pointer p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors'>
            {listening ? <AudioLines size={24} /> : <Mic size={24} />}
        </button>

    );
};

export default MicToText;
