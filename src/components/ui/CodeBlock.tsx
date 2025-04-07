
import React from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock = ({ code, language = "typescript", className }: CodeBlockProps) => {
  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    if (!code) return "";

    // Replace keywords
    const processedCode = code
      .replace(
        /(import|export|const|let|var|function|return|if|else|for|while|class|interface|extends|implements|type|new|from|as|async|await|try|catch|throw|static|public|private|protected|get|set)/g,
        '<span class="code-keyword">$1</span>'
      )
      .replace(
        /\b(useState|useEffect|useRef|useMemo|useCallback|createContext|useContext)\b/g,
        '<span class="code-function">$1</span>'
      )
      // Strings
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="code-string">$1</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="code-number">$1</span>')
      // Comments
      .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="code-comment">$1</span>')
      // JSX tags
      .replace(/(&lt;[\/\w\s="'-:.]+&gt;)/g, '<span class="code-operator">$1</span>')
      // Object properties
      .replace(/(\w+):/g, '<span class="code-property">$1</span>:');

    return processedCode;
  };

  // Convert code to lines with line numbers
  const formatCode = (code: string) => {
    const lines = code.split("\n");
    return lines.map((line, index) => (
      <div key={index} className="code-line">
        <span className="mr-4 inline-block w-6 text-right opacity-50">{index + 1}</span>
        <span dangerouslySetInnerHTML={{ __html: highlightCode(line) }} />
      </div>
    ));
  };

  return (
    <div
      className={cn(
        "code-container text-sm my-4 max-h-[500px]",
        className
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-muted-foreground">{language}</span>
      </div>
      <div className="overflow-x-auto">
        {formatCode(code)}
      </div>
    </div>
  );
};

export default CodeBlock;
