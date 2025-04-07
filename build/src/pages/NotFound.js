import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
const NotFound = () => {
    const location = useLocation();
    useEffect(() => {
        console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }, [location.pathname]);
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: _jsxs("div", { className: "text-center p-6 max-w-lg", children: [_jsx("div", { className: "text-9xl font-bold gradient-text mb-6", children: "404" }), _jsx("h1", { className: "text-3xl font-bold mb-4", children: "Page not found" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage." }), _jsx(Button, { className: "gap-2", asChild: true, children: _jsxs("a", { href: "/", children: [_jsx(Home, { className: "h-4 w-4" }), " Return to Home"] }) })] }) }));
};
export default NotFound;
