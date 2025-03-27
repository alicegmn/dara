import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAccessStore from "@/store/store";
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
    setMenuOpen(false); // stänger menyn
    setModalOpen(true); // öppnar modalen
  };
  const confirmLogout = () => {
    addAccessToken("");
    setModalOpen(false);
    navigate("/");
  };

  // Ref till hamburgermenyn
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 🔒 Focus trap + ESC-stängning
  useEffect(() => {
    if (!menuOpen || isModalOpen) return; // <--- stoppa focus trap när logout-modal är öppen

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const menu = menuRef.current;
    const focusableEls =
      menu?.querySelectorAll<HTMLElement>(focusableSelectors);
    const firstEl = focusableEls?.[0];
    const lastEl = focusableEls?.[focusableEls.length - 1];

    // Autofokus på första element i menyn
    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setTimeout(() => {
          toggleButtonRef.current?.focus();
        }, 0); // Vänta tills menyn tas bort
      }

      if (e.key === "Tab" && focusableEls && firstEl && lastEl) {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <header className="w-full px-4 py-3 align-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-heading text-5xl z-50 font-bold">
          <NavLink
            to="/"
            className="cursor-pointer hover:text-hoveredButton transition-opacity duration-200 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            dara<span className="text-daraPink">.</span>
          </NavLink>
        </h1>

        {/* Hamburgarikonen */}
        <div className="relative z-20">
          <button
            onClick={toggleMenu}
            className="text-white"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            ref={toggleButtonRef}
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

          {/* Hamburgermenyn */}
          {menuOpen && (
            <nav
              ref={menuRef}
              id="main-menu"
              className="fixed inset-0 bg-container z-10 p-4 text-center content-center"
              aria-label="Main navigation"
              aria-modal="true"
              role="dialog"
            >
              {/* Stäng-knapp */}
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-hoveredButton"
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

      {/* Logout-modal */}
      <LogoutModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={() => setModalOpen(false)}
      />
    </header>
  );
};

export default Header;
