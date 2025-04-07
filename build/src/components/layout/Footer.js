import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Code, Github, Twitter, Linkedin } from "lucide-react";
const Footer = () => {
    return (_jsx("footer", { className: "bg-secondary py-16", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [_jsxs("div", { className: "col-span-1", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [_jsx(Code, { className: "h-8 w-8 text-primary" }), _jsx("span", { className: "text-xl font-semibold gradient-text", children: "CodeWhisperer" })] }), _jsx("p", { className: "mt-4 text-muted-foreground", children: "Transform natural language into full-stack applications with AI." }), _jsxs("div", { className: "flex mt-4 gap-4", children: [_jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary", children: _jsx(Github, { className: "h-5 w-5" }) }), _jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary", children: _jsx(Twitter, { className: "h-5 w-5" }) }), _jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary", children: _jsx(Linkedin, { className: "h-5 w-5" }) })] })] }), _jsx(FooterColumn, { title: "Product", links: [
                                { label: "Features", href: "#features" },
                                { label: "Demo", href: "#demo" },
                                { label: "Pricing", href: "#pricing" },
                                { label: "Roadmap", href: "#" },
                            ] }), _jsx(FooterColumn, { title: "Resources", links: [
                                { label: "Documentation", href: "#" },
                                { label: "Tutorials", href: "#" },
                                { label: "Examples", href: "#" },
                                { label: "Blog", href: "#" },
                            ] }), _jsx(FooterColumn, { title: "Company", links: [
                                { label: "About Us", href: "#" },
                                { label: "Careers", href: "#" },
                                { label: "Contact", href: "#" },
                                { label: "Legal", href: "#" },
                            ] })] }), _jsxs("div", { className: "mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["\u00A9 ", new Date().getFullYear(), " CodeWhisperer Studio. All rights reserved."] }), _jsxs("div", { className: "flex gap-8 mt-4 md:mt-0", children: [_jsx("a", { href: "#", className: "text-sm text-muted-foreground hover:text-foreground", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "text-sm text-muted-foreground hover:text-foreground", children: "Terms of Service" })] })] })] }) }));
};
const FooterColumn = ({ title, links, }) => {
    return (_jsxs("div", { children: [_jsx("h3", { className: "font-medium text-base mb-4", children: title }), _jsx("ul", { className: "space-y-3", children: links.map((link) => (_jsx("li", { children: _jsx("a", { href: link.href, className: "text-muted-foreground hover:text-foreground transition-colors", children: link.label }) }, link.label))) })] }));
};
export default Footer;
