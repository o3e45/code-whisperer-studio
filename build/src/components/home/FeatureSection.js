import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Code, Wand2, MessageSquare, Database, ArrowRight, Layout, Palette, Cloud, GitBranch, Image } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const FeatureSection = () => {
    return (_jsx("section", { id: "features", className: "py-24 bg-background", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs("h2", { className: "text-3xl font-bold mb-4", children: ["Everything You Need to", _jsx("br", {}), _jsx("span", { className: "gradient-text", children: "Build Without Limits" })] }), _jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Code Whisperer Studio transforms how apps are built with AI-powered development that understands your vision and brings it to life." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature) => (_jsx(FeatureCard, { feature: feature }, feature.title))) }), _jsx("div", { className: "mt-16 text-center", children: _jsxs(Button, { variant: "outline", className: "gap-2", children: ["Explore All Features ", _jsx(ArrowRight, { className: "h-4 w-4" })] }) })] }) }));
};
const features = [
    {
        icon: _jsx(Code, { className: "h-8 w-8 text-primary" }),
        title: "Natural Language to Code",
        description: "Describe your app in plain language and watch as it transforms into working React components and API endpoints.",
    },
    {
        icon: _jsx(Wand2, { className: "h-8 w-8 text-primary" }),
        title: "AI-Powered Edits",
        description: "Request changes to your app through natural language prompts, and the AI will implement them instantly.",
    },
    {
        icon: _jsx(Layout, { className: "h-8 w-8 text-primary" }),
        title: "Visual Element Selection",
        description: "Click any element in your app and describe the changes you want to make directly in context.",
    },
    {
        icon: _jsx(MessageSquare, { className: "h-8 w-8 text-primary" }),
        title: "Conversational Interface",
        description: "Chat with the AI to refine your app, ask questions, and get recommendations on best practices.",
    },
    {
        icon: _jsx(Database, { className: "h-8 w-8 text-primary" }),
        title: "Backend Integration",
        description: "Connect to databases and APIs with simple language. Support for PostgreSQL, Supabase, and more.",
    },
    {
        icon: _jsx(Palette, { className: "h-8 w-8 text-primary" }),
        title: "Beautiful Design Patterns",
        description: "Built-in modern UI components and design systems that make your apps look professional from day one.",
    },
    {
        icon: _jsx(Cloud, { className: "h-8 w-8 text-primary" }),
        title: "One-Click Deploy",
        description: "Deploy your application to production with a single click, complete with custom domains.",
    },
    {
        icon: _jsx(GitBranch, { className: "h-8 w-8 text-primary" }),
        title: "GitHub Integration",
        description: "Push your generated code to GitHub repositories and integrate with your development workflow.",
    },
    {
        icon: _jsx(Image, { className: "h-8 w-8 text-primary" }),
        title: "Image Understanding",
        description: "Upload images as part of your prompts and the AI will understand and incorporate visual elements.",
    },
];
const FeatureCard = ({ feature }) => {
    return (_jsxs(Card, { className: "p-6 bg-secondary border-border hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1", children: [_jsx("div", { className: "p-3 bg-primary/10 inline-flex rounded-lg mb-4", children: feature.icon }), _jsx("h3", { className: "text-xl font-medium mb-2", children: feature.title }), _jsx("p", { className: "text-muted-foreground", children: feature.description })] }));
};
export default FeatureSection;
