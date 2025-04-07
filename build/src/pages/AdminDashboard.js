var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Key, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const AdminDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
    const [apiKeys, setApiKeys] = useState([
        { name: "OpenAI API Key", key: "sk-••••••••••••••••••••••••••••••" },
        { name: "GitHub API Key", key: "gh-••••••••••••••••••••••••••••••" }
    ]);
    const [newKeyName, setNewKeyName] = useState("");
    const [newKeyValue, setNewKeyValue] = useState("");
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (!loading && !user) {
            navigate("/auth");
        }
        else if (user) {
            checkAdminStatus();
            fetchUsers();
        }
    }, [user, loading, navigate]);
    const checkAdminStatus = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // In a real app, you would check if the user has admin role
        // For now, we'll simulate this by checking if the user's email ends with @owendobsonholdings.com
        if ((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.endsWith("@owendobsonholdings.com")) {
            setIsAdmin(true);
        }
        else {
            // Redirect non-admin users
            toast({
                title: "Access Denied",
                description: "You don't have admin privileges",
                variant: "destructive",
            });
            navigate("/dashboard");
        }
    });
    const fetchUsers = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // In a real app, you would fetch users from the database
            // Since we don't have direct access to auth.users, we'll use profiles
            const { data, error } = yield supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: false });
            if (error)
                throw error;
            setUserList(data || []);
        }
        catch (error) {
            console.error("Error fetching users:", error);
            toast({
                title: "Error",
                description: "Failed to load users",
                variant: "destructive",
            });
        }
        finally {
            setLoadingUsers(false);
        }
    });
    const handleAddApiKey = () => {
        if (!newKeyName.trim() || !newKeyValue.trim()) {
            toast({
                title: "Error",
                description: "API key name and value are required",
                variant: "destructive",
            });
            return;
        }
        // Add new API key
        setApiKeys([...apiKeys, { name: newKeyName, key: newKeyValue }]);
        setNewKeyName("");
        setNewKeyValue("");
        toast({
            title: "Success",
            description: "API key added successfully",
        });
    };
    const handleDeleteApiKey = (index) => {
        const updatedKeys = [...apiKeys];
        updatedKeys.splice(index, 1);
        setApiKeys(updatedKeys);
        toast({
            title: "API Key Deleted",
            description: "The API key has been removed",
        });
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" }) }));
    }
    if (!isAdmin) {
        return null; // Component will redirect in useEffect
    }
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 container px-4 py-8 mx-auto max-w-7xl", children: _jsxs("div", { className: "flex flex-col space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Admin Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Manage users, API keys, and platform settings" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-primary text-white px-3 py-1 text-xs rounded-full", children: "Admin" }), _jsx(Shield, { className: "h-5 w-5 text-primary" })] })] }), _jsxs(Tabs, { defaultValue: "users", children: [_jsxs(TabsList, { className: "grid grid-cols-3 mb-8", children: [_jsx(TabsTrigger, { value: "users", children: "Users" }), _jsx(TabsTrigger, { value: "api-keys", children: "API Keys" }), _jsx(TabsTrigger, { value: "settings", children: "Settings" })] }), _jsx(TabsContent, { value: "users", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "User Management" }), _jsx(CardDescription, { children: "View and manage all users on the platform" })] }), _jsx(CardContent, { children: _jsx("div", { className: "relative overflow-x-auto rounded-lg", children: _jsxs("table", { className: "w-full text-sm text-left", children: [_jsx("thead", { className: "text-xs uppercase bg-secondary", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3", children: "User" }), _jsx("th", { scope: "col", className: "px-6 py-3", children: "Email" }), _jsx("th", { scope: "col", className: "px-6 py-3", children: "Created At" }), _jsx("th", { scope: "col", className: "px-6 py-3", children: "Actions" })] }) }), _jsx("tbody", { children: loadingUsers ? (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "px-6 py-4 text-center", children: "Loading users..." }) })) : userList.length > 0 ? (userList.map((user) => (_jsxs("tr", { className: "border-b hover:bg-secondary/50", children: [_jsx("td", { className: "px-6 py-4 font-medium", children: user.full_name || "No name" }), _jsx("td", { className: "px-6 py-4", children: user.email || user.username }), _jsx("td", { className: "px-6 py-4", children: new Date(user.created_at).toLocaleDateString() }), _jsx("td", { className: "px-6 py-4", children: _jsx(Button, { variant: "outline", size: "sm", children: "View" }) })] }, user.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "px-6 py-4 text-center", children: "No users found" }) })) })] }) }) })] }) }), _jsx(TabsContent, { value: "api-keys", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "API Key Management" }), _jsx(CardDescription, { children: "Manage API keys for external services" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Current API Keys" }), _jsx("div", { className: "space-y-2", children: apiKeys.map((apiKey, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: apiKey.name }), _jsx("p", { className: "text-muted-foreground text-sm", children: apiKey.key })] }), _jsx(Button, { variant: "destructive", size: "sm", onClick: () => handleDeleteApiKey(index), children: "Remove" })] }, index))) })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Add New API Key" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "key-name", children: "Key Name" }), _jsx(Input, { id: "key-name", placeholder: "e.g., OpenAI API Key", value: newKeyName, onChange: (e) => setNewKeyName(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "key-value", children: "API Key Value" }), _jsx(Input, { id: "key-value", type: "password", placeholder: "Enter API key", value: newKeyValue, onChange: (e) => setNewKeyValue(e.target.value) })] })] }), _jsxs(Button, { onClick: handleAddApiKey, className: "w-full sm:w-auto", children: [_jsx(Key, { className: "h-4 w-4 mr-2" }), " Add API Key"] })] })] })] }) }), _jsx(TabsContent, { value: "settings", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Platform Settings" }), _jsx(CardDescription, { children: "Configure global platform settings" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "General Settings" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "site-name", children: "Site Name" }), _jsx(Input, { id: "site-name", defaultValue: "Code Whisperer" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "support-email", children: "Support Email" }), _jsx(Input, { id: "support-email", defaultValue: "support@codewhisperer.ai" })] })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "AI Settings" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "model", children: "Default AI Model" }), _jsx(Input, { id: "model", defaultValue: "gpt-4" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "temperature", children: "Temperature" }), _jsx(Input, { id: "temperature", type: "number", defaultValue: "0.7", min: "0", max: "2", step: "0.1" })] })] })] })] }), _jsx(CardFooter, { children: _jsx(Button, { children: "Save Settings" }) })] }) })] })] }) }), _jsx(Footer, {})] }));
};
export default AdminDashboard;
