import ListContainer from "@/components/ui/ListContainer";
import SearchBar from "@/components/SearchBar";
import LogIn from "@/components/LogIn";
import useAccessStore from "@/store/store";
import SongListContainer from "@/components/ui/SongListContainer";

export default function Home() {
  const token = useAccessStore((state) => state.accessToken);

  return (
    <div>
      {token ? (
        <div>
          <section className="flex flex-col justify-center p-2 align-middle md:flex-row lg:flex-row">
            <SearchBar />
            <ListContainer />
            <SongListContainer />
          </section>
        </div>
      ) : (
        <div>
          <LogIn />
        </div>
      )}
    </div>
  );
}
