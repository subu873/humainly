// components/blocks/TextBlock.jsx
import MarkdownMessage from "../Message/MarkdownMessage";


export default function TextBlock({ block }) {
    return (
        <div className="text-gray-300 leading-relaxed">
            <MarkdownMessage markdown={block.text} />
        </div>
    );
}