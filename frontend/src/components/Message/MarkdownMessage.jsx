import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./fade.css";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownMessage = ({ markdown }) => {
    const wordIndexRef = useRef(0);

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
        >
            {markdown}

        </ReactMarkdown>
    );
};

export default MarkdownMessage;
