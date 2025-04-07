var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatInterface from "@/components/ui/ChatInterface";
const Project = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [project, setProject] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [loadingProject, setLoadingProject] = useState(true);
    useEffect(() => {
        if (!loading && !user) {
            navigate("/auth");
        }
    }, [user, loading, navigate]);
    useEffect(() => {
        const fetchProject = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!projectId || !user)
                return;
            try {
                const { data, error } = yield supabase
                    .from("projects")
                    .select("*")
                    .eq("id", projectId)
                    .eq("user_id", user.id)
                    .single();
                if (error)
                    throw error;
                setProject(data);
                // Also fetch chat history
                const { data: historyData, error: historyError } = yield supabase
                    .from("prompt_history")
                    .select("*")
                    .eq("project_id", projectId)
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: true });
                if (historyError)
                    throw historyError;
                if (historyData) {
                    const messages = [];
                    historyData.forEach((item, index) => {
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
            }
            catch (error) {
                console.error("Error fetching project:", error);
                toast({
                    title: "Error",
                    description: "Could not load project data",
                    variant: "destructive",
                });
                navigate("/dashboard");
            }
            finally {
                setLoadingProject(false);
            }
        });
        fetchProject();
    }, [projectId, user, navigate]);
    if (loading || loadingProject) {
        return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" }) }));
    }
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-1 container max-w-6xl px-4 py-8 mx-auto", children: project && (_jsxs("div", { className: "flex flex-col h-[calc(100vh-200px)]", children: [_jsxs("div", { className: "mb-4", children: [_jsx("h1", { className: "text-3xl font-bold", children: project.name }), _jsx("p", { className: "text-muted-foreground", children: project.description || "No description" })] }), _jsx("div", { className: "flex-1 border rounded-lg overflow-hidden", children: _jsx(ChatInterface, { className: "h-full", initialMessages: chatHistory }) })] })) }), _jsx(Footer, {})] }));
};
export default Project;
