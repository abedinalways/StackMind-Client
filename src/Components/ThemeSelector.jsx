import React from 'react';
import { useTheme } from '../Context/ThemeContext';

const ThemeSelector = () => {
  const { theme, setSpecificTheme } = useTheme();

  const themes = [
    { name: 'light', display: 'Light', icon: '☀️' },
    { name: 'dark', display: 'Dark', icon: '🌙' },
    { name: 'cupcake', display: 'Cupcake', icon: '🧁' },
    { name: 'bumblebee', display: 'Bumblebee', icon: '🐝' },
    { name: 'emerald', display: 'Emerald', icon: '💎' },
    { name: 'corporate', display: 'Corporate', icon: '🏢' },
    { name: 'synthwave', display: 'Synthwave', icon: '🌈' },
    { name: 'retro', display: 'Retro', icon: '📺' },
    { name: 'cyberpunk', display: 'Cyberpunk', icon: '🤖' },
    { name: 'valentine', display: 'Valentine', icon: '💝' },
    { name: 'halloween', display: 'Halloween', icon: '🎃' },
    { name: 'garden', display: 'Garden', icon: '🌸' },
    { name: 'forest', display: 'Forest', icon: '🌲' },
    { name: 'aqua', display: 'Aqua', icon: '🌊' },
    { name: 'lofi', display: 'Lofi', icon: '🎵' },
    { name: 'pastel', display: 'Pastel', icon: '🎨' },
    { name: 'fantasy', display: 'Fantasy', icon: '🦄' },
    { name: 'wireframe', display: 'Wireframe', icon: '📐' },
    { name: 'black', display: 'Black', icon: '⚫' },
    { name: 'luxury', display: 'Luxury', icon: '👑' },
    { name: 'dracula', display: 'Dracula', icon: '🧛' },
    { name: 'cmyk', display: 'CMYK', icon: '🖨️' },
    { name: 'autumn', display: 'Autumn', icon: '🍂' },
    { name: 'business', display: 'Business', icon: '💼' },
    { name: 'acid', display: 'Acid', icon: '🧪' },
    { name: 'lemonade', display: 'Lemonade', icon: '🍋' },
    { name: 'night', display: 'Night', icon: '🌃' },
    { name: 'coffee', display: 'Coffee', icon: '☕' },
    { name: 'winter', display: 'Winter', icon: '❄️' },
  ];

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto"
      >
        {themes.map(themeOption => (
          <li key={themeOption.name}>
            <button
              onClick={() => setSpecificTheme(themeOption.name)}
              className={`flex items-center gap-2 ${
                theme === themeOption.name ? 'active' : ''
              }`}
            >
              <span>{themeOption.icon}</span>
              <span>{themeOption.display}</span>
              {theme === themeOption.name && <span className="ml-auto">✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
