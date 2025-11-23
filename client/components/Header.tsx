import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { HomeIcon } from "@/components/Icons";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsAuthenticated(!!token);
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
    closeSidebar();
    navigate("/");
  };

  return (
    <header className="w-full bg-card/80 backdrop-blur-sm border-b border-border shadow-md animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0">
            <img
              src="https://i.ibb.co/rG8yDddq/doxingdotlifelogogeniune888175141.png"
              alt="Doxing Dot Life Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-black text-lg text-foreground hidden sm:inline">
            Doxing Dot Life
          </span>
          <span className="font-black text-lg text-foreground sm:hidden">
            DDL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/dox-anyone"
            className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent font-semibold rounded-lg hover:bg-accent hover:text-accent-foreground transition-all"
          >
            🔍 Dox Anyone
          </Link>
          <Link
            to="/admin-panel"
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors"
          >
            ⚙️ Admin
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>

        {/* Mobile Sidebar Navigation */}
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeSidebar}
            />

            {/* Sidebar */}
            <div className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border md:hidden z-50 animate-slideInLeft shadow-lg">
              <nav className="p-4 space-y-3 overflow-y-auto">
                <Link
                  to="/"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 w-full px-4 py-3 text-foreground font-semibold hover:bg-muted rounded-lg transition-colors"
                >
                  <HomeIcon className="w-5 h-5" />
                  Home
                </Link>
                <Link
                  to="/dox-anyone"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 w-full px-4 py-3 text-accent font-semibold hover:bg-accent/10 rounded-lg transition-colors bg-accent/5"
                >
                  🔍 Dox Anyone
                </Link>
                <Link
                  to="/admin-panel"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 w-full px-4 py-3 text-foreground font-semibold hover:bg-muted rounded-lg transition-colors"
                >
                  ⚙️ Admin Panel
                </Link>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
