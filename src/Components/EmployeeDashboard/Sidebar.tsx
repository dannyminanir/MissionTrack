import React, { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { FiUser, FiFileText, FiList, FiPlusCircle } from "react-icons/fi";
import { VscHome } from "react-icons/vsc";
import { BiWallet } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../hook/useTheme";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const twTheme = (light: string, dark: string) =>
    theme === "light" ? light : dark;

  const navItems = [
    { icon: VscHome, label: "Dashboard", path: "/dashboard" },
    { icon: CiBellOn, label: "Notifications", path: "/notifications" },
    { icon: FiUser, label: "Profile", path: "/profile" },
  ];

  const quickActions = [
    { icon: FiPlusCircle, label: "New Mission Request", path: "/request" },
    { icon: FiList, label: "Request List/Tracking", path: "/requestList" },
    { icon: BiWallet, label: "Expense Logging", path: "/missions/history" },
    { icon: FiFileText, label: "Mission Reporting", path: "/report" },
  ];

  return (
    <div>
      {/* Mobile toggle button */}
      <button
        className="fixed top-5 left-5 z-50 md:hidden p-2 rounded-md bg-blue-600 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-20 h-full left-0 w-64 flex flex-col justify-between shadow-md z-40 overflow-y-auto transform transition-transform duration-300 md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${twTheme("bg-blue-50", "bg-gray-900 text-white")}`}
      >
        <div className="p-5">
          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center text-lg font-bold gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-gray-200 text-black"
                      : twTheme(
                          "text-gray-700 hover:bg-gray-100",
                          "text-gray-300 hover:bg-gray-700"
                        )
                  }`}
                >
                  <Icon size={20} className="text-black" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="mt-10">
            <p className="mb-3 ml-10 text-lg font-bold">Quick Actions</p>
            <div className="space-y-2">
              {quickActions.map(({ icon: Icon, label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className="flex items-center gap-2 px-2 py-1 text-sm text-gray-600 hover:text-blue-600"
                >
                  <Icon size={18} className="text-black" />
                  {label}
                </Link>
              ))}
            </div>

            {/* Logout Button */}
            <div className="p-5 mt-10">
              <Link
                to={"/login"}
                className="block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-2xl text-center"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
