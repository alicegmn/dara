import { NavLink } from "react-router-dom";
import PlayerComponent from "../ui/PlayerComponent";
import useAccessStore from "@/store/store";

const Header: React.FC = () => {
  const accessToken = useAccessStore((state) => state.accessToken);

  return (
    <header className="p-3 flex justify-between align-middle ml-10 mr-10">
      <h1 className="text-white text-left text-5xl">
        <NavLink
          to="/"
          className="cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out"
        >
          dara
          <span className="text-pink-500">.</span>
        </NavLink>
      </h1>
      {accessToken && <PlayerComponent />}
    </header>
  );
};

export default Header;
