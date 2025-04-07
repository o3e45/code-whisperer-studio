import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const pricingPlans = [
    {
        name: "Free",
        description: "For hobbyists and personal projects",
        price: "$0",
        buttonText: "Get Started",
        features: [
            "3 projects",
            "100 generations per month",
            "Basic components",
            "Community support",
        ],
    },
    {
        name: "Pro",
        description: "For professionals and small teams",
        price: "$29",
        buttonText: "Start Free Trial",
        popular: true,
        features: [
            "10 projects",
            "500 generations per month",
            "Advanced components",
            "Custom designs",
            "API integrations",
            "Priority support",
            "Github integration",
        ],
    },
    {
        name: "Team",
        description: "For startups and growing teams",
        price: "$79",
        buttonText: "Contact Sales",
        features: [
            "Unlimited projects",
            "Unlimited generations",
            "Custom branding",
            "Team collaboration",
            "Advanced integrations",
            "Dedicated support",
            "Custom export options",
            "Priority access to new features",
        ],
    },
];
const PricingSection = () => {
    return (_jsx("section", { id: "pricing", className: "py-24 bg-background", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs("h2", { className: "text-3xl font-bold mb-4", children: ["Simple, ", _jsx("span", { className: "gradient-text", children: "Transparent" }), " Pricing"] }), _jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Choose the perfect plan for your needs. All plans include core features like AI code generation, live previews, and export options." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: pricingPlans.map((plan) => (_jsx(PricingCard, { plan: plan }, plan.name))) }), _jsxs("div", { className: "mt-16 text-center", children: [_jsx("p", { className: "text-muted-foreground mb-4", children: "Need a custom solution for your enterprise?" }), _jsx(Button, { variant: "outline", size: "lg", children: "Contact Enterprise Sales" })] })] }) }));
};
const PricingCard = ({ plan }) => {
    return (_jsxs(Card, { className: `relative flex flex-col ${plan.popular
            ? "border-primary shadow-lg shadow-primary/10"
            : "border-border"}`, children: [plan.popular && (_jsx("div", { className: "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: _jsx("span", { className: "inline-flex bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full", children: "Most Popular" }) })), _jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-xl", children: plan.name }), _jsx(CardDescription, { children: plan.description }), _jsxs("div", { className: "mt-4", children: [_jsx("span", { className: "text-3xl font-bold", children: plan.price }), _jsx("span", { className: "text-muted-foreground", children: "/month" })] })] }), _jsx(CardContent, { className: "flex-grow", children: _jsx("ul", { className: "space-y-3", children: plan.features.map((feature) => (_jsxs("li", { className: "flex items-start", children: [_jsx(Check, { className: "h-5 w-5 text-primary shrink-0 mr-2" }), _jsx("span", { children: feature })] }, feature))) }) }), _jsx(CardFooter, { children: _jsx(Button, { variant: plan.popular ? "default" : "outline", className: "w-full", children: plan.buttonText }) })] }));
};
export default PricingSection;
