
import React, { useState } from "react";
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
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [codeGeneration, setCodeGeneration] = useState<number[]>([50]);

  // Template options
  const templates = [
    {
      id: "web-app",
      title: "Web Application",
      description: "Create a full-stack web application with React",
      icon: <Code className="h-8 w-8" />,
    },
    {
      id: "dashboard",
      title: "Dashboard",
      description: "Build an admin dashboard with data visualization",
      icon: <PanelRight className="h-8 w-8" />,
    },
    {
      id: "api",
      title: "API Server",
      description: "Create a RESTful API server with Node.js",
      icon: <Database className="h-8 w-8" />,
    },
    {
      id: "ecommerce",
      title: "E-commerce Site",
      description: "Build an online store with product listings and checkout",
      icon: <FileCode className="h-8 w-8" />,
    },
    {
      id: "mobile-app",
      title: "Mobile App",
      description: "Create a cross-platform mobile app with React Native",
      icon: <Terminal className="h-8 w-8" />,
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

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleCreateProject = () => {
    navigate("/dashboard/builder/new");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Code Whisperer Builder</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Turn your ideas into working code with our AI-powered builder. Select a template or start from scratch.
            </p>
          </div>

          <Tabs defaultValue="templates">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="custom">Custom Project</TabsTrigger>
              <TabsTrigger value="import">Import</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-xl">{template.title}</CardTitle>
                      <div className="bg-primary/10 text-primary p-2 rounded-full">
                        {template.icon}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{template.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className={selectedTemplate ? "" : "opacity-50 pointer-events-none"}>
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                  <CardDescription>Customize your project settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input id="project-name" placeholder="My Awesome Project" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-description">Short Description</Label>
                      <Input id="project-description" placeholder="A brief description of your project" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="framework">Framework</Label>
                      <Select>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Select Framework" />
                        </SelectTrigger>
                        <SelectContent>
                          {frameworks.map(framework => (
                            <SelectItem key={framework.value} value={framework.value}>
                              {framework.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="css">CSS Library</Label>
                      <Select>
                        <SelectTrigger id="css">
                          <SelectValue placeholder="Select CSS Library" />
                        </SelectTrigger>
                        <SelectContent>
                          {cssLibraries.map(lib => (
                            <SelectItem key={lib.value} value={lib.value}>
                              {lib.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="backend">Backend</Label>
                      <Select>
                        <SelectTrigger id="backend">
                          <SelectValue placeholder="Select Backend" />
                        </SelectTrigger>
                        <SelectContent>
                          {backendOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>AI Coding Assistance</Label>
                      <div className="pt-4">
                        <Slider
                          value={codeGeneration}
                          onValueChange={setCodeGeneration}
                          max={100}
                          step={1}
                        />
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Less AI</span>
                          <span>{codeGeneration}%</span>
                          <span>More AI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleCreateProject} size="lg">
                    <Play className="mr-2 h-4 w-4" /> Generate Project
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="custom" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Project</CardTitle>
                  <CardDescription>
                    Start from scratch by describing what you want to build
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input id="project-name" placeholder="My Custom Project" />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="project-description">Project Description</Label>
                    <textarea
                      id="project-description"
                      className="w-full min-h-[200px] p-3 border rounded-md bg-background"
                      placeholder="Describe the project you want to build in detail. For example: 'I want to build a social media app where users can share photos and follow each other. It should have user authentication, a feed page, profile pages, and the ability to like and comment on photos.'"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tech-stack">Preferred Technology Stack</Label>
                      <Input id="tech-stack" placeholder="e.g., React, Node.js, MongoDB" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="features">Key Features</Label>
                      <Input id="features" placeholder="e.g., Authentication, File Upload, Real-time Chat" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleCreateProject}>
                    <Plus className="mr-2 h-4 w-4" /> Create Custom Project
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="import" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Import Existing Project</CardTitle>
                  <CardDescription>
                    Import code from GitHub, GitLab, or upload directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">From Repository</h3>
                      <div className="space-y-2">
                        <Label htmlFor="repo-url">Repository URL</Label>
                        <Input id="repo-url" placeholder="https://github.com/username/repo" />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" /> Import from Git
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Upload Files</h3>
                      <div className="border-2 border-dashed rounded-lg p-10 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">
                          Drag and drop your project files here, or click to browse
                        </p>
                        <Button variant="secondary">
                          Choose Files
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-12 flex items-center justify-center">
            <Card className="bg-secondary/50 p-4 max-w-xl w-full">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Need more advanced configuration?</h3>
                  <p className="text-sm text-muted-foreground">
                    Try our expert mode for complete control over your project setup.
                  </p>
                </div>
                <Button variant="outline">Expert Mode</Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuilderDashboard;
