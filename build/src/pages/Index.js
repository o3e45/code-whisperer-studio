import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeatureSection from "@/components/home/FeatureSection";
import DemoSection from "@/components/home/DemoSection";
import PricingSection from "@/components/home/PricingSection";
import CTASection from "@/components/home/CTASection";
const Index = () => {
    return (_jsxs("div", { className: "min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsxs("main", { children: [_jsx(Hero, {}), _jsx(FeatureSection, {}), _jsx(DemoSection, {}), _jsx(PricingSection, {}), _jsx(CTASection, {})] }), _jsx(Footer, {})] }));
};
export default Index;
