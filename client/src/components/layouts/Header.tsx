import { NavLink, useNavigate } from "react-router-dom";
import useAccessStore from "@/store/store";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import LogoutModal from "./LogoutModal";

const Header: React.FC = () => {
  const accessToken = useAccessStore((state) => state.accessToken);
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    setModalOpen(true);
  };

  const confirmLogout = () => {
    addAccessToken("");
    setModalOpen(false);
    navigate("/");
  };

  return (
    <header className="p-3">
      <div className="flex justify-between items-center ml-10 mr-10 relative">
        <h1 className="text-heading text-left text-5xl">
          <NavLink
            to="/"
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            dara<span className="text-daraPink">.</span>
          </NavLink>
        </h1>

        {/* Hamburgarmeny - synlig på alla skärmstorlekar */}
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none z-20"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigationsmeny - renderas endast om menyn är öppen */}
        {menuOpen && (
          <nav className="absolute inset-0 bg-container z-10">
            <ul className="flex flex-col gap-y-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-text hover:text-hoveredButton transition-colors ${
                      isActive ? "text-activeButton" : ""
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.spotify.com/se/account/overview/"
                  target="_blank"
                  className={({ isActive }) =>
                    `text-text hover:text-hoveredButton transition-colors ${
                      isActive ? "text-activeButton" : ""
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Account settings
                </NavLink>
              </li>
              {accessToken && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-text hover:text-hoveredButton transition-colors"
                  >
                    Log out
                  </button>
                </li>
              )}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        )}
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={() => setModalOpen(false)}
      />
    </header>
  );
};

export default Header;
