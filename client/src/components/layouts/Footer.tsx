import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAccessStore from "@/store/store";
import LogoutModal from "./LogoutModal";

const Footer: React.FC = () => {
  // Hämta funktion för att uppdatera access token
  const addAccessToken = useAccessStore((state) => state.addAccessToken);
  const accessToken = useAccessStore((state) => state.accessToken);
  const navigate = useNavigate();
  // State för att kontrollera om utloggningsmodalen är öppen
  const [isModalOpen, setModalOpen] = useState(false);

  // Öppna utloggningsmodalen
  const handleLogout = () => {
    setModalOpen(true);
  };

  // Hantera bekräftad utloggning
  const confirmLogout = () => {
    addAccessToken("");
    setModalOpen(false);
    navigate("/");
  };

  return (
    <footer className="p-3 flex justify-between align-middle ml-10 mr-10">
      {!isModalOpen && accessToken && (
        <button
          className="border-4 border-black bg-white hover:opacity-80 text-black py-1.5 px-3 rounded-md transition-opacity duration-200 ease-in-out"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}

      <LogoutModal
        isOpen={isModalOpen}
        onConfirm={confirmLogout}
        onCancel={() => setModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;
