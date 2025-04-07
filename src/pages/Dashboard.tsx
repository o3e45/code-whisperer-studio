
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Code, PanelRight, UserCog } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("projects")
            .select("id, name, description, created_at, updated_at")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (error) throw error;
          setProjects(data || []);
        } catch (error: any) {
          console.error("Error fetching projects:", error);
          toast({
            title: "Error",
            description: "Failed to load projects",
            variant: "destructive",
          });
        } finally {
          setLoadingProjects(false);
        }
      }
    };

    if (user) fetchProjects();
  }, [user]);

  const createNewProject = async () => {
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a project",
          variant: "destructive",
        });
        return;
      }
      
      const projectName = `Project ${new Date().toLocaleDateString()}`;
      const { data, error } = await supabase
        .from("projects")
        .insert([
          { 
            name: projectName, 
            user_id: user.id,
            description: "New code project"
          }
        ])
        .select();
      
      if (error) throw error;
      
      if (data && data[0]) {
        toast({
          title: "Success",
          description: "Project created successfully!",
        });
        navigate(`/projects/${data[0].id}`);
      }
    } catch (error: any) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create project",
        variant: "destructive",
      });
    }
  };
  
  const checkIfAdmin = () => {
    if (user?.email?.endsWith('@admin.com')) {
      return true;
    }
    return false;
  };

  const goToAdminDashboard = () => {
    navigate('/admin');
  };
  
  const goToBuilderDashboard = () => {
    navigate('/builder');
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your projects and AI chat sessions</p>
          </div>
          <div className="flex gap-3">
            {checkIfAdmin() && (
              <Button onClick={goToAdminDashboard} variant="outline">
                <UserCog className="h-4 w-4 mr-2" /> Admin Panel
              </Button>
            )}
            <Button onClick={goToBuilderDashboard} variant="outline">
              <Code className="h-4 w-4 mr-2" /> Builder
            </Button>
            <Button onClick={createNewProject}>
              <Plus className="h-4 w-4 mr-2" /> New Project
            </Button>
          </div>
        </div>

        <Tabs defaultValue="projects" className="mb-8">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
            <TabsTrigger value="recent" className="flex-1">Recent Activity</TabsTrigger>
            <TabsTrigger value="templates" className="flex-1">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="pt-6">
            {loadingProjects ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardContent>
                    <CardFooter>
                      <div className="h-9 bg-muted rounded w-full"></div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>
                        {new Date(project.created_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description || "No description provided"}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        Open Project
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-4">Create your first project to get started</p>
                <Button onClick={createNewProject}>
                  <Plus className="h-4 w-4 mr-2" /> Create Project
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recent" className="pt-6">
            <div className="text-center py-16">
              <PanelRight className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Recent Activity</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Your recent activity and chat sessions will appear here as you use the platform.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="pt-6">
            <div className="text-center py-16">
              <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Project Templates</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Coming soon - start projects from pre-built templates.
              </p>
              <Button variant="outline" onClick={goToBuilderDashboard}>
                Go to Builder
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
