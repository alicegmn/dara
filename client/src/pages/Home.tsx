import ListContainer from "@/components/ui/listContainer";
import SearchBar from "@/components/SearchBar";
import Login from "./Login";
import useAccessStore from "@/store/store";
import useAuth from "@/helpers/useAuth";
import SongListContainer from "@/components/ui/SongListContainer";
import { useAuthCode } from "@/hooks/useAuthCode";

export default function Home() {
  // Använd useAuthCode-hooken för att hämta auth koden och rensa URL:en
  const code = useAuthCode();
  const token = useAccessStore((state) => state.accessToken);

  // Använd auth koden för att erhålla access token
  useAuth(code || "");

  console.log("code:", code);
  console.log("accesstoken:", token);

  return (
    <div>
      {code || token ? (
        <div>
          <h1 className="text-4xl text-white">
            Search for a song or an artist
          </h1>
          <SearchBar />
          <section className="flex flex-col justify-center p-2 align-middle md:flex-row lg:flex-row">
            <ListContainer />
            <SongListContainer />
          </section>
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
}
