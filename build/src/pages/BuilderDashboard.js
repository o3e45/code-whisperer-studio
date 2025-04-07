import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Code, FileCode, Terminal, Settings, Download, Upload, Plus, Play, PanelRight, Database } from "lucide-react";
const BuilderDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [codeGeneration, setCodeGeneration] = useState([50]);
    // Template options
    const templates = [
        {
            id: "web-app",
            title: "Web Application",
            description: "Create a full-stack web application with React",
            icon: _jsx(Code, { className: "h-8 w-8" }),
        },
        {
            id: "dashboard",
            title: "Dashboard",
            description: "Build an admin dashboard with data visualization",
            icon: _jsx(PanelRight, { className: "h-8 w-8" }),
        },
        {
            id: "api",
            title: "API Server",
            description: "Create a RESTful API server with Node.js",
            icon: _jsx(Database, { className: "h-8 w-8" }),
        },
        {
            id: "ecommerce",
            title: "E-commerce Site",
            description: "Build an online store with product listings and checkout",
            icon: _jsx(FileCode, { className: "h-8 w-8" }),
        },
        {
            id: "mobile-app",
            title: "Mobile App",
            description: "Create a cross-platform mobile app with React Native",
            icon: _jsx(Terminal, { className: "h-8 w-8" }),
        },
    ];
    const frameworks = [
        { value: "next", label: "Next.js" },
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" }
    ];
    const cssLibraries = [
        { value: "tailwind", label: "Tailwind CSS" },
        { value: "mui", label: "Material UI" },
        { value: "bootstrap", label: "Bootstrap" },
        { value: "chakra", label: "Chakra UI" },
        { value: "styled", label: "Styled Components" }
    ];
    const backendOptions = [
        { value: "express", label: "Express.js" },
        { value: "nest", label: "NestJS" },
        { value: "django", label: "Django" },
        { value: "rails", label: "Ruby on Rails" },
        { value: "laravel", label: "Laravel" }
    ];
    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
    };
    const handleCreateProject = () => {
        navigate("/dashboard/builder/new");
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" }) }));
    }
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 container px-4 py-8 mx-auto", children: _jsxs("div", { className: "max-w-5xl mx-auto", children: [_jsxs("div", { className: "text-center mb-10", children: [_jsx("h1", { className: "text-4xl font-bold tracking-tight mb-2", children: "Code Whisperer Builder" }), _jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Turn your ideas into working code with our AI-powered builder. Select a template or start from scratch." })] }), _jsxs(Tabs, { defaultValue: "templates", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-8", children: [_jsx(TabsTrigger, { value: "templates", children: "Templates" }), _jsx(TabsTrigger, { value: "custom", children: "Custom Project" }), _jsx(TabsTrigger, { value: "import", children: "Import" })] }), _jsxs(TabsContent, { value: "templates", className: "space-y-8", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: templates.map((template) => (_jsxs(Card, { className: `cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`, onClick: () => handleTemplateSelect(template.id), children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2 space-y-0", children: [_jsx(CardTitle, { className: "text-xl", children: template.title }), _jsx("div", { className: "bg-primary/10 text-primary p-2 rounded-full", children: template.icon })] }), _jsx(CardContent, { children: _jsx(CardDescription, { className: "text-base", children: template.description }) })] }, template.id))) }), _jsxs(Card, { className: selectedTemplate ? "" : "opacity-50 pointer-events-none", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Configuration" }), _jsx(CardDescription, { children: "Customize your project settings" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "project-name", children: "Project Name" }), _jsx(Input, { id: "project-name", placeholder: "My Awesome Project" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "project-description", children: "Short Description" }), _jsx(Input, { id: "project-description", placeholder: "A brief description of your project" })] })] }), _jsx(Separator, {}), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "framework", children: "Framework" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "framework", children: _jsx(SelectValue, { placeholder: "Select Framework" }) }), _jsx(SelectContent, { children: frameworks.map(framework => (_jsx(SelectItem, { value: framework.value, children: framework.label }, framework.value))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "css", children: "CSS Library" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "css", children: _jsx(SelectValue, { placeholder: "Select CSS Library" }) }), _jsx(SelectContent, { children: cssLibraries.map(lib => (_jsx(SelectItem, { value: lib.value, children: lib.label }, lib.value))) })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "backend", children: "Backend" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "backend", children: _jsx(SelectValue, { placeholder: "Select Backend" }) }), _jsx(SelectContent, { children: backendOptions.map(option => (_jsx(SelectItem, { value: option.value, children: option.label }, option.value))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "AI Coding Assistance" }), _jsxs("div", { className: "pt-4", children: [_jsx(Slider, { value: codeGeneration, onValueChange: setCodeGeneration, max: 100, step: 1 }), _jsxs("div", { className: "flex justify-between mt-2 text-xs text-muted-foreground", children: [_jsx("span", { children: "Less AI" }), _jsxs("span", { children: [codeGeneration, "%"] }), _jsx("span", { children: "More AI" })] })] })] })] })] }), _jsx(CardFooter, { className: "flex justify-end", children: _jsxs(Button, { onClick: handleCreateProject, size: "lg", children: [_jsx(Play, { className: "mr-2 h-4 w-4" }), " Generate Project"] }) })] })] }), _jsx(TabsContent, { value: "custom", className: "space-y-8", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Custom Project" }), _jsx(CardDescription, { children: "Start from scratch by describing what you want to build" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { htmlFor: "project-name", children: "Project Name" }), _jsx(Input, { id: "project-name", placeholder: "My Custom Project" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { htmlFor: "project-description", children: "Project Description" }), _jsx("textarea", { id: "project-description", className: "w-full min-h-[200px] p-3 border rounded-md bg-background", placeholder: "Describe the project you want to build in detail. For example: 'I want to build a social media app where users can share photos and follow each other. It should have user authentication, a feed page, profile pages, and the ability to like and comment on photos.'" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "tech-stack", children: "Preferred Technology Stack" }), _jsx(Input, { id: "tech-stack", placeholder: "e.g., React, Node.js, MongoDB" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "features", children: "Key Features" }), _jsx(Input, { id: "features", placeholder: "e.g., Authentication, File Upload, Real-time Chat" })] })] })] }), _jsx(CardFooter, { className: "flex justify-end", children: _jsxs(Button, { onClick: handleCreateProject, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Create Custom Project"] }) })] }) }), _jsx(TabsContent, { value: "import", className: "space-y-8", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Import Existing Project" }), _jsx(CardDescription, { children: "Import code from GitHub, GitLab, or upload directly" })] }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "From Repository" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "repo-url", children: "Repository URL" }), _jsx(Input, { id: "repo-url", placeholder: "https://github.com/username/repo" })] }), _jsx("div", { className: "flex justify-end", children: _jsxs(Button, { variant: "outline", children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), " Import from Git"] }) })] }), _jsx(Separator, {}), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Upload Files" }), _jsxs("div", { className: "border-2 border-dashed rounded-lg p-10 text-center", children: [_jsx(Upload, { className: "h-10 w-10 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-muted-foreground mb-2", children: "Drag and drop your project files here, or click to browse" }), _jsx(Button, { variant: "secondary", children: "Choose Files" })] })] })] }) })] }) })] }), _jsx("div", { className: "mt-12 flex items-center justify-center", children: _jsx(Card, { className: "bg-secondary/50 p-4 max-w-xl w-full", children: _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-primary/10 p-2 rounded-full mr-4", children: _jsx(Settings, { className: "h-6 w-6 text-primary" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium", children: "Need more advanced configuration?" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Try our expert mode for complete control over your project setup." })] }), _jsx(Button, { variant: "outline", children: "Expert Mode" })] }) }) })] }) }), _jsx(Footer, {})] }));
};
export default BuilderDashboard;
