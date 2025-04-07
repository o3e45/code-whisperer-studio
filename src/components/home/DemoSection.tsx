
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatInterface from "@/components/ui/ChatInterface";
import CodeBlock from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";

const DemoSection = () => {
  const [activeTab, setActiveTab] = useState("chat");

  // Initial chat messages with proper sender types
  const initialMessages = [
    {
      id: 1,
      sender: "user" as "user", // explicitly type as "user"
      content: "Build me a responsive navigation bar with a logo, links, and a dark mode toggle.",
      type: "text",
    },
    {
      id: 2,
      sender: "ai" as "ai", // explicitly type as "ai"
      content: `
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className={\`px-6 py-4 \${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} transition-colors duration-200\`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-500 rounded-full"></div>
          <span className="text-xl font-bold">BrandName</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-blue-500 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Features</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Pricing</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-2 space-y-2">
          <a href="#" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">Home</a>
          <a href="#" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">Features</a>
          <a href="#" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">Pricing</a>
          <a href="#" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">Contact</a>
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
      `,
      type: "code",
      language: "typescript",
    },
  ];

  return (
    <section id="demo" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            Interactive Demo
          </span>
          <h2 className="text-3xl font-bold mb-4">
            See <span className="gradient-text">Code Whisperer</span> in Action
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience firsthand how our AI transforms plain language into functional code.
            Try the demo interface below or view examples.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="chat">Interactive Chat</TabsTrigger>
              <TabsTrigger value="visual">Visual Editor</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="border border-border rounded-lg overflow-hidden">
              <div className="h-[600px]">
                <ChatInterface
                  className="h-full"
                  initialMessages={initialMessages}
                />
              </div>
            </TabsContent>
            <TabsContent value="visual">
              <div className="border border-border rounded-lg p-6 h-[600px] flex items-center justify-center bg-background">
                <div className="text-center">
                  <Terminal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Visual Editor Demo</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Click on any element in the preview to edit it directly using natural language commands.
                  </p>
                  <Button>Launch Visual Editor</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="examples">
              <div className="border border-border rounded-lg p-6 space-y-8 max-h-[600px] overflow-y-auto">
                <div>
                  <h3 className="text-xl font-medium mb-4">Creating a Landing Page</h3>
                  <div className="mb-4 p-4 bg-background rounded-md">
                    <p className="text-sm font-medium mb-2">User Prompt:</p>
                    <p className="text-muted-foreground">"Build me a SaaS landing page with a hero section, feature grid, pricing table, and testimonials."</p>
                  </div>
                  <CodeBlock
                    code={`// Generated React Component
export const SaasLandingPage = () => {
  return (
    <div>
      <HeroSection 
        title="Your SaaS Solution"
        subtitle="The all-in-one platform for modern teams"
        ctaText="Start Free Trial"
      />
      <FeatureGrid features={featuresData} />
      <PricingTable plans={pricingPlans} />
      <TestimonialSlider testimonials={clientTestimonials} />
    </div>
  );
};`}
                    language="jsx"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">Creating a Dashboard</h3>
                  <div className="mb-4 p-4 bg-background rounded-md">
                    <p className="text-sm font-medium mb-2">User Prompt:</p>
                    <p className="text-muted-foreground">"Generate an admin dashboard with a sidebar navigation, stats cards, and a data table."</p>
                  </div>
                  <CodeBlock
                    code={`// Generated React Component
export const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        links={[
          { label: "Dashboard", icon: "home", path: "/" },
          { label: "Users", icon: "users", path: "/users" },
          { label: "Reports", icon: "chart", path: "/reports" },
          { label: "Settings", icon: "settings", path: "/settings" }
        ]}
      />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <StatsGrid stats={dashboardStats} />
        <DataTable data={usersData} columns={userColumns} />
      </div>
    </div>
  );
};`}
                    language="jsx"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button size="lg" className="gap-2">
              Try It Yourself <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
