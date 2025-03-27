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
    <header className="w-full px-4 py-3 align-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Vänster: Logo */}
        <h1 className="text-heading text-5xl z-50 font-bold">
          <NavLink
            to="/"
            className="cursor-pointer hover:text-hoveredButton transition-opacity duration-200 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            dara<span className="text-daraPink">.</span>
          </NavLink>
        </h1>

        {/* Höger: Hamburgermeny */}
        <div className="relative z-20">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
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

          {/* Navigationsmeny */}
          {menuOpen && (
            <nav className="fixed inset-0 bg-container z-10 p-4 text-center content-center">
              {/* Stäng-knapp (X) */}
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-button focus:outline-none"
                aria-label="Close menu"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <ul className="flex flex-col gap-y-4 mt-16">
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
      </div>

      {/* Logout modal */}
      <LogoutModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={() => setModalOpen(false)}
      />
    </header>
  );
};

export default Header;
