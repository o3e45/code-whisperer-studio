
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatInterface from "@/components/ui/ChatInterface";
import { Message } from "@/types/chat";

interface ProjectData {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

interface PromptHistoryItem {
  id: string;
  prompt: string;
  response: string | null;
  created_at: string;
}

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loadingProject, setLoadingProject] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId || !user) return;
      
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", projectId)
          .eq("user_id", user.id)
          .single();

        if (error) throw error;
        setProject(data);
        
        // Also fetch chat history
        const { data: historyData, error: historyError } = await supabase
          .from("prompt_history")
          .select("*")
          .eq("project_id", projectId)
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });
        
        if (historyError) throw historyError;
        
        if (historyData) {
          const messages: Message[] = [];
          historyData.forEach((item: PromptHistoryItem, index: number) => {
            // Add user prompt
            messages.push({
              id: index * 2,
              sender: "user",
              content: item.prompt,
              type: "text"
            });
            
            // Add AI response if available
            if (item.response) {
              messages.push({
                id: index * 2 + 1,
                sender: "ai",
                content: item.response,
                type: item.response.trim().startsWith("```") ? "code" : "text",
                language: item.response.trim().startsWith("```") ? "typescript" : undefined
              });
            }
          });
          setChatHistory(messages);
        }
      } catch (error: any) {
        console.error("Error fetching project:", error);
        toast({
          title: "Error",
          description: "Could not load project data",
          variant: "destructive",
        });
        navigate("/dashboard");
      } finally {
        setLoadingProject(false);
      }
    };

    fetchProject();
  }, [projectId, user, navigate]);

  if (loading || loadingProject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container max-w-6xl px-4 py-8 mx-auto">
        {project && (
          <div className="flex flex-col h-[calc(100vh-200px)]">
            <div className="mb-4">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-muted-foreground">{project.description || "No description"}</p>
            </div>
            <div className="flex-1 border rounded-lg overflow-hidden">
              <ChatInterface
                className="h-full"
                initialMessages={chatHistory}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Project;
