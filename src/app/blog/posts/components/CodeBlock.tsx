"use client";
import React, {useState} from "react";
import Prism from "prismjs";
import {CopyToClipboard} from "react-copy-to-clipboard";
import "prism-themes/themes/prism-material-oceanic.css";
import "./PrismLangThemes";
import {FaStackOverflow, FaClipboardCheck} from "react-icons/fa";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
}

export const CodeBlock: React.FC<CodeBlockProps> = (
    {
        className,
        children,
        ...rest
    }) => {
    const [isCopied, setIsCopied] = useState(false);
    const language = className?.replace(/language-/, "") || "plaintext";
    const codeText = React.Children.toArray(children).join("");
    let html;
    try {
        html = Prism.highlight(codeText, Prism.languages[language], language);
    } catch (error) {
        console.error("Error al resaltar el código:", error);
        html = children;
    }

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
    };

    const isInlineCode = !className;
    if (isInlineCode) {
        return (
            <code className="bg-gray-800 rounded-lg px-1 py-0.5">{children}</code>
        );
    }

    const baseClasses = "prismjs bg-gray-700/20 rounded-lg";
    const combinedClassName = `${baseClasses} ${className}`;

    return (
        <div className="relative">
      <pre tabIndex={1} className={combinedClassName} {...rest}>
        <code
            className={combinedClassName}
            dangerouslySetInnerHTML={{__html: html as any}}
        />
      </pre>
            <div className="absolute top-2 right-2">
                <CopyToClipboard text={children as any} onCopy={handleCopy}>
                    <button className="text-xs bg-gray-800/40 hover:bg-gray-600 rounded px-2 py-1">
                        {isCopied ? (
                            <FaClipboardCheck size={25} className="text-lightGreen"/>
                        ) : (
                            <FaStackOverflow size={25}/>
                        )}
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    );
};
