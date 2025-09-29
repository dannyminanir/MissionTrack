import React from "react";
import { CiBellOn } from "react-icons/ci";
import { FiUser, FiFileText, FiList, FiPlusCircle } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { BiWallet } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../hook/useTheme";
import { useAuth } from "../../context/AuthContext";

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  const twTheme = (light: string, dark: string) =>
    theme === "light" ? light : dark;

  const navItems = [
    { icon: VscHome, label: "Employee", path: "/employee" },
    { icon: CiBellOn, label: "Notifications", path: "/notifications" },
    { icon: FiUser, label: "Profile", path: "/profile" },
  ];

  const quickActions = [
    { icon: FiPlusCircle, label: "New Mission Request", path: "/request" },
    { icon: FiList, label: "Request List/Tracking", path: "/requestList" },
    { icon: BiWallet, label: "Expense Logging", path: "/expenses" },
    { icon: FiFileText, label: "Mission Reporting", path: "/report" },
  ];

  return (
    <aside
      className={`fixed top-20 left-0 w-64 h-full flex flex-col justify-between shadow-md z-40 overflow-y-auto ${twTheme(
        "bg-blue-50",
        "bg-gray-900 text-white"
      )}`}
    >
      <div className="flex flex-col ml-5 gap-10 ">
        {/* Navigation */}
        <nav className="">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`w-full text-left flex items-center text-lg gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-gray-200 text-black font-bold"
                    : twTheme(
                        "text-gray-700 hover:bg-gray-100",
                        "text-gray-300 hover:bg-gray-700"
                      )
                }`}
              >
                <Icon size={20} className={isActive ? "text-black" : "text-black"} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-1">
          <p className="mb-3 ml-10 text-lg font-bold">Quick Actions</p>
          <div className="space-y-2">
            {quickActions.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-gray-200 text-black font-semibold"
                      : twTheme(
                          "text-gray-600 hover:text-blue-600",
                          "text-gray-300 hover:bg-gray-700"
                        )
                  }`}
                >
                  <Icon size={18} className="text-black" />
                  {label}
                </button>
              );
            })}
          </div>
          {/* Logout */}
        <div className="mt-15 mr-17 ml-6">
          <button
            onClick={handleLogout}
            className="w-full bg-green-600  text-white font-semibold py-2 rounded-2xl transition hover:bg-green-700"
          >
            Logout
          </button>
        </div>
        </div>

        
      </div>
    </aside>
  );
};

export default Sidebar;
