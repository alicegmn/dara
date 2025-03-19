import ListContainer from "@/components/ui/listContainer";
import SearchBar from "@/components/SearchBar";
import Login from "./Login";
import useAccessStore from "@/store/store";
import SongListContainer from "@/components/ui/SongListContainer";

export default function Home() {
  const token = useAccessStore((state) => state.accessToken);

  return (
    <div>
      {token ? (
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
