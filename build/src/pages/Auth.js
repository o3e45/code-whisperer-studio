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
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const handleSignIn = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(true);
        try {
            yield signIn(email, password);
            toast({
                title: "Welcome back!",
                description: "You've successfully signed in.",
            });
            navigate("/dashboard");
        }
        catch (error) {
            toast({
                title: "Sign in failed",
                description: error.message || "Please check your credentials and try again.",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    });
    const handleSignUp = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(true);
        try {
            yield signUp(email, password, { full_name: fullName });
            toast({
                title: "Account created!",
                description: "Please check your email to confirm your account.",
            });
        }
        catch (error) {
            toast({
                title: "Sign up failed",
                description: error.message || "Please check your information and try again.",
                variant: "destructive",
            });
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-2xl text-center", children: "Code Whisperer" }), _jsx(CardDescription, { className: "text-center", children: "Sign in to your account or create a new one" })] }), _jsxs(Tabs, { defaultValue: "login", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "login", children: "Login" }), _jsx(TabsTrigger, { value: "register", children: "Register" })] }), _jsx(TabsContent, { value: "login", children: _jsxs("form", { onSubmit: handleSignIn, children: [_jsxs(CardContent, { className: "space-y-4 pt-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-medium", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "Email address", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] })] }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Signing in..." : "Sign in" }) })] }) }), _jsx(TabsContent, { value: "register", children: _jsxs("form", { onSubmit: handleSignUp, children: [_jsxs(CardContent, { className: "space-y-4 pt-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "fullName", className: "text-sm font-medium", children: "Full Name" }), _jsx(Input, { id: "fullName", placeholder: "Full Name", value: fullName, onChange: (e) => setFullName(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-medium", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "Email address", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "password", className: "text-sm font-medium", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true })] })] }), _jsx(CardFooter, { children: _jsx(Button, { type: "submit", className: "w-full", disabled: loading, children: loading ? "Creating account..." : "Create account" }) })] }) })] })] }) }));
};
export default Auth;
