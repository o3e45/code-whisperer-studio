
import React from "react";
import { Code, Wand2, MessageSquare, Database, Globe, ArrowRight, Layout, Blocks, Palette, Cloud, Bot, GitBranch, Image } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to<br />
            <span className="gradient-text">Build Without Limits</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Code Whisperer Studio transforms how apps are built with AI-powered
            development that understands your vision and brings it to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" className="gap-2">
            Explore All Features <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: "Natural Language to Code",
    description:
      "Describe your app in plain language and watch as it transforms into working React components and API endpoints.",
  },
  {
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    title: "AI-Powered Edits",
    description:
      "Request changes to your app through natural language prompts, and the AI will implement them instantly.",
  },
  {
    icon: <Layout className="h-8 w-8 text-primary" />,
    title: "Visual Element Selection",
    description:
      "Click any element in your app and describe the changes you want to make directly in context.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Conversational Interface",
    description:
      "Chat with the AI to refine your app, ask questions, and get recommendations on best practices.",
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "Backend Integration",
    description:
      "Connect to databases and APIs with simple language. Support for PostgreSQL, Supabase, and more.",
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "Beautiful Design Patterns",
    description:
      "Built-in modern UI components and design systems that make your apps look professional from day one.",
  },
  {
    icon: <Cloud className="h-8 w-8 text-primary" />,
    title: "One-Click Deploy",
    description:
      "Deploy your application to production with a single click, complete with custom domains.",
  },
  {
    icon: <GitBranch className="h-8 w-8 text-primary" />,
    title: "GitHub Integration",
    description:
      "Push your generated code to GitHub repositories and integrate with your development workflow.",
  },
  {
    icon: <Image className="h-8 w-8 text-primary" />,
    title: "Image Understanding",
    description:
      "Upload images as part of your prompts and the AI will understand and incorporate visual elements.",
  },
];

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <Card className="p-6 bg-secondary border-border hover:shadow-md hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      <div className="p-3 bg-primary/10 inline-flex rounded-lg mb-4">
        {feature.icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </Card>
  );
};

export default FeatureSection;
