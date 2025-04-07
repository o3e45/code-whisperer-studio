import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import AdminDashboard from "./pages/AdminDashboard";
import BuilderDashboard from "./pages/BuilderDashboard";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
// Protected route component to handle authentication redirects
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" }) }));
    }
    if (!user) {
        return _jsx(Navigate, { to: "/auth", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
// Home redirect component
const HomeRedirect = () => {
    const { user, loading } = useAuth();
    useEffect(() => {
        // If the user lands on the root path, prompt them to log in
        if (!loading && !user) {
            const timer = setTimeout(() => {
                window.location.href = "/auth";
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [user, loading]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" }) }));
    }
    if (user) {
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(Index, {});
};
const App = () => (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Sonner, {}), _jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomeRedirect, {}) }), _jsx(Route, { path: "/auth", element: _jsx(Auth, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/projects/:projectId", element: _jsx(ProtectedRoute, { children: _jsx(Project, {}) }) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/builder", element: _jsx(ProtectedRoute, { children: _jsx(BuilderDashboard, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] }) }) }));
export default App;
