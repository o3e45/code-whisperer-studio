
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Cpu, Wand2 } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";

const Hero = () => {
  const sampleCode = `describe("a landing page") {
  with(
    header("Code Whisperer Studio"),
    description("Transform words into working apps"),
    callToAction("Get Started")
  )
  
  // The AI will build it for you
  show(LivePreview);
}`;

  return (
    <section className="relative overflow-hidden pt-24 pb-32 bg-tech-pattern min-h-[95vh] flex items-center">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background to-transparent"></div>

      {/* Floating elements */}
      <div className="absolute left-[10%] top-[20%] h-40 w-40 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute right-[15%] bottom-[10%] h-60 w-60 bg-accent/10 rounded-full blur-3xl animate-float [animation-delay:2s]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <div className="inline-flex mb-6 items-center rounded-full border px-4 py-2 text-sm">
              <Cpu className="h-3.5 w-3.5 mr-2 text-primary" />
              <span>Powered by Groq API</span>
              <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                New
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Describe. <span className="gradient-text">Generate.</span> Deploy.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform natural language into fully working applications.
              Design, build, and deploy web apps with just a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                Watch Demo <Wand2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm">No credit card required</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary via-accent to-purple-600 opacity-30 blur-lg"></div>
            <div className="relative bg-secondary rounded-lg shadow-xl overflow-hidden border border-border">
              <div className="bg-secondary border-b border-border p-3 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium">Code Whisperer</span>
                </div>
                <div className="w-16"></div> {/* Spacer */}
              </div>

              <div className="p-6">
                <div className="typing-container">
                  <p className="typing-text text-sm mb-4">
                    Build me a landing page with a gradient header, feature section, and newsletter signup...
                  </p>
                </div>
                <CodeBlock code={sampleCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
