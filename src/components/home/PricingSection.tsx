
import React from "react";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
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
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include core features like
            AI code generation, live previews, and export options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution for your enterprise?
          </p>
          <Button variant="outline" size="lg">
            Contact Enterprise Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <Card
      className={`relative flex flex-col ${
        plan.popular
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-border"
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start">
              <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant={plan.popular ? "default" : "outline"}
          className="w-full"
        >
          {plan.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingSection;
