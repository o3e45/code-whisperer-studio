import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code, Menu, X } from "lucide-react";
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (_jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-border", children: [_jsxs("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [_jsx(Code, { className: "h-8 w-8 text-primary" }), _jsx("span", { className: "text-xl font-semibold gradient-text", children: "CodeWhisperer" })] }), _jsxs("div", { className: "hidden md:flex items-center gap-8", children: [_jsx(NavLinks, {}), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", size: "sm", children: "Sign In" }), _jsx(Button, { size: "sm", children: "Get Started" })] })] }), _jsx("button", { className: "md:hidden text-foreground", onClick: () => setIsMenuOpen(!isMenuOpen), children: isMenuOpen ? (_jsx(X, { className: "h-6 w-6" })) : (_jsx(Menu, { className: "h-6 w-6" })) })] }), isMenuOpen && (_jsx("div", { className: "md:hidden bg-background border-b border-border", children: _jsxs("div", { className: "container mx-auto px-4 py-4 flex flex-col gap-4", children: [_jsx(NavLinksMobile, {}), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", children: "Sign In" }), _jsx(Button, { size: "sm", children: "Get Started" })] })] }) }))] }));
};
const NavLinks = () => {
    return (_jsxs("div", { className: "flex items-center gap-8", children: [_jsx(NavLink, { href: "#features", label: "Features" }), _jsx(NavLink, { href: "#demo", label: "Demo" }), _jsx(NavLink, { href: "#pricing", label: "Pricing" }), _jsx(NavLink, { href: "#", label: "Documentation" })] }));
};
const NavLinksMobile = () => {
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(NavLink, { href: "#features", label: "Features" }), _jsx(NavLink, { href: "#demo", label: "Demo" }), _jsx(NavLink, { href: "#pricing", label: "Pricing" }), _jsx(NavLink, { href: "#", label: "Documentation" })] }));
};
const NavLink = ({ href, label }) => {
    return (_jsx("a", { href: href, className: "text-muted-foreground hover:text-foreground transition-colors", children: label }));
};
export default Navbar;
