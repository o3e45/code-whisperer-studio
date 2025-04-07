import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Sparkles } from "lucide-react";
const CTASection = () => {
    return (_jsx("section", { className: "py-24 bg-gradient-to-br from-accent/10 via-primary/10 to-background clip-path-bottom-curve", children: _jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "max-w-3xl mx-auto text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center rounded-full bg-primary/10 p-6 mb-8", children: _jsx(Sparkles, { className: "h-8 w-8 text-primary" }) }), _jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Ready to Transform How You Build Software?" }), _jsx("p", { className: "text-xl text-muted-foreground mb-8", children: "Join thousands of developers, designers, and product teams using Code Whisperer to build amazing products faster than ever." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs(Button, { size: "lg", className: "gap-2", children: ["Get Started ", _jsx(ArrowRight, { className: "h-4 w-4" })] }), _jsxs(Button, { variant: "outline", size: "lg", className: "gap-2", children: ["Read Documentation ", _jsx(Code, { className: "h-4 w-4" })] })] })] }) }) }));
};
export default CTASection;
