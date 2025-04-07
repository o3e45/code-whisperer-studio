import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const CodeBlock = ({ code, language = "typescript", className }) => {
    // Simple syntax highlighting
    const highlightCode = (code) => {
        if (!code)
            return "";
        // Replace keywords
        const processedCode = code
            .replace(/(import|export|const|let|var|function|return|if|else|for|while|class|interface|extends|implements|type|new|from|as|async|await|try|catch|throw|static|public|private|protected|get|set)/g, '<span class="code-keyword">$1</span>')
            .replace(/\b(useState|useEffect|useRef|useMemo|useCallback|createContext|useContext)\b/g, '<span class="code-function">$1</span>')
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
    const formatCode = (code) => {
        const lines = code.split("\n");
        return lines.map((line, index) => (_jsxs("div", { className: "code-line", children: [_jsx("span", { className: "mr-4 inline-block w-6 text-right opacity-50", children: index + 1 }), _jsx("span", { dangerouslySetInnerHTML: { __html: highlightCode(line) } })] }, index)));
    };
    return (_jsxs("div", { className: cn("code-container text-sm my-4 max-h-[500px]", className), children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsxs("div", { className: "flex space-x-2", children: [_jsx("div", { className: "h-3 w-3 rounded-full bg-red-500" }), _jsx("div", { className: "h-3 w-3 rounded-full bg-yellow-500" }), _jsx("div", { className: "h-3 w-3 rounded-full bg-green-500" })] }), _jsx("span", { className: "text-xs text-muted-foreground", children: language })] }), _jsx("div", { className: "overflow-x-auto", children: formatCode(code) })] }));
};
export default CodeBlock;
