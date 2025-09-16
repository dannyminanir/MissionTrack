import React from "react";
import { useTheme } from "../hook/useTheme";


const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme} (click to toggle)
    </button>
  );
};

export default ThemeToggleButton;
