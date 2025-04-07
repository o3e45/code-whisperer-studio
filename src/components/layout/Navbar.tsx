
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code, ChevronDown, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Code className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold gradient-text">
            CodeWhisperer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <NavLinksMobile />
            <div className="flex flex-col gap-2">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = () => {
  return (
    <div className="flex items-center gap-8">
      <NavLink href="#features" label="Features" />
      <NavLink href="#demo" label="Demo" />
      <NavLink href="#pricing" label="Pricing" />
      <NavLink href="#" label="Documentation" />
    </div>
  );
};

const NavLinksMobile = () => {
  return (
    <div className="flex flex-col gap-4">
      <NavLink href="#features" label="Features" />
      <NavLink href="#demo" label="Demo" />
      <NavLink href="#pricing" label="Pricing" />
      <NavLink href="#" label="Documentation" />
    </div>
  );
};

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <a
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </a>
  );
};

export default Navbar;
