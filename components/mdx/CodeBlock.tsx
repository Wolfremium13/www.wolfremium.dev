import React, { useState } from "react";
import Prism from "prismjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "prism-themes/themes/prism-material-oceanic.css";

type CodeBlockProps = {
  children: string;
  className?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const language = className?.replace(/language-/, "") || "plaintext";

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const html = Prism.languages[language]
    ? Prism.highlight(children, Prism.languages[language], language)
    : children;

  const isInlineCode = !className;

  if (isInlineCode) {
    return (
      <code className="bg-gray-800 rounded-lg px-1 py-0.5">{children}</code>
    );
  }

  return (
    <div className="relative">
      <pre className={`prismjs ${className} bg-gray-700/20 rounded-lg p-4`}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      <div className="absolute top-2 right-2">
        <CopyToClipboard text={children} onCopy={handleCopy}>
          <button className="text-xs bg-gray-800 hover:bg-gray-600 rounded px-2 py-1">
            {isCopied ? "Copiado" : "Copiar"}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export { CodeBlock };
