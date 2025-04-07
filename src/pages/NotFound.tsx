
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6 max-w-lg">
        <div className="text-9xl font-bold gradient-text mb-6">404</div>
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </p>
        <Button className="gap-2" asChild>
          <a href="/">
            <Home className="h-4 w-4" /> Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
