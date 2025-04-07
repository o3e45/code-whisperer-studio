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
const Dashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    useEffect(() => {
        if (!loading && !user) {
            navigate("/auth");
        }
    }, [user, loading, navigate]);
    useEffect(() => {
        const fetchProjects = () => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                try {
                    const { data, error } = yield supabase
                        .from("projects")
                        .select("id, name, description, created_at, updated_at")
                        .eq("user_id", user.id)
                        .order("created_at", { ascending: false });
                    if (error)
                        throw error;
                    setProjects(data || []);
                }
                catch (error) {
                    console.error("Error fetching projects:", error);
                    toast({
                        title: "Error",
                        description: "Failed to load projects",
                        variant: "destructive",
                    });
                }
                finally {
                    setLoadingProjects(false);
                }
            }
        });
        if (user)
            fetchProjects();
    }, [user]);
    const createNewProject = () => __awaiter(void 0, void 0, void 0, function* () {
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
            const { data, error } = yield supabase
                .from("projects")
                .insert([
                {
                    name: projectName,
                    user_id: user.id,
                    description: "New code project"
                }
            ])
                .select();
            if (error)
                throw error;
            if (data && data[0]) {
                toast({
                    title: "Success",
                    description: "Project created successfully!",
                });
                navigate(`/projects/${data[0].id}`);
            }
        }
        catch (error) {
            console.error("Error creating project:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to create project",
                variant: "destructive",
            });
        }
    });
    const checkIfAdmin = () => {
        var _a;
        if ((_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.endsWith('@admin.com')) {
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
        return (_jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" }) }));
    }
    return (_jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [_jsx(Navbar, {}), _jsxs("main", { className: "flex-1 container px-4 py-8 mx-auto", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Dashboard" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your projects and AI chat sessions" })] }), _jsxs("div", { className: "flex gap-3", children: [checkIfAdmin() && (_jsxs(Button, { onClick: goToAdminDashboard, variant: "outline", children: [_jsx(UserCog, { className: "h-4 w-4 mr-2" }), " Admin Panel"] })), _jsxs(Button, { onClick: goToBuilderDashboard, variant: "outline", children: [_jsx(Code, { className: "h-4 w-4 mr-2" }), " Builder"] }), _jsxs(Button, { onClick: createNewProject, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), " New Project"] })] })] }), _jsxs(Tabs, { defaultValue: "projects", className: "mb-8", children: [_jsxs(TabsList, { className: "w-full max-w-md", children: [_jsx(TabsTrigger, { value: "projects", className: "flex-1", children: "Projects" }), _jsx(TabsTrigger, { value: "recent", className: "flex-1", children: "Recent Activity" }), _jsx(TabsTrigger, { value: "templates", className: "flex-1", children: "Templates" })] }), _jsx(TabsContent, { value: "projects", className: "pt-6", children: loadingProjects ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3].map((i) => (_jsxs(Card, { className: "animate-pulse", children: [_jsxs(CardHeader, { children: [_jsx("div", { className: "h-6 bg-muted rounded w-3/4" }), _jsx("div", { className: "h-4 bg-muted rounded w-1/2" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "h-4 bg-muted rounded w-full mb-2" }), _jsx("div", { className: "h-4 bg-muted rounded w-3/4" })] }), _jsx(CardFooter, { children: _jsx("div", { className: "h-9 bg-muted rounded w-full" }) })] }, i))) })) : projects.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: projects.map((project) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: project.name }), _jsx(CardDescription, { children: new Date(project.created_at).toLocaleDateString() })] }), _jsx(CardContent, { children: _jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: project.description || "No description provided" }) }), _jsx(CardFooter, { children: _jsx(Button, { variant: "outline", className: "w-full", onClick: () => navigate(`/projects/${project.id}`), children: "Open Project" }) })] }, project.id))) })) : (_jsxs("div", { className: "text-center py-16", children: [_jsx("h3", { className: "text-xl font-medium mb-2", children: "No projects yet" }), _jsx("p", { className: "text-muted-foreground mb-4", children: "Create your first project to get started" }), _jsxs(Button, { onClick: createNewProject, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), " Create Project"] })] })) }), _jsx(TabsContent, { value: "recent", className: "pt-6", children: _jsxs("div", { className: "text-center py-16", children: [_jsx(PanelRight, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }), _jsx("h3", { className: "text-xl font-medium mb-2", children: "Recent Activity" }), _jsx("p", { className: "text-muted-foreground mb-4 max-w-md mx-auto", children: "Your recent activity and chat sessions will appear here as you use the platform." })] }) }), _jsx(TabsContent, { value: "templates", className: "pt-6", children: _jsxs("div", { className: "text-center py-16", children: [_jsx(Code, { className: "h-12 w-12 mx-auto text-muted-foreground mb-4" }), _jsx("h3", { className: "text-xl font-medium mb-2", children: "Project Templates" }), _jsx("p", { className: "text-muted-foreground mb-4 max-w-md mx-auto", children: "Coming soon - start projects from pre-built templates." }), _jsx(Button, { variant: "outline", onClick: goToBuilderDashboard, children: "Go to Builder" })] }) })] })] }), _jsx(Footer, {})] }));
};
export default Dashboard;
