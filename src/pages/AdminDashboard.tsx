
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Settings, Users, Key, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface ApiKey {
  name: string;
  key: string;
}

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState<any[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { name: "OpenAI API Key", key: "sk-••••••••••••••••••••••••••••••" },
    { name: "GitHub API Key", key: "gh-••••••••••••••••••••••••••••••" }
  ]);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    } else if (user) {
      checkAdminStatus();
      fetchUsers();
    }
  }, [user, loading, navigate]);

  const checkAdminStatus = async () => {
    // In a real app, you would check if the user has admin role
    // For now, we'll simulate this by checking if the user's email ends with @admin.com
    if (user?.email?.endsWith("@admin.com")) {
      setIsAdmin(true);
    } else {
      // Redirect non-admin users
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  };

  const fetchUsers = async () => {
    try {
      // In a real app, you would fetch users from the database
      // Since we don't have direct access to auth.users, we'll use profiles
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUserList(data || []);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAddApiKey = () => {
    if (!newKeyName.trim() || !newKeyValue.trim()) {
      toast({
        title: "Error",
        description: "API key name and value are required",
        variant: "destructive",
      });
      return;
    }

    // Add new API key
    setApiKeys([...apiKeys, { name: newKeyName, key: newKeyValue }]);
    setNewKeyName("");
    setNewKeyValue("");

    toast({
      title: "Success",
      description: "API key added successfully",
    });
  };

  const handleDeleteApiKey = (index: number) => {
    const updatedKeys = [...apiKeys];
    updatedKeys.splice(index, 1);
    setApiKeys(updatedKeys);
    
    toast({
      title: "API Key Deleted",
      description: "The API key has been removed",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Component will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users, API keys, and platform settings</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white px-3 py-1 text-xs rounded-full">
                Admin
              </div>
              <Shield className="h-5 w-5 text-primary" />
            </div>
          </div>

          <Tabs defaultValue="users">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage all users on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-secondary">
                        <tr>
                          <th scope="col" className="px-6 py-3">User</th>
                          <th scope="col" className="px-6 py-3">Email</th>
                          <th scope="col" className="px-6 py-3">Created At</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loadingUsers ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-4 text-center">Loading users...</td>
                          </tr>
                        ) : userList.length > 0 ? (
                          userList.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-secondary/50">
                              <td className="px-6 py-4 font-medium">{user.full_name || "No name"}</td>
                              <td className="px-6 py-4">{user.email || user.username}</td>
                              <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                              <td className="px-6 py-4">
                                <Button variant="outline" size="sm">View</Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="px-6 py-4 text-center">No users found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="api-keys" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Key Management</CardTitle>
                  <CardDescription>Manage API keys for external services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Current API Keys</h3>
                    <div className="space-y-2">
                      {apiKeys.map((apiKey, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{apiKey.name}</p>
                            <p className="text-muted-foreground text-sm">{apiKey.key}</p>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteApiKey(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Add New API Key</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="key-name">Key Name</Label>
                        <Input 
                          id="key-name" 
                          placeholder="e.g., OpenAI API Key"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="key-value">API Key Value</Label>
                        <Input 
                          id="key-value" 
                          type="password" 
                          placeholder="Enter API key"
                          value={newKeyValue}
                          onChange={(e) => setNewKeyValue(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddApiKey} className="w-full sm:w-auto">
                      <Key className="h-4 w-4 mr-2" /> Add API Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure global platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="site-name">Site Name</Label>
                        <Input id="site-name" defaultValue="Code Whisperer" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support-email">Support Email</Label>
                        <Input id="support-email" defaultValue="support@codewhisperer.ai" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="model">Default AI Model</Label>
                        <Input id="model" defaultValue="gpt-4" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="temperature">Temperature</Label>
                        <Input id="temperature" type="number" defaultValue="0.7" min="0" max="2" step="0.1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
